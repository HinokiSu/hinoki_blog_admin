<template>
  <div class="hinoki-blog article-continer">
    <div class="article-feature">
      <card-feature @search-click="searcHandler" @addjuction-click="addjuctionHandler"></card-feature>
    </div>
    <fe-grid-group direction="row" class="block-group">
      <fe-grid class="article_card_block" v-for="article in articleList" :key="article._id">
        <article-features :id="article._id" to-link-name="update-article">
          <article-content :article="article"></article-content>
        </article-features>
      </fe-grid>
    </fe-grid-group>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import router from '@admin/routes'
import { useArticleStore } from '@admin/stores/articleStore'
import ArticleContent from '@admin/components/article-item/article-content.vue'
import CardFeature from '@admin/components/card-main/card-feature.vue'
import ArticleFeatures from '@admin/components/article-item/article-features.vue'
export default defineComponent({
  name: 'Articles',
  components: { ArticleContent, CardFeature, ArticleFeatures },
  setup() {
    const ArticleStore = useArticleStore()
    onMounted(() => {
      ArticleStore.getArticleList()
    })

    const searcHandler = (val: string) => {
      console.log(val)
    }

    const addjuctionHandler = () => {
      router.push({
        name: 'create-article',
      })
    }

    return {
      articleList: computed(() => ArticleStore.articleList),
      searcHandler,
      addjuctionHandler,
    }
  },
})
</script>

<style lang="less" scoped>
.hinoki-blog {
  &.article-continer {
    .article-feature {
      margin-left: 20px;
    }
  }
}
</style>
