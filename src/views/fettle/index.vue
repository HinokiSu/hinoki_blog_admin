<template>
  <div class="hinoki-blog states">
    <a-card hoverable title="文章类别汇总" :bordered="false" class="chart-card">
      <article-pie></article-pie>
    </a-card>
    <a-card hoverable class="chart-card" title="热门文章" :bordered="false">
      <top-article></top-article>
    </a-card>
    <a-card hoverable class="chart-card" title="类别浏览量汇总" :bordered="false">
      <pageviews-bar></pageviews-bar>
    </a-card>
    <a-card hoverable class="chart-card" title="文章评论数汇总" :bordered="false">
      <comment-pie></comment-pie>
    </a-card>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import ArticlePie from '@admin/components/charts/article-pie.vue'
import PageviewsBar from '@admin/components/charts/pageviews-bar.vue'
import TopArticle from '@admin/components/charts/top-article.vue'
import CommentPie from '@admin/components/charts/comment-pie.vue'
export default defineComponent({
  name: 'Fettle',
  components: {
    ArticlePie,
    PageviewsBar,
    TopArticle,
    CommentPie,
  },
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
.hinoki-blog {
  &.states {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    background-color: rgb(240, 242, 245);

    .chart-card {
      margin: 24px;
      width: 500px;
      max-width: 100%;
    }

    @media screen and (max-width: 500px) {
      .chart-card {
        margin: 12px;
      }
    }
  }
}
</style>
