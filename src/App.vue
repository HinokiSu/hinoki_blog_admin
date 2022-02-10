<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  setup() {
    return {}
  },
})
</script>

<style lang="less">
@import url('@admin/assets/css/global.css');
@import url('@admin/assets/css/markdown-global.css');
</style>
