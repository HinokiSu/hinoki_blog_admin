<template>
  <div class="hinoki-blog article-continer">
    <div class="article-feature">
      <card-feature
        @search-click="searchHandler"
        @clear-click="clearHandler"
        @addjuction-click="addjuctionHandler"
        @judge-empty="judgeSearchisEmpty"
        add-name="添加文章"
      ></card-feature>
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
    <div class="articles__pagination" v-show="!isSearch && !isNullArticleList">
      <fe-pagination v-model="paginationVal.curPage" :count="paginationVal.count" :limit="paginationVal.limit">
        <template #prev>
          <arrow-left-circle />
        </template>
        <template #next>
          <arrow-right-circle />
        </template>
      </fe-pagination>
    </div>
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
        <hino-areatext class="desc-areatext" v-model="modalValue.description" unscale unscroll />
      </div>
      <div class="categories">
        <p>类别</p>
        <fe-select class="multi-select-main" placeholder="选择类别" v-model="multiSelectVals" multiple>
          <fe-option
            style="width: 300px"
            :label="cate.name"
            :value="cate._id"
            v-for="cate in categoryList"
            :key="cate._id"
          ></fe-option>
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
      是否确认要删除:
      <span style="color: var(--highlight-pink); font-size: 14px; font-weight: 500">`{{ modalValue.title }}`</span>
      <!-- <p>{{ modalValue.title }}</p> -->
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
import { ArrowLeftCircle, ArrowRightCircle } from '@fect-ui/vue-icons'
export default defineComponent({
  name: 'Articles',
  components: { ArticleItem, CardFeature, EmptyWrap, HinoAreatext, ArrowLeftCircle, ArrowRightCircle },
  setup() {
    const router = useRouter()
    const ArticleStore = useArticleStore()
    const CategoryStore = useCategoryStore()
    const isNullArticleList = ref(false)
    const isSearch = ref(false)

    // 分页
    const paginationVal = reactive({
      curPage: 1,
      count: 1,
      limit: 6,
    })

    // 监视 分页
    watchEffect(() => {
      // TODO 搜索结果未被分页
      // 动态获取总页数
      paginationVal.count = Math.ceil(ArticleStore.articleTotal / paginationVal.limit)
      paginationVal.limit = 6
      ArticleStore.getArticlePagination(paginationVal.curPage, paginationVal.limit)
    })
    const articleList = computed(() => ArticleStore.articleList)

    onMounted(() => {
      ArticleStore.getArticlePagination(paginationVal.curPage, paginationVal.limit)
      CategoryStore.getCategoryList()
    })

    // 搜索框 模糊搜索
    const searchHandler = async (val: string) => {
      const res = await ArticleStore.getFuzzySearch(val)
      if (!res) {
        proxy.$toast['success']({
          text: '未搜索到相关文章',
          duration: '1200',
        })
        isSearch.value = false
      } else {
        isSearch.value = true
      }
    }

    const clearSearchInput = () => {
      setTimeout(() => {
        isSearch.value = false
      }, 200)
      ArticleStore.getArticlePagination(paginationVal.curPage, paginationVal.limit)
    }
    // 判断搜索框是否为空, TODO 还可以改进
    const judgeSearchisEmpty = () => {
      clearSearchInput()
    }
    // 清除按钮
    const clearHandler = () => {
      clearSearchInput()
    }

    const addjuctionHandler = () => {
      router.push({
        name: 'create-article',
      })
    }

    // 监视 文章是否为空，
    watch(
      () => ArticleStore.articleList,
      () => {
        if (ArticleStore.getArticleCount === 0) {
          isNullArticleList.value = true
        }
      }
    )

    /* 模态框 */
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
        await ArticleStore.updateArticle(articleId.value).then(
          () => {
            ArticleStore.getArticleList()
            proxy.$toast['success']({
              text: '编辑文章成功!',
              duration: '1500',
            })
          },
          () => {
            proxy.$toast['error']({
              text: '编辑文章失败!',
              duration: '1500',
            })
          }
        )
      },

      deleteModal: async () => {
        await ArticleStore.deleteArticle(articleId.value).then(
          () => {
            ArticleStore.getArticleList()
            proxy.$toast['success']({
              text: '删除文章成功!',
              duration: '1500',
            })
          },
          () => {
            proxy.$toast['error']({
              text: '删除文章失败',
              duration: '1500',
            })
          }
        )
      },
    }

    // article have exist category tags
    const getExistCategories = () =>
      modalValue.value.classification?.forEach((item) => {
        multiSelectVals.value.push(item)
      })

    watchEffect(async () => {
      text.value = handleShow.editModal ? '编辑' : '删除'

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
        text: `已取消${text.value}`,
        duration: '1500',
      })

    return {
      articleList,
      searchHandler,
      clearHandler,
      addjuctionHandler,
      judgeSearchisEmpty,
      isNullArticleList,
      paginationVal,
      handleClick,
      modalValue,
      handleShow,
      handleCancelEventModal,
      confirmModalHandler,
      multiSelectVals,
      categoryList,
      isSearch,
    }
  },
})
</script>

<style lang="less" scoped>
.hinoki-blog {
  &.article-continer {
    padding-bottom: 48px;

    .article-feature {
      margin-left: 20px;
    }

    & .articles__pagination {
      margin-top: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

// modal
.modal-container {
  display: grid;
  grid-template-rows: atuo 1fr auto;
  row-gap: 6px;

  & div > p {
    font-size: 1.2rem;
    font-weight: 500;
  }

  .title {
    .input-title {
      width: 100%;
    }
  }

  .desc-areatext {
    width: 100%;
  }

  .visible-option {
    .radio-group {
      margin-left: 20px;
    }
  }
}
</style>
