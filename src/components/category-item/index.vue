<template>
  <div class="hinoki-blog category-item">
    <fe-collapse shadow :title="category?.name" sub-tag="code">
      <div class="features">
        <div class="edit" @click="handleClick.edit">
          <p>Edit</p>
        </div>
        <div class="del" @click="handleClick.delete">
          <p>Del</p>
        </div>
      </div>
    </fe-collapse>
  </div>

  <!-- Edit Modal -->
  <div class="edit-modal">
    <fe-modal
      title="Edit"
      v-model:visible="handleShow.editModal"
      cancel="取消"
      done="提交"
      @cancel="handleCancelEventModal"
      @confirm="confirmEventModalHandler.editModal"
    >
      <fe-input v-model="modalValue.name">
        <fe-dot type="success">
          <fe-code style="font-size: 12px">类别名称</fe-code>
        </fe-dot>
      </fe-input>
    </fe-modal>
  </div>

  <!-- Delete Modal -->
  <div class="delte-modal">
    <fe-modal
      title="Delete"
      v-model:visible="handleShow.deleteModal"
      cancel="取消"
      done="删除"
      @cancel="handleCancelEventModal"
      @confirm="confirmEventModalHandler.deleteModal"
    >
      <p>
        确定要删除:
        <fe-code>{{ modalValue.name }}</fe-code>
        !
      </p>
    </fe-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, PropType, reactive, Ref, ref, watchEffect } from 'vue'
import { useCategoryStore } from '@admin/stores/categoryStore'
import { ICategory } from '@admin/interfaces/ICategory'

export default defineComponent({
  name: 'CategoryItem',
  props: {
    // TODO: using update:model,instead of getCategoryId
    category: Object as PropType<ICategory>,
    cateId: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const { proxy } = getCurrentInstance() as any
    const text = ref('')
    const handleShow = reactive({
      editModal: false,
      deleteModal: false,
    })
    const categoryId = computed(() => props.category?._id) as any

    const CategoryStore = useCategoryStore()

    const handleClick = {
      edit: () => {
        handleShow.editModal = !handleShow.editModal
      },
      delete: () => {
        handleShow.deleteModal = !handleShow.deleteModal
      },
    }

    const recycleStore = () => {
      // recycle
      CategoryStore.categoryData = {}
    }

    const modalValue = computed(() => CategoryStore.categoryData)

    watchEffect(() => {
      // edit modal
      if (!handleShow.editModal) {
        recycleStore()
      } else {
        CategoryStore.getCategoryById(categoryId.value)
      }
      // delete modal
      if (!handleShow.deleteModal) {
        recycleStore()
      } else {
        CategoryStore.getCategoryById(categoryId.value)
      }
    })

    watchEffect(() => {
      text.value = handleShow.editModal ? 'Edit' : 'Delete'
    })
    const handleCancelEventModal = () =>
      proxy.$toast['warning']({
        text: `${text.value} cancelled`,
        duration: '1500',
      })

    const confirmEventModalHandler = {
      editModal: async () => {
        await CategoryStore.updateCategory(categoryId.value)

        if (CategoryStore.fettle) {
          CategoryStore.fettle = false
          // reacquire
          CategoryStore.getCategoryList()
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
        await CategoryStore.deleteCategory(categoryId.value)
        if (CategoryStore.fettle) {
          CategoryStore.fettle = false
          // reacquire
          CategoryStore.getCategoryList()
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
    return {
      modalValue,
      handleShow,
      handleClick,
      handleCancelEventModal,
      confirmEventModalHandler,
    }
  },
})
</script>

<style lang="less" scoped>
.hinoki-blog {
  & .category-item {
    & .features {
      display: grid;
      grid-template-rows: repeat(2, 1fr);
      row-gap: 30px;
      align-items: center;
      justify-items: center;

      & > div {
        cursor: pointer;
        font-size: 24px;
        font-weight: 500;
        padding: 8px 32px;
        border: 1px solid var(--accents-1);
        border-radius: 16px;
        transition: all 0.4s ease;

        &:hover {
          border-color: var(--accents-4);
        }
      }
    }
  }
}
</style>
