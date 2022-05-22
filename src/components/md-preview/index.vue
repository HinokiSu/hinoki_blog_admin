<template>
  <div class="hinoki-blog markdown-preview">
    <div class="preview-container">
      <fe-tabs class="md-preview__tabs" v-model:active="tabActive">
        <fe-tab title="编辑 Markdown">
          <hino-textarea class="markdown-textarea" v-model="article.markdown" unscale></hino-textarea>
        </fe-tab>
        <fe-tab title="预览">
          <div class="preview-html" v-html="article.html"></div>
        </fe-tab>
      </fe-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch, watchEffect } from 'vue'
import { useArticleStore } from '@admin/stores/articleStore'
import MarkdownIt from 'markdown-it'
import HinoTextarea from '@admin/components/text-area/index.vue'
import hljs from '@admin/plugins/hljs'
export default defineComponent({
  name: 'HinoMarkdownPreview',
  components: { HinoTextarea },
  setup() {
    const ArticleStore = useArticleStore()
    const article = computed(() => ArticleStore.articleData)
    const tabActive = ref(0)

    // 文章预览，处理markdown
    const markdownParser: any = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
      langPrefix: 'language-',
      highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return (
              '<pre class="hljs"><code>' +
              hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
              '</code></pre>'
            )
          } catch (__) {}
        }
        return '<pre class="hljs"><code>' + markdownParser.utils.escapeHtml(str) + '</code></pre>'
      },
    })

    watch(
      () => article.value.markdown,
      () => {
        article.value.html = markdownParser.render(article.value.markdown ? article.value.markdown : '')
      }
    )
    return {
      article,
      tabActive,
    }
  },
})
</script>

<style lang="less" scoped>
.hinoki-blog {
  & .markdown-preview {
    padding: 24px 0;
    width: 100%;

    & .md-preview__tabs {
      width: 100%;

      .markdown-textarea {
        width: 100%;
        height: 70vh;
      }

      .preview-html {
        height: 100%;
        min-height: 70vh;
        padding: 12px;
        font-size: 1rem;
        font-weight: 400;
        border: 1px solid var(--accents-2);
        border-radius: 5px;
        overflow: auto;

        // strip
        &::-webkit-scrollbar {
          width: 6px;
          height: 6px;
          background-color: var(--accents-1);
        }

        // track
        &::-webkit-scrollbar-track {
          box-shadow: inset 0 0 6px var(--accents-2);
          border-radius: 10px;
          background-color: var(--accents-1);
        }

        // slider
        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background: var(--accents-3);
        }
      }
    }
  }
}
</style>
