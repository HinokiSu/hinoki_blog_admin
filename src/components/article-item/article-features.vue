<template>
  <div class="hinoki-card card-block" :style="styles">
    <div class="wrapper">
      <div class="content">
        <slot></slot>
      </div>
      <div class="collapse-features">
        <div class="feature">
          <router-link
            :to="{
              name: toLinkName,
              params: {
                id: id,
              },
            }"
          >
            <p>See</p>
          </router-link>
        </div>

        <div class="feature" @click="handleClick.edit">
          <p>Mod</p>
        </div>

        <div class="feature" @click="handleClick.delete">
          <p>Del</p>
        </div>
      </div>
    </div>
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
        <h2>Title</h2>
        <fe-input class="input-title" v-model="modalValue.title"></fe-input>
      </div>
      <div class="desc">
        <h2>Description</h2>
        <hino-areatext v-model="modalValue.description" wd="100%" unscale unscroll></hino-areatext>
      </div>
      <div class="categories">
        <h2>Category</h2>
        <fe-select class="multi-select-main" placeholder="选择类别" v-model="multiSelectVals" multiple>
          <fe-option :label="cate.name" :value="cate._id" v-for="cate in categoryList" :key="cate._id"></fe-option>
        </fe-select>
      </div>
      <div class="visible-option">
        <h2>Is visible ?</h2>
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
    <p>
      是否确认要删除&nbsp;&nbsp;<fe-code>{{ modalValue.title }} </fe-code>
    </p>
  </fe-modal>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, onMounted, reactive, ref, watch, watchEffect } from 'vue'
import HinoAreatext from '@admin/components/text-area/index.vue'
import { useCategoryStore } from '@admin/stores/categoryStore'
import { ICategory } from '@admin/interfaces/ICategory'
import { useArticleStore } from '@admin/stores/articleStore'
export default defineComponent({
  name: 'ArticleFeatures',
  props: {
    disable: Boolean,
    wd: {
      type: String,
      default: '240px',
    },
    hg: {
      type: String,
      default: 'auto',
    },
    id: {
      type: String,
      default: '',
    },
    toLinkName: String,
  },
  components: { HinoAreatext },
  setup(props) {
    const handleShow = reactive({
      editModal: false,
      deleteModal: false,
    })
    const text = ref<string>('')
    const multiSelectVals = ref<string[]>([])
    const modalValue = computed(() => ArticleStore.articleData)
    const ArticleStore = useArticleStore()
    const CategoryStore = useCategoryStore()

    const articleId = computed<string>(() => props.id)
    // ts-error: 类型“ComponentInternalInstance | null”上不存在属性“proxy”。
    const { proxy } = getCurrentInstance() as any

    const recycleStore = () => {
      ArticleStore.articleData = {}
      multiSelectVals.value.length = 0
    }

    const handleClick = {
      edit: () => {
        handleShow.editModal = !handleShow.editModal
      },
      delete: () => {
        handleShow.deleteModal = !handleShow.deleteModal
      },
    }

    const confirmModalHandler = {
      editModal: async () => {
        await ArticleStore.updateArticle(articleId.value)

        if (ArticleStore.fettle) {
          modalValue.value.classification = multiSelectVals.value
          ArticleStore.fettle = false
          // reacquire
          await ArticleStore.updateArticle(articleId.value)
          if (ArticleStore.fettle) {
            ArticleStore.fettle = false
            proxy.$toast['success']({
              text: 'Edit successfully!',
              duration: '1500',
            })
          } else {
            proxy.$toast['error']({
              text: 'Update failed!',
              duration: '2000',
            })
          }
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

    const getExistCategories = () =>
      modalValue.value.classification?.forEach((item) => {
        multiSelectVals.value.push(item)
      })

    watchEffect(async () => {
      text.value = handleShow.editModal ? 'Edit' : 'Delete'

      if (!handleShow.editModal && !handleShow.deleteModal) {
        recycleStore()
      } else {
        await ArticleStore.getArticleById(articleId.value)
        getExistCategories()
      }
    })

    onMounted(async () => {
      await CategoryStore.getCategoryList()
    })

    const categoryList = computed<ICategory[]>(() => CategoryStore.categoryList)

    const handleCancelEventModal = () =>
      proxy.$toast['warning']({
        text: `${text.value} cancelled`,
        duration: '1500',
      })

    const styles = computed(() => ({
      width: `${props.wd}`,
      height: `${props.hg}`,
    }))

    return {
      styles,
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
.hinoki-card {
  &.card-block {
    margin: 0;
    padding: 0;

    .wrapper {
      padding: 20px;
      transition: all 0.4s ease;

      .content {
        padding: 15px;
        box-shadow: 0 0 30px var(--accents-2);
      }

      .collapse-features {
        display: grid;
        border-top: 1px solid var(--accents-2);
        grid-template-columns: repeat(3, 1fr);
        justify-items: center;

        padding-top: 15px;

        .feature {
          font-size: 20px;
          font-weight: 500;
          cursor: pointer;

          transform: translateY(-50%);
          opacity: 0;
          transition: all 0.2s ease;
          transition-property: transform, opacity;
          transition-timing-function: cubic-bezier(1, 0, 0.65, 0.75), linear;
        }

        :nth-child(2) {
          transition-delay: 0.15s;
        }
        :nth-child(3) {
          transition-delay: 0.1s;
        }
      }

      &:hover {
        box-shadow: 0 0 36px var(--accents-2);

        .collapse-features {
          .feature {
            opacity: 1;
            transform: translateY(0);
            opacity: 1;
            transition-timing-function: cubic-bezier(0.2, 0.15, 0.1, 1), ease;
          }

          :nth-child(1) {
            transition-delay: 0.2s;
          }
          :nth-child(2) {
            transition-delay: 0.15s;
          }
          :nth-child(3) {
            opacity: 1;
          }
        }
      }
    }
  }
}

// modal
.modal-container {
  display: grid;
  grid-template-rows: atuo 1fr auto;
  row-gap: 6px;

  & div > h2 {
    padding-top: 10px;
    padding-bottom: 20px;
    font-size: 28px;
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
