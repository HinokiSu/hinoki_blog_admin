<template>
  <div class="hinoki-blog article_continer">
    <div class="article-feature">
      <card-feature @searchClick="searcHandler"></card-feature>
    </div>
    <fe-grid-group direction="row" class="block-group">
      <fe-grid class="article_card_block" v-for="article in articleList" :key="article._id">
        <card-block
          :seeToLink="{
            name: 'article-preview',
            params: {
              title: `${article.title}`,
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

export default defineComponent({
  name: 'Article',
  components: { cardBlock, ArticleContent, CardFeature },
  setup() {
    const ArticleStore = useArticleStore()

    onMounted(() => {
      ArticleStore.getArticleList()
    })

    const searcHandler = (val: string) => {
      console.log(val)
    }

    return {
      articleList: computed(() => ArticleStore.articleList),
      searcHandler,
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

    .block-group {
    }
  }
}
</style>
