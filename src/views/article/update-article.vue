<template>
  <div class="hinoki-blog article-preview">
    <hino-markdown-preview></hino-markdown-preview>
    <div class="features">
      <div class="update">
        <fe-button auto ghost size="medium" type="success" @click="sumbitHandler">更新</fe-button>
      </div>
      <div class="cancel">
        <fe-button auto ghost size="medium" type="warning" @click="cancelHandler">取消</fe-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onBeforeUnmount, onMounted, onUnmounted, ref, watchEffect } from 'vue'
import { useArticleStore } from '@admin/stores/articleStore'
import { useRoute, useRouter } from 'vue-router'
import HinoTextarea from '@admin/components/text-area/index.vue'
import HinoMarkdownPreview from '@admin/components/md-preview/index.vue'
import { getRealTime } from '@admin/utils/format'
export default defineComponent({
  components: { HinoTextarea, HinoMarkdownPreview },
  setup() {
    const ArticleStore = useArticleStore()
    const route = useRoute()
    const router = useRouter()
    const { proxy } = getCurrentInstance() as any
    const realTime = ref('')
    const articleId = <string | undefined>route.params?.id

    const fetchData = async (id: string) => {
      await ArticleStore.getArticleById(id)
    }

    watchEffect(async () => {
      await fetchData(articleId as string)
    })
    let intervalId: number

    onMounted(() => {
      intervalId = getRealTime(realTime, 500)
    })
    // 实时时间

    const sumbitHandler = async () => {
      // articleStore -> updateArticle
      ArticleStore.articleData['updatedAt'] = realTime.value
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
      clearInterval(intervalId)
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
