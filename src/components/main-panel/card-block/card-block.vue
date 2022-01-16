<template>
  <div class="hinoki-card card-block" :style="style">
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

        <!-- TODO: 2.弹出对话框，修改标题、摘要... 设置是否可见， -->
        <div class="feature" @click="editHandler">
          <p>Mod</p>
        </div>

        <div class="feature" @click="deleteHandler">
          <!-- TODO: 3.删除文章，会弹出提示框 -->
          <p>Del</p>
        </div>
      </div>
    </div>
  </div>
  <!-- mod modal -->
  <fe-modal
    title="Edit"
    v-model:visible="editShow"
    cancel="取消"
    done="提交"
    @cancel="editModalHandler.cancelEdit"
    @confirm="editModalHandler.confirmEdit"
  >
    <div class="modal-container">
      <div class="title">
        <h2>Title</h2>
        <fe-input class="input-title" v-model="modalValue.title"></fe-input>
      </div>
      <div class="desc">
        <h2>Description</h2>
        <!-- TODO: Pack textarea, the current value isn't  out of sync -->
        <textarea class="textarea-desc" v-model="modalValue.description"></textarea>
      </div>
      <!-- TODO: is visible -->
      <div class="visible-option">
        <h2>Is visible ?</h2>
        <div class="radio-group">
          <fe-radioGroup size="small" use-row v-model="isVisible">
            <fe-radio value="0">可见</fe-radio>
            <fe-radio value="1">不可见</fe-radio>
          </fe-radioGroup>
        </div>
      </div>
    </div>
  </fe-modal>

  <!-- delete modal -->

  <fe-modal
    title="Delete"
    v-model:visible="deleteShow"
    cancel="取消"
    done="删除"
    @cancel="deleteModalHandler.cancelDelete"
    @confirm="deleteModalHandler.confirmDelete"
  >
    <p>
      是否确认要删除&nbsp;:&nbsp<fe-code>{{ modalValue.title }} </fe-code>
    </p>
  </fe-modal>
</template>

<script lang="ts">
import { useArticleStore } from '@admin/stores/articleStore'
import { computed, defineComponent, getCurrentInstance, ref, watchEffect } from 'vue'

export default defineComponent({
  name: 'CardBlock',
  props: {
    disable: Boolean,
    // Whole width
    wd: {
      type: String,
      default: '240px',
    },
    // Whole height
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
  setup(props) {
    const editShow = ref<boolean>(false)
    const deleteShow = ref<boolean>(false)
    const articleStore = useArticleStore()
    const articleId = computed<string>(() => props.id)
    // ts-error: 类型“ComponentInternalInstance | null”上不存在属性“proxy”。
    const { proxy } = getCurrentInstance() as any

    const editHandler = () => (editShow.value = !editShow.value)
    const deleteHandler = () => {
      deleteShow.value = !deleteShow.value
      console.log('re', articleId.value)
    }
    // TODO: this value should put in articleSchema
    const isVisible = ref<string>('0')

    // Edit MOdal
    const editModalHandler = {
      cancelEdit: () =>
        proxy.$toast['warning']({
          text: 'Edit cancelled',
          duration: '1500',
        }),

      confirmEdit: () =>
      // TODO: submit edited data
        proxy.$toast['success']({
          text: 'Edited successfully!',
          duration: '1500',
        }),
    }

    // Delete Modal
    const deleteModalHandler = {
      cancelDelete: () =>
        proxy.$toast['warning']({
          text: 'Delete cancelled',
          duration: '1500',
        }),
      confirmDelete: () =>
        // submit data which will deleted 
        proxy.$toast['success']({
          text: 'Delete successfully!',
          duration: '1500',
        }),
    }

    const recycleStore = () => {
      // recycle
      articleStore.articleData = {}
    }

    const modalValue = computed(() => articleStore.articleData)

    watchEffect(() => {
      // edit modal
      if (!editShow.value) {
        recycleStore()
      } else {
        articleStore.getArticleById(articleId.value)
      }
      // delete modal
      if (!deleteShow.value) {
        recycleStore()
      } else {
        articleStore.getArticleById(articleId.value)
      }
    })
    return {
      style: computed(() => ({
        width: `${props.wd}`,
        height: `${props.hg}`,
      })),
      modalValue,
      isVisible,
      editHandler,
      deleteHandler,
      editShow,
      deleteShow,
      editModalHandler,
      deleteModalHandler,
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

      /*  &::-webkit-scrollbar {
        width: 0px;
      } */
    }
  }

  .visible-option {
    .radio-group {
      margin-left: 20px;
    }
  }
}
</style>
