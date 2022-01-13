<template>
  <div class="hinoki-blog article_continer">
    <fe-grid-group direction="row">
      <fe-grid class="article_card_block" v-for="article in articleList" :key="article._id">
        <card-block>
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
export default defineComponent({
  name: 'Article',
  components: { cardBlock, ArticleContent },
  setup() {
    const ArticleStore = useArticleStore()

    onMounted(() => {
      ArticleStore.getArticle()
    })

    return {
      articleList: computed(() => ArticleStore.articleList),
    }
  },
})
</script>

<style lang="less" scoped>
.hinoki-blog {
  &.article_continer {
    margin-top: 20px;
  }
}
</style>
