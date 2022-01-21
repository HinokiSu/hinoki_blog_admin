<template>
  <div class="hinoki-blog category-container">
    <fe-collapseGroup accordion>
      <fe-grid-group direction="row" class="block-group" justify="flex-start" :gap="3">
        <fe-grid class="cate-main" v-for="category in categoryList" :key="category._id">
          <category-item  :category="category"> </category-item>
        </fe-grid>
      </fe-grid-group>
    </fe-collapseGroup>
  </div>
</template>

<script lang="ts">
import { ICategory } from '@admin/interfaces/ICategory'
import { useCategoryStore } from '@admin/stores/categoryStore'
import { computed, defineComponent, onMounted, ref } from 'vue'
import CategoryItem from '@admin/components/category-item/index.vue'
export default defineComponent({
  name: 'Category',
  components: { CategoryItem },
  setup() {
    const CategoryStore = useCategoryStore()

    onMounted(() => {
      CategoryStore.getCategoryList()
    })

    const categoryList = computed<ICategory[]>(() => CategoryStore.categoryList)

    return {
      categoryList,
    }
  },
})
</script>

<style lang="less" scoped>
.hinoki-blog {
  .category-container {
    padding-bottom: 100px;
  }
}
</style>
