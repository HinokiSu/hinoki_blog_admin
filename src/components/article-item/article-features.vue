<template>
  <div class="hinoki-card card-block" :style="styles">
    <div class="wrapper">
      <div class="content">
        <slot></slot>
      </div>
      <div class="collapse-features">
        <!-- TODO: 1.跳转到:id 的文章, 可以修改/预览，保存 -->
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
        <fe-tag class="cate-tag" :text="cate.name" v-for="cate in modalValue.classification" :key="cate._id"></fe-tag>
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
import { useArticleStore } from '@admin/stores/articleStore'
import { computed, defineComponent, getCurrentInstance, reactive, ref, watchEffect } from 'vue'
import HinoAreatext from '@admin/components/text-area/index.vue'
export default defineComponent({
  name: 'CardBlock',
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

    const articleStore = useArticleStore()
    const articleId = computed<string>(() => props.id)
    // ts-error: 类型“ComponentInternalInstance | null”上不存在属性“proxy”。
    const { proxy } = getCurrentInstance() as any

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
        await articleStore.updateArticle(articleId.value)

        if (articleStore.fettle) {
          articleStore.fettle = false
          // reacquire
          articleStore.getArticleList()
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
        await articleStore.deleteArticle(articleId.value)
        if (articleStore.fettle) {
          articleStore.fettle = false
          // reacquire
          articleStore.getArticleList()
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

    watchEffect(() => {
      text.value = handleShow.editModal ? 'Edit' : 'Delete'
    })

    const handleCancelEventModal = () =>
      proxy.$toast['warning']({
        text: `${text.value} cancelled`,
        duration: '1500',
      })

    const recycleStore = () => {
      // recycle
      articleStore.articleData = {}
    }

    const modalValue = computed(() => articleStore.articleData)

    watchEffect(() => {
      // edit modal
      if (!handleShow.editModal) {
        recycleStore()
      } else {
        articleStore.getArticleById(articleId.value)
      }
      // delete modal
      if (!handleShow.deleteModal) {
        recycleStore()
      } else {
        articleStore.getArticleById(articleId.value)
      }
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

  .desc {
    .textarea-desc {
      font-size: 26px;
      width: 100%;
      height: 100px;

      resize: none;
    }
  }

  .categories {
    .cate-tag {
      width: 36px;
      text-align: center;
      margin: 0 10px;
    }
  }

  .visible-option {
    .radio-group {
      margin-left: 20px;
    }
  }
}
</style>
