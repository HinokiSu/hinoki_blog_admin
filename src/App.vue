<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue'
import * as echarts from 'echarts/core'
export default defineComponent({
  name: 'Home',
  setup() {
    provide('echarts', echarts)
    return {}
  },
})
</script>

<style lang="less">
@import url('@admin/assets/css/global.css');
@import url('@admin/assets/css/markdown-global.css');
</style>
