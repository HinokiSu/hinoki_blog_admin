<template>
  <div class="hinoki-blog category-item">
    <fe-collapse shadow :title="category?.name">
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
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { useCategoryStore } from '@admin/stores/categoryStore'
import { ICategory } from '@admin/interfaces/ICategory'

export default defineComponent({
  name: 'CategoryItem',
  props: {
    // TODO: using update:model,instead of getCategoryId
    category: Object as PropType<ICategory>,
    expand: Boolean,
  },
  emits: ['show-modal'],
  setup(props, { emit }) {
    const categoryId = computed(() => props.category?._id) as any
    const CategoryStore = useCategoryStore()

    const handleClick = {
      edit: () => {
        emit('show-modal', 'edit', categoryId.value)
      },
      delete: () => {
        emit('show-modal', 'delete', categoryId.value)
      },
    }

    const modalValue = computed(() => CategoryStore.categoryData)

    return {
      modalValue,
      handleClick,
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
        width: 100%;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 500;
        text-align: center;
        padding: 8px 32px;

        border: 1px solid var(--primary-background);
        border-radius: 8px;
        transition: all 0.4s ease;

        &:hover {
          border-color: var(--accents-4);
        }
      }
    }
  }
}
</style>
