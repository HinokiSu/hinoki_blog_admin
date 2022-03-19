<template>
  <div class="hinoki-blog article-form">
    <fe-form class="form-container" :model="formValue" :rules="rules" ref="formRef" show-message>
      <fe-form-item prop="title">
        <p class="form-caption">标题</p>
        <fe-input size="large" class="title-input" v-model="formValue.title" />
      </fe-form-item>
      <fe-form-item prop="description">
        <p class="form-caption">摘要</p>
        <hino-textarea class="desc-textarea" v-model="formValue.description" unscale unscroll></hino-textarea>
      </fe-form-item>
      <fe-form-item>
        <p class="form-caption">类别</p>
        <div class="categories">
          <fe-select placeholder="选择类别" v-model="multiSelectVals" multiple style="width: 200px">
            <fe-option :label="cate.name" :value="cate._id" v-for="cate in categoryList" :key="cate._id"></fe-option>
          </fe-select>
        </div>
      </fe-form-item>
      <fe-form-item>
        <p class="form-caption">内容</p>
        <hino-markdown-preview></hino-markdown-preview>
      </fe-form-item>
      <fe-form-item>
        <div class="features">
          <div class="update">
            <fe-button auto ghost size="medium" type="success" @click="sumbitHandler">Submit</fe-button>
          </div>
          <div class="cancel">
            <fe-button auto ghost size="medium" type="warning" @click="cancelHandler">Cancel</fe-button>
          </div>
        </div>
      </fe-form-item>
    </fe-form>
  </div>
  <!-- TODO: when fetch data, need loading  -->
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, onBeforeUnmount, onMounted, ref, watch, watchEffect } from 'vue'
import { useArticleStore } from '@admin/stores/articleStore'
import { useCategoryStore } from '@admin/stores/categoryStore'
import { ICategory } from '@admin/interfaces/ICategory'
import HinoTextarea from '@admin/components/text-area/index.vue'
import HinoMarkdownPreview from '@admin/components/md-preview/index.vue'
import { useRouter } from 'vue-router'
import { getRealTime } from '@admin/utils/format'
export default defineComponent({
  name: 'ArticleForm',
  components: {
    HinoTextarea,
    HinoMarkdownPreview,
  },
  setup() {
    const formRef = ref(null)
    const router = useRouter()
    const ArticleStore = useArticleStore()
    const { proxy } = getCurrentInstance() as any
    const formValue = computed(() => ArticleStore.articleData)
    let realTime = ref('')
    let intervalId: number

    const multiSelectVals = ref<string[]>([])

    const CategoryStore = useCategoryStore()

    watch(
      () => multiSelectVals.value,
      () => {
        formValue.value.classification = multiSelectVals.value
      }
    )

    const sumbitHandler = async () => {
      formValue.value['createdAt'] = realTime.value
      formValue.value['updatedAt'] = formValue.value['createdAt']
      // ArticleStore -> createArticle
      await ArticleStore.createArticle().then(
        () => {
          proxy.$toast['success']({
            text: '创建文章成功!',
            duration: '1500',
          })
          router.push({
            name: 'articles',
          })
        },
        () => {
          proxy.$toast['error']({
            text: '创建文章失败',
            duration: '1500',
          })
        }
      )
    }

    const rules = {
      // TODO: validate form
      title: [
        {
          required: true,
          type: 'string',
          trigger: 'blur',
        },
      ],
    }

    const cancelHandler = () => {
      ArticleStore.recycleArticleData()
      router.push({
        name: 'articles',
      })
    }

    onMounted(async () => {
      await CategoryStore.getCategoryList()
      intervalId = getRealTime(realTime, 1000)
    })

    // recycle
    onBeforeUnmount(() => {
      ArticleStore.recycleArticleData()
      clearInterval(intervalId)
    })

    const categoryList = computed<ICategory[]>(() => CategoryStore.categoryList)

    return {
      formValue,
      categoryList,
      rules,
      sumbitHandler,
      cancelHandler,
      formRef,
      multiSelectVals,
    }
  },
})
</script>

<style lang="less" scoped>
.hinoki-blog {
  & .article-form {
    margin-top: 24px;

    .form-caption {
      font-size: 1.3rem;
      font-weight: 500;
    }

    .form-container {
      display: flex;
      flex-direction: column;

      .title-input {
        width: 100%;
      }

      .desc-textarea {
        width: 100%;
        max-width: 480px;
        height: 64px;
      }

      .categories {
        padding-top: 10px;
        .cate-tag {
          text-align: center;
          width: 48px;
          margin: 0 10px;
        }
      }

      .features {
        padding-top: 20px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        column-gap: 16px;
      }
    }
  }
}
</style>
