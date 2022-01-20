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
          <textarea class="desc-textarea" v-model="formValue.description"></textarea>
        </div>
      </fe-form-item>
      <fe-form-item prop="categories">
        <div class="categories">
          <h1>Categories</h1>
          <!-- TODO: Wrapping tag, achieve features of delete and add tag  -->

          <fe-tag class="cate-tag" :text="cate.name" v-for="cate in formValue.classification" :key="cate._id"></fe-tag>
        </div>
      </fe-form-item>
      <!-- TODO: .md -> pre -> html -->
      <fe-form-item>
        <div class="markdown-html">
          <h1>MarkDown</h1>
          <textarea v-model="formValue.markdown"></textarea>
        </div>
      </fe-form-item>
      <fe-form-item>
        <div class="markdown-html">
          <h1>Html</h1>
          <textarea v-model="formValue.html"></textarea>
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
import { computed, defineComponent, getCurrentInstance, onBeforeUnmount, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'ArticleForm',
  setup() {
    const formRef = ref(null)

    const articleStore = useArticleStore()
    const route = useRoute()
    const { proxy } = getCurrentInstance() as any
    const articleId = <string | undefined>route.params?.id
    const formValue = computed<IArticle>(() => articleStore.articleData)

    let sumbitHandler

    if (articleId) {
      // /article/update/:id
      const fetchData = async (id: string) => {
        // get data -> filling articleData of articleStore
        await articleStore.getArticleById(id)
      }

      watchEffect(async () => {
        await fetchData(articleId as string)
      })

      sumbitHandler = async () => {
        // articleStore -> updateArticle
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

    // recycle
    onBeforeUnmount(() => {
      articleStore.articleData = {}
    })

    return {
      formValue,
      rules,
      sumbitHandler,
      cancelHandler,
      formRef,
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
