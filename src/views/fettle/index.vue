<template>
  <div class="hinoki-blog states">
    <article-pie></article-pie>
    <pageviews-bar></pageviews-bar>
    <top-article></top-article>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ArticlePie from '@admin/components/charts/article-pie.vue'
import PageviewsBar from '@admin/components/charts/pageviews-bar.vue'
import TopArticle from '@admin/components/charts/top-article.vue'
export default defineComponent({
  name: 'Fettle',
  components: {
    ArticlePie,
    PageviewsBar,
    TopArticle,
  },
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
.hinoki-blog {
  &.states {
    margin-top: 24px;
  }
}
</style>
