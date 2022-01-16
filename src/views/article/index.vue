<template>
  <div class="hinoki-blog article_continer">
    <div class="article-feature">
      <card-feature @search-click="searcHandler" @addjuction-click="addjuctionHandler"></card-feature>
    </div>
    <fe-grid-group direction="row" class="block-group">
      <fe-grid class="article_card_block" v-for="article in articleList" :key="article._id">
        <card-block :id="article._id" :to-link-name="'update-article'">
          <article-content :article="article"></article-content>
        </card-block>
      </fe-grid>
    </fe-grid-group>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import cardBlock from '@admin/components/main-panel/card-block/card-block.vue'
import { useArticleStore } from '@admin/stores/articleStore'
import ArticleContent from '@admin/components/main-panel/card-block/article-content.vue'
import CardFeature from '@admin/components/main-panel/card-main/card-feature.vue'
import router from '@admin/routes'
export default defineComponent({
  name: 'Articles',
  components: { cardBlock, ArticleContent, CardFeature },
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
  &.article_continer {
    .article-feature {
      margin-left: 20px;
    }
  }
}
</style>
