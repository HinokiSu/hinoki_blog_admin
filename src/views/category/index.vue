<template>
  <div class="hinoki-blog category-container">
    <div class="category-feature">
      <card-feature
        @search-click="cardFeaturesHandler.search"
        @addjuction-click="cardFeaturesHandler.addjuction"
      ></card-feature>
    </div>
    <fe-collapseGroup accordion>
      <fe-grid-group direction="row" class="block-group" justify="flex-start" :gap="3">
        <fe-grid class="cate-main" v-for="category in categoryList" :key="category._id">
          <category-item :category="category" @show-modal="handleClick" />
        </fe-grid>
      </fe-grid-group>
    </fe-collapseGroup>
    <empty-wrap :is-empty="isNullCategoryList">
      <p>没有任何类别 : (</p>
    </empty-wrap>
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
          <span style="color: var(--highlight-pink); font-size: 14px; font-weight: 500" class="input-caption"
            >类别名称</span
          >
        </fe-dot>
      </fe-input>
    </fe-modal>
  </div>

  <!-- Delete Modal -->
  <div class="delete-modal">
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
        <span style="color: var(--highlight-pink); font-size: 14px; font-weight: 500">`{{ modalValue.name }}`</span>
      </p>
    </fe-modal>
  </div>
</template>

<script lang="ts">
import { ICategory } from '@admin/interfaces/ICategory'
import { useCategoryStore } from '@admin/stores/categoryStore'
import { computed, defineComponent, getCurrentInstance, onMounted, reactive, ref, watch, watchEffect } from 'vue'
import CategoryItem from '@admin/components/category-item/index.vue'
import EmptyWrap from '@admin/components/empty-wrap/index.vue'
import CardFeature from '@admin/components/card-main/card-feature.vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'Category',
  components: { CategoryItem, EmptyWrap, CardFeature },
  setup() {
    const router = useRouter()
    const CategoryStore = useCategoryStore()
    const categoryList = computed<ICategory[]>(() => CategoryStore.categoryList)
    const { proxy } = getCurrentInstance() as any
    const text = ref('')
    const handleShow = reactive({
      editModal: false,
      deleteModal: false,
    })
    const categoryId = ref<string>('')
    const isNullCategoryList = ref(false)

    const cardFeaturesHandler = {
      search: (val: string) => console.log(val),
      addjuction: () => {
        router.push({
          // TODO: whether adding new component or modal
          name: 'create-category',
        })
      },
    }

    const handleClick = (name: string, id: string) => {
      categoryId.value = id
      if (name === 'edit') {
        handleShow.editModal = !handleShow.editModal
      } else if (name === 'delete') {
        handleShow.deleteModal = !handleShow.deleteModal
      }
    }

    const modalValue = computed(() => CategoryStore.categoryData)

    watchEffect(() => {
      // edit modal
      if (!handleShow.editModal) {
        CategoryStore.recycleCategoryData()
      } else {
        CategoryStore.getCategoryById(categoryId.value)
      }
      // delete modal
      if (!handleShow.deleteModal) {
        CategoryStore.recycleCategoryData()
      } else {
        CategoryStore.getCategoryById(categoryId.value)
      }
    })

    watchEffect(() => {
      text.value = handleShow.editModal ? 'Edit' : 'Delete'
    })

    watch(
      () => CategoryStore.categoryList,
      () => {
        if (CategoryStore.categoryCount === 0) {
          isNullCategoryList.value = true
        }
      }
    )

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

    onMounted(() => {
      CategoryStore.getCategoryList()
    })
    return {
      modalValue,
      handleShow,
      handleCancelEventModal,
      confirmEventModalHandler,
      categoryList,
      handleClick,
      isNullCategoryList,
      cardFeaturesHandler,
    }
  },
})
</script>

<style lang="less" scoped>
.hinoki-blog {
  &.category-container {
    padding-bottom: 100px;

    .category-feature {
      margin-left: 20px;
    }
  }
}
</style>
