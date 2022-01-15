<template>
  <div class="hinoki-blog preview-container">
    <fe-form :model="formValue" :rules="rules" ref="formRef">
      <fe-form-item prop="title">
        <div class="title">
          <h1>Title</h1>
          <fe-input size="small" class="title-input" v-model="formValue.title" />
        </div>
      </fe-form-item>
      <fe-form-item prop="description">
        <div class="description">
          <h1>Description</h1>
          <textarea class="desc-textarea"></textarea>
        </div>
      </fe-form-item>
      <fe-form-item>
        <div class="markdown-html">
          <h1>MarkDown</h1>
          <textarea></textarea>
          <!-- TODO: .md -> pre -> html -->
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
import { useArticleStore } from '@admin/stores/articleStore'
import { computed, defineComponent, onBeforeUnmount, PropType, ref, watch, watchEffect } from 'vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from 'vue-router'
export default defineComponent({
  name: 'ArticleForm',
  setup() {
    const formRef = ref(null)

    const articleStore = useArticleStore()
    const route = useRoute()

    const articleId = <string | undefined>route.params?.id

    if (articleId) {
      // /article/update/:id
      const fetchData = (id: string) => {
        // get data -> filling articleData of articleStore
        articleStore.getArticleById(id)
      }

      watchEffect(() => {
        fetchData(articleId as string)
      })
    }

    const formValue = computed<IArticle>(() => articleStore.articleData)

    const rules = {
      title: [
        {
          required: true,
          trigger: 'blur',
        },
      ],
    }

    // recycle
    onBeforeUnmount(() => {
      articleStore.articleData = {}
    })

    const sumbitHandler = () => {
      // articleStore -> httpPost
      console.log(formValue.value)
    }

    const cancelHandler = () => {}

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
  &.preview-container {
    display: grid;
    grid-template-rows: auto 2fr auto auto;
    padding-left: 20px;

    :nth-child(n) h1 {
      padding: 16px 0;
    }

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

    .features {
      padding-top: 20px;

      display: flex;
      align-items: center;
      justify-content: flex-end;
      column-gap: 20px;
    }
  }
}
</style>
