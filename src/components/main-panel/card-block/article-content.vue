<template>
  <div class="article-content">
    <div class="title">
      <h3>How to use Nest?</h3>
    </div>
    <div class="info">
      <div class="author">
        <p>Author: Hinoki</p>
      </div>
      <div class="release_time">
        <p>Reltime: 2022/1/8 21:46</p>
      </div>
    </div>
    <div class="desc">
      <p>Before using Nest, you need skill of typescript,... ...</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name:'ArticleContentTest',
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
.article-content {
  display: grid;
  grid-template-areas:
    'title'
    'info'
    'desc';
  row-gap: 10px;
  .title {
    grid-area: title;
    padding-bottom: 5px;
    border-bottom: 2px solid var(--accents-2);
  }

  .info {
    grid-area: info;
    display: flex;
    flex-direction: column;
    padding-bottom: 5px;
    border-bottom: 2px solid var(--accents-2);

    .author {
      font-size: 16px;
    }
    .release_time {
      font-size: 14px;
    }
  }

  .desc {
    grid-area: desc;
  }
}
</style>
