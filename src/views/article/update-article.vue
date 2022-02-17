<template>
  <div class="hinoki-blog article-preview">
    <hino-markdown-preview></hino-markdown-preview>
    <div class="features">
      <div class="update">
        <fe-button auto ghost size="large" type="success" @click="sumbitHandler">Submit</fe-button>
      </div>
      <div class="cancel">
        <fe-button auto ghost size="large" type="warning" @click="cancelHandler">Cancel</fe-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onBeforeUnmount, onUnmounted, watchEffect } from 'vue'
import { useArticleStore } from '@admin/stores/articleStore'
import { useRoute, useRouter } from 'vue-router'
import HinoTextarea from '@admin/components/text-area/index.vue'
import HinoMarkdownPreview from '@admin/components/md-preview/index.vue'
export default defineComponent({
  components: { HinoTextarea, HinoMarkdownPreview },
  setup() {
    const ArticleStore = useArticleStore()
    const route = useRoute()
    const router = useRouter()
    const { proxy } = getCurrentInstance() as any

    const articleId = <string | undefined>route.params?.id

    const fetchData = async (id: string) => {
      await ArticleStore.getArticleById(id)
    }

    watchEffect(async () => {
      await fetchData(articleId as string)
    })

    const sumbitHandler = async () => {
      // articleStore -> updateArticle
      await ArticleStore.updateArticle(articleId as string)
      console.log(ArticleStore.fettle)
      if (ArticleStore.fettle) {
        ArticleStore.fettle = false
        ArticleStore.recycleArticleData()
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
    const cancelHandler = () => {
      ArticleStore.fettle = false
      ArticleStore.recycleArticleData()
      router.push({
        name: 'articles',
      })
    }

    onBeforeUnmount(() => {
      ArticleStore.recycleArticleData()
    })

    return {
      sumbitHandler,
      cancelHandler,
    }
  },
})
</script>

<style lang="less" scoped>
.hinoki-blog {
  & .article-preview {
    padding: 48px 0;
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
