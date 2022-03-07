<template>
  <div class="hinoki-blog states">
    <article-pie></article-pie>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ArticlePie from '@admin/components/charts/article-pie.vue'
export default defineComponent({
  name: 'Fettle',
  components: {
    ArticlePie,
  },
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
.hinoki-blog {
  &.states {
    margin-top: 24px;
  }
}
</style>
