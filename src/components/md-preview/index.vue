<template>
  <div class="hinoki-blog markdown-preview">
    <div class="preview-container">
      <div class="tabnav">
        <div class="tabs">
          <div class="tab">
            <p>Edit Markdown</p>
          </div>
          <div class="tab">
            <p>Preview</p>
          </div>
        </div>
      </div>
      <div class="editor">
        <hino-textarea class="markdown-textarea" v-model="article.markdown" unscale></hino-textarea>
        <div class="preview-html" v-html="article.html"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, watch, watchEffect } from 'vue'
import { useArticleStore } from '@admin/stores/articleStore'
import MarkdownIt from 'markdown-it'
import HinoTextarea from '@admin/components/text-area/index.vue'
export default defineComponent({
  name: 'HinoMarkdownPreview',
  components: { HinoTextarea },
  setup() {
    const markdownParser = new MarkdownIt({
      html: true,
    })
    const ArticleStore = useArticleStore()
    const article = computed(() => ArticleStore.articleData)

    watch(
      () => article.value.markdown,
      () => {
        article.value.html = markdownParser.render(article.value.markdown as string)
      }
    )
    return {
      article,
    }
  },
})
</script>

<style lang="less" scoped>
.hinoki-blog {
  & .markdown-preview {
    padding: 48px 0;

    & .preview-container {
      border: 1px solid var(--accents-2);
      border-radius: 12px;
    }

    & .tabnav {
      padding: 5px 10px;
      background-color: #f6f8fa;
      border-bottom: 1px solid var(--accents-2);
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;

      .tabs {
        margin: -5px 0 -6px -11px;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        justify-items: center;
        align-items: center;

        .tab {
          font-size: 32px;
          background-color: white;
          padding: 10px 15px;
          border-left: 1px solid var(--accents-2);
          border-right: 1px solid var(--accents-2);
        }
      }
    }

    & .editor {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      align-items: center;
      justify-items: center;
      height: 70vh;

      .markdown-textarea {
        width: 100%;
        height: 100%;
        border-right: 4px solid var(--accents-2);
      }

      .preview-html {
        height: 100%;
        width: 100%;
        padding: 12px;
        font-size: 24px;
        font-weight: 400;
        overflow: auto;

        // strip
        &::-webkit-scrollbar {
          width: 8px;
          height: 12px;
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
          background: var(--accents-5);
        }
      }
    }
  }
}
</style>
