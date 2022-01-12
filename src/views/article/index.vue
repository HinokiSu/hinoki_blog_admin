<template>
  <div class="hinoki-blog article_continer">
    <fe-grid-group direction="row">
      <fe-grid class="article_card_block" v-for="item in 10" :key="item">
        <card-block>{{ item }}</card-block>
      </fe-grid>
    </fe-grid-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import cardBlock from '@admin/components/main-panel/card-block/card-block.vue'
export default defineComponent({
  name: 'Article',
  components: { cardBlock },
  setup() {
    return {}
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
