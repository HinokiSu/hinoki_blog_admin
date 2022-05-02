<template>
  <div class="fettle top-article">
    <div class="article-item" v-for="item in topArticle" :key="item._id">
      <div class="item-title">
        <fe-dot type="success" class="item-dot"></fe-dot>
        {{ item.title }}
      </div>
      <div class="item-pageviews">浏览量: {{ item.totalVisits }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { useFettleStore } from '@admin/stores/fettleStore'
import { computed, defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'TopArticle',
  setup() {
    const FettleStore = useFettleStore()
    const topArticle = computed(() => FettleStore.topArticleList)

    onMounted(async () => {
      await FettleStore.getTopArticles()
    })
    return {
      topArticle,
    }
  },
})
</script>

<style lang="less" scoped>
.fettle {
  &.top-article {
    max-width: 500px;
    padding-left: 24px;
    padding-bottom: 12px;

    & .caption {
      font-size: 1.4rem;
      font-weight: 500;
      color: var(--accents-6);
      padding-bottom: 12px;
    }
    & .article-item {
      display: flex;
      flex-direction: column;
      padding: 4px;

      .item-title {
        font-weight: 500;
        font-size: 1.1rem;
        color: var(--accents-8);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        word-break: break-all;
        display: -webkit-box;
      }

      .item-pageviews {
        margin-left: 24px;
        font-size: 0.8rem;
        font-weight: 500;
        color: var(--accents-4);
      }
    }
  }
}
</style>
