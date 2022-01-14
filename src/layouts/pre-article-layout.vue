<template>
  <div class="hinoki-blog preview-container">
    <div class="title">
      <h1>Title</h1>
      <fe-input size="small" class="title-input" v-model="updatedArticle.title" />
    </div>
    <div class="description">
      <h1>Description</h1>
      <textarea class="desc-textarea" v-model="updatedArticle.description"></textarea>
    </div>
    <div class="markdown-html">
      <h1>MarkDown</h1>
      <textarea></textarea>
      <!-- TODO: .md -> pre -> html -->
    </div>

    <div class="features">
      <div class="update">
        <fe-button auto ghost size="large" type="success">Submit</fe-button>
      </div>
      <div class="cancel">
        <fe-button auto ghost size="large" type="warning">Cancel</fe-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IArticle } from '@admin/interfaces'
import { useArticleStore } from '@admin/stores/articleStore'
import { computed, defineComponent, onMounted, ref, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'PreArticleLayout',
  setup() {
    const route = useRoute()
    const articleStore = useArticleStore()

    let id = <string>route.params.id
    // TODO: 获取数据不及时，
    const article = ref<IArticle>({})

    onMounted(() => {
      articleStore.getArticleById(id)
    })
    /*  watch(articleStore.article, () => {
      articleStore.getArticleById(id)
    }) */
    
    const updatedArticle = ref<IArticle>({
      title: article.value.title,
      description: article.value.description,
      markdown: article.value.markdown,
      html: article.value.html,
    })
    // 根据Id 查询

    return {
      updatedArticle,
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
