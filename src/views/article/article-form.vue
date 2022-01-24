<template>
  <div class="hinoki-blog preview-container">
    <fe-form class="form-container" :model="formValue" :rules="rules" ref="formRef" show-message>
      <fe-form-item prop="title">
        <div class="title">
          <h1>Title</h1>
          <fe-input size="small" class="title-input" v-model="formValue.title" />
        </div>
      </fe-form-item>
      <fe-form-item prop="description">
        <div class="description">
          <h1>Description</h1>
          <hino-textarea v-model="formValue.description" wd="100%" unscale unscroll></hino-textarea>
        </div>
      </fe-form-item>
      <fe-form-item>
        <div class="categories">
          <h1>Categories</h1>
          <!-- TODO: Wrapping tag, achieve features of delete and add tag  -->

          <fe-select placeholder="选择类别" v-model="multiSelectVals" multiple style="width: 220px">
            <fe-option :label="cate.name" :value="cate._id" v-for="cate in categoryList" :key="cate._id"></fe-option>
          </fe-select>
        </div>
      </fe-form-item>
      <!-- TODO: .md -> pre -> html -->
      <fe-form-item>
        <div class="markdown-html">
          <h1>MarkDown</h1>
          <hino-textarea v-model="formValue.markdown" wd="100%" unscale unscroll></hino-textarea>
        </div>
      </fe-form-item>
      <fe-form-item>
        <div class="markdown-html">
          <h1>Html</h1>
          <hino-textarea v-model="formValue.html" wd="100%" unscale unscroll></hino-textarea>
        </div>
      </fe-form-item>

      <fe-form-item>
        <div class="features">
          <div class="update">
            <fe-button auto ghost size="large" type="success" @click="sumbitHandler">Submit</fe-button>
          </div>
          <div class="cancel">
            <fe-button auto ghost size="large" type="warning" @click="cancelHandler">Cancel</fe-button>
          </div>
        </div>
      </fe-form-item>
    </fe-form>
  </div>
  <!-- TODO: when fetch data, need loading  -->
</template>

<script lang="ts">
import { IArticle } from '@admin/interfaces'
import router from '@admin/routes'
import { useArticleStore } from '@admin/stores/articleStore'
import {
  computed,
  defineComponent,
  getCurrentInstance,
  isRef,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watchEffect,
} from 'vue'
import { useRoute } from 'vue-router'
import HinoTextarea from '@admin/components/text-area/index.vue'
import { useCategoryStore } from '@admin/stores/categoryStore'
import { ICategory } from '@admin/interfaces/ICategory'
export default defineComponent({
  name: 'ArticleForm',
  components: {
    HinoTextarea,
  },
  setup() {
    const formRef = ref(null)

    const articleStore = useArticleStore()
    const route = useRoute()
    const { proxy } = getCurrentInstance() as any
    const articleId = <string | undefined>route.params?.id
    const formValue = ref<IArticle>({})

    const multiSelectVals = ref<string[]>([])

    const CategoryStore = useCategoryStore()

    let sumbitHandler

    if (articleId) {
      // /article/update/:id
      const fetchData = async (id: string) => {
        // get data -> filling articleData of articleStore
        await articleStore.getArticleById(id)
      }
      const getExistCategories = () =>
        formValue.value.classification?.forEach((item) => {
          console.log(item)
          multiSelectVals.value.push(item)
        })

      watchEffect(async () => {
        await fetchData(articleId as string)
        formValue.value = articleStore.articleData
        getExistCategories()
      })

      sumbitHandler = async () => {
        // articleStore -> updateArticle
        formValue.value.classification = multiSelectVals.value
        await articleStore.updateArticle(articleId)
        console.log(articleStore.fettle)
        if (articleStore.fettle) {
          articleStore.fettle = false
          router.push({
            name: 'articles',
          })
        } else {
          proxy.$toast['error']({
            text: 'Update failed!',
            duration: '2000',
          })
        }
      }
    } else {
      sumbitHandler = async () => {
        // articleStore -> createArticle
        await articleStore.createArticle()

        if (articleStore.fettle) {
          articleStore.fettle = false
          router.push({
            name: 'articles',
          })
        } else {
          proxy.$toast['error']({
            text: 'Create failed!',
            duration: '2000',
          })
        }
      }
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

    const cancelHandler = () => {}

    onMounted(async () => {
      await CategoryStore.getCategoryList()
    })

    // recycle
    onBeforeUnmount(() => {
      articleStore.articleData = {}
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
  & .preview-container {
    padding-left: 20px;

    :nth-child(n) h1 {
      padding: 16px 0;
    }

    .form-container {
      display: grid;
      grid-template-rows: repeat(6, 1fr);

      .title {
        .title-input {
          width: 100%;
        }
      }
      .description {
        .desc-textarea {
          width: 100%;
          height: 48px;
          font-size: 26px;
        }
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
        column-gap: 20px;
      }
    }
  }
}
</style>
