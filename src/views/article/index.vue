<template>
  <div class="hinoki-blog article-continer">
    <div class="article-feature">
      <card-feature @search-click="searchHandler" @addjuction-click="addjuctionHandler"></card-feature>
    </div>
    <fe-grid-group direction="row" class="block-group">
      <fe-grid class="article_card_block" v-for="article in articleList" :key="article._id">
        <article-features :id="article._id" to-link-name="update-article">
          <article-content :article="article"></article-content>
        </article-features>
      </fe-grid>
    </fe-grid-group>
    <empty-wrap :is-empty="isNullArticleList">
        <p>没有任何文章 : (</p>
    </empty-wrap>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch, watchEffect } from 'vue'
import { useArticleStore } from '@admin/stores/articleStore'
import ArticleContent from '@admin/components/article-item/article-content.vue'
import CardFeature from '@admin/components/card-main/card-feature.vue'
import ArticleFeatures from '@admin/components/article-item/article-features.vue'
import EmptyWrap from '@admin/components/empty-wrap/index.vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'Articles',
  components: { ArticleContent, CardFeature, ArticleFeatures, EmptyWrap },
  setup() {
    const router = useRouter()
    const ArticleStore = useArticleStore()
    const isNullArticleList = ref(false)

    onMounted(() => {
      ArticleStore.getArticleList()
    })

    const searchHandler = (val: string) => {
      console.log(val)
    }

    const addjuctionHandler = () => {
      router.push({
        name: 'create-article',
      })
    }
    const articleList = computed(() => ArticleStore.articleList)

    watch(
      () => ArticleStore.articleList,
      () => {
        if (ArticleStore.articleCount === 0) {
          isNullArticleList.value = true
        }
      }
    )

    return {
      articleList,
      searchHandler,
      addjuctionHandler,
      isNullArticleList,
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
