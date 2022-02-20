<template>
  <div class="article-content">
    <div class="title">
      <h3>{{ article?.title }}</h3>
    </div>

    <div class="description">
      <p>{{ article?.description }}</p>
    </div>
    <div class="release-time">
      <p>{{ article?.createdAt }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { IArticle } from '@admin/interfaces/IArticle'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'ArticleContentTest',
  props: {
    article: Object as PropType<IArticle>,
  },
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
.article-content {
  display: grid;
  grid-template-areas:
    'title'
    'desc'
    'time';
  row-gap: 10px;
  .title {
    grid-area: title;
    padding-bottom: 5px;
    border-bottom: 2px solid var(--accents-2);
  }

  .description {
    grid-area: desc;
    font-size: 1rem;
    font-weight: 500;
  }

  .release-time {
    border-top: 2px solid var(--accents-2);
    grid-area: time;
    font-size: 0.8rem;
  }
}
</style>
