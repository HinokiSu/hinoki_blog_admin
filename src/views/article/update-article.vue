<template>
  <div class="hinoki-blog article-preview">
    <hino-markdown-preview></hino-markdown-preview>
    <div class="features">
      <div class="update">
        <fe-button auto ghost size="medium" type="success" @click="sumbitHandler">Submit</fe-button>
      </div>
      <div class="cancel">
        <fe-button auto ghost size="medium" type="warning" @click="cancelHandler">Cancel</fe-button>
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
      await ArticleStore.updateArticle(articleId as string).then(
        () => {
          ArticleStore.recycleArticleData()
          proxy.$toast['success']({
            text: '修改文章成功!',
            duration: '1500',
          })
          router.push({
            name: 'articles',
          })
        },
        () => {
          proxy.$toast['error']({
            text: '修改文章失败',
            duration: '1500',
          })
        }
      )
    }
    const cancelHandler = () => {
      ArticleStore.recycleArticleData()
      proxy.$toast['error']({
        text: '已取消修改文章',
        duration: '1500',
      })
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
    .features {
      margin-top: 12px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      column-gap: 20px;
    }
  }
}
</style>
