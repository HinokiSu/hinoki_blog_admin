<template>
  <div class="hinoki-blog article-continer">
    <div class="article-feature">
      <card-feature @search-click="searchHandler" @addjuction-click="addjuctionHandler"></card-feature>
    </div>
    <fe-grid-group direction="row" class="block-group">
      <fe-grid class="article_card_block" v-for="article in articleList" :key="article._id">
        <article-item
          :article="article"
          @click-edit="handleClick.edit"
          @click-delete="handleClick.delete"
        ></article-item>
      </fe-grid>
    </fe-grid-group>
    <empty-wrap :is-empty="isNullArticleList">
      <p>没有任何文章 : (</p>
    </empty-wrap>
  </div>

  <!-- Edit Modal -->
  <fe-modal
    title="Edit"
    v-model:visible="handleShow.editModal"
    cancel="取消"
    done="提交"
    @cancel="handleCancelEventModal"
    @confirm="confirmModalHandler.editModal"
  >
    <div class="modal-container">
      <div class="title">
        <p>标题</p>
        <fe-input class="input-title" v-model="modalValue.title"></fe-input>
      </div>
      <div class="desc">
        <p>摘要</p>
        <hino-areatext v-model="modalValue.description" wd="100%" unscale unscroll></hino-areatext>
      </div>
      <div class="categories">
        <p>类别</p>
        <fe-select class="multi-select-main" placeholder="选择类别" v-model="multiSelectVals" multiple>
          <fe-option :label="cate.name" :value="cate._id" v-for="cate in categoryList" :key="cate._id"></fe-option>
        </fe-select>
      </div>
      <div class="visible-option">
        <p>不可见</p>
        <div class="radio-group">
          <fe-switch size="large" v-model="modalValue.isVisible" checked-value="1" inactive-value="0" />
        </div>
      </div>
    </div>
  </fe-modal>

  <!-- Delete Modal -->
  <fe-modal
    title="Delete"
    v-model:visible="handleShow.deleteModal"
    cancel="取消"
    done="删除"
    @cancel="handleCancelEventModal"
    @confirm="confirmModalHandler.deleteModal"
  >
    <span>
      是否确认要删除&nbsp;&nbsp;
      <p>{{ modalValue.title }}</p>
    </span>
  </fe-modal>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, onMounted, reactive, ref, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useArticleStore } from '@admin/stores/articleStore'
import { ICategory } from '@admin/interfaces/ICategory'
import { useCategoryStore } from '@admin/stores/categoryStore'
import ArticleItem from '@admin/components/article-item/article-item.vue'
import CardFeature from '@admin/components/card-main/card-feature.vue'
import EmptyWrap from '@admin/components/empty-wrap/index.vue'
import HinoAreatext from '@admin/components/text-area/index.vue'

export default defineComponent({
  name: 'Articles',
  components: { ArticleItem, CardFeature, EmptyWrap, HinoAreatext },
  setup() {
    const router = useRouter()
    const ArticleStore = useArticleStore()
    const CategoryStore = useCategoryStore()
    const isNullArticleList = ref(false)

    onMounted(() => {
      ArticleStore.getArticleList()
      CategoryStore.getCategoryList()
    })

    const searchHandler = (val: string) => {
      console.log(val)
    }

    const addjuctionHandler = () => {
      router.push({
        name: 'create-article',
      })
    }
    const articleList = computed(() => ArticleStore.articleList)

    watch(
      () => ArticleStore.articleList,
      () => {
        if (ArticleStore.articleCount === 0) {
          isNullArticleList.value = true
        }
      }
    )

    /* Modal */
    const handleShow = reactive({
      editModal: false,
      deleteModal: false,
    })
    const text = ref<string>('')
    const multiSelectVals = ref<string[]>([])
    const modalValue = computed(() => ArticleStore.articleData)

    const articleId = ref<string>('')
    // ts-error: 类型“ComponentInternalInstance | null”上不存在属性“proxy”。
    const { proxy } = getCurrentInstance() as any

    const recycleStore = () => {
      ArticleStore.articleData = {}
      multiSelectVals.value.length = 0
    }

    const handleClick = {
      edit: (id: string) => {
        articleId.value = id
        handleShow.editModal = !handleShow.editModal
      },
      delete: (id: string) => {
        articleId.value = id
        handleShow.deleteModal = !handleShow.deleteModal
      },
    }

    watch(
      () => multiSelectVals.value,
      () => {
        modalValue.value.classification = multiSelectVals.value
      }
    )

    const confirmModalHandler = {
      editModal: async () => {
        await ArticleStore.updateArticle(articleId.value)

        if (ArticleStore.fettle) {
          ArticleStore.fettle = false
          ArticleStore.getArticleList()
          proxy.$toast['success']({
            text: 'Edit successfully!',
            duration: '1500',
          })
        } else {
          proxy.$toast['error']({
            text: 'Edit failed !',
            duration: '2000',
          })
        }
      },

      deleteModal: async () => {
        await ArticleStore.deleteArticle(articleId.value)
        if (ArticleStore.fettle) {
          ArticleStore.fettle = false
          // reacquire
          ArticleStore.getArticleList()
          proxy.$toast['success']({
            text: 'Delete successfully!',
            duration: '1500',
          })
        } else {
          proxy.$toast['error']({
            text: 'Delete failed !',
            duration: '2000',
          })
        }
      },
    }

    // article have exist category tags
    const getExistCategories = () =>
      modalValue.value.classification?.forEach((item) => {
        multiSelectVals.value.push(item)
      })

    watchEffect(async () => {
      text.value = handleShow.editModal ? 'Edit' : 'Delete'

      // edit & delete modal all close
      if (!handleShow.editModal && !handleShow.deleteModal) {
        recycleStore()
      } else {
        // when open edit or delete modal, get data and add exist category tags
        await ArticleStore.getArticleById(articleId.value)
        getExistCategories()
      }
    })

    const categoryList = computed<ICategory[]>(() => CategoryStore.categoryList)

    const handleCancelEventModal = () =>
      proxy.$toast['warning']({
        text: `${text.value} cancelled`,
        duration: '1500',
      })

    return {
      articleList,
      searchHandler,
      addjuctionHandler,
      isNullArticleList,

      handleClick,
      modalValue,
      handleShow,
      handleCancelEventModal,
      confirmModalHandler,
      multiSelectVals,
      categoryList,
    }
  },
})
</script>

<style lang="less" scoped>
.hinoki-blog {
  &.article-continer {
    .article-feature {
      margin-left: 20px;
    }
    padding-bottom: 48px;
  }
}

// modal
.modal-container {
  display: grid;
  grid-template-rows: atuo 1fr auto;
  row-gap: 6px;

  & div > p {
    padding-top: 8px;
    padding-bottom: 20px;
    font-size: 1.2rem;
    font-weight: 500;
  }

  .title {
    .input-title {
      width: 100%;
    }
  }

  .visible-option {
    .radio-group {
      margin-left: 20px;
    }
  }
}
</style>
