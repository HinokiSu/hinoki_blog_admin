<template>
  <div class="hinoki-blog article_continer">
    <div class="article-feature">
      <card-feature @search-click="searcHandler" @addjuction-click="addjuction"></card-feature>
    </div>
    <fe-grid-group direction="row" class="block-group">
      <fe-grid class="article_card_block" v-for="article in articleList" :key="article._id">
        <card-block
          :seeToLink="{
            name: 'update-article',
            params: {
              id: article._id,
            },
          }"
        >
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
import { useRoute } from 'vue-router'
import router from '@admin/routes'
export default defineComponent({
  name: 'Articles',
  components: { cardBlock, ArticleContent, CardFeature },
  setup() {
    const ArticleStore = useArticleStore()
    const route = useRoute()
    onMounted(() => {
      ArticleStore.getArticleList()
    })

    const searcHandler = (val: string) => {
      console.log(val)
    }

    const addjuction = () => {
      router.push({
        name: 'create-article'
      })
    }

    return {
      articleList: computed(() => ArticleStore.articleList),
      searcHandler,
      addjuction
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
