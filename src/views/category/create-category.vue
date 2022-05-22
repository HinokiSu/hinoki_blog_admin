<template>
  <div class="hinoki-blog create-category">
    <div class="create-form">
      <div class="title">
        <p>创建类别</p>
      </div>
      <fe-form :model="formValue" :rules="rules" ref="formRef">
        <fe-form-item prop="name">
          <div class="category-name">
            <fe-input placeholder="请输入类别名称" size="large" v-model="formValue.name">
              <fe-dot type="success">
                <p class="caption-dot">类别名称</p>
              </fe-dot>
            </fe-input>
          </div>
        </fe-form-item>
        <fe-form-item>
          <div class="features">
            <fe-button type="success" auto size="medium" ghost @click="clickHandler.create">创建</fe-button>
            <fe-button type="warning" auto size="medium" ghost @click="clickHandler.cancle">取消</fe-button>
          </div>
        </fe-form-item>
      </fe-form>
    </div>
  </div>
</template>

<script lang="ts">
import { useCategoryStore } from '@admin/stores/categoryStore'
import { computed, defineComponent, getCurrentInstance, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'CreateCategory',
  setup() {
    const router = useRouter()
    const { proxy } = getCurrentInstance() as any
    const CategoryStore = useCategoryStore()
    const formRef = ref(null)
    const formValue = computed(() => CategoryStore.categoryData)
    const rules = {
      input: [
        {
          required: true,
          message: 'Please input category name',
          trigger: 'blur',
        },
      ],
    }

    const clickHandler = {
      create: async () => {
        await CategoryStore.createCategory().then(
          () => {
            CategoryStore.recycleCategoryData()
            proxy.$toast['success']({
              text: '创建类别成功!',
              duration: '1500',
            })
            router.push({
              name: 'categories',
            })
          },
          () => {
            proxy.$toast['error']({
              text: '创建类别失败',
              duration: '1500',
            })
          }
        )
      },
      cancle: () => {
        CategoryStore.recycleCategoryData()
        proxy.$toast['error']({
          text: '已取消创建类别',
          duration: '1500',
        })
        router.push({
          name: 'categories',
        })
      },
    }

    onBeforeUnmount(() => {
      CategoryStore.recycleCategoryData()
    })

    return {
      formRef,
      rules,
      formValue,
      clickHandler,
    }
  },
})
</script>

<style lang="less" scoped>
.hinoki-blog {
  &.create-category {
    margin: 24px;
    .create-form {
      display: flex;
      flex-direction: column;

      .title {
        align-self: center;
        font-size: 1.8rem;
        padding: 16px 0;
      }

      .category-name {
        margin-left: 32px;
        .caption-dot {
          font-size: 1.2rem;
        }
      }

      .features {
        display: flex;

        justify-content: flex-end;
        margin: 16px 0;
        padding-top: 20px;
        :nth-child(1) {
          margin: 0 24px;
        }
      }
    }
  }
}
</style>
