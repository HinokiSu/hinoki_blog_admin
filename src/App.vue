<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
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

.ant-card {
  .ant-card-body {
    padding-bottom: 0 !important;
    padding-right: 0 !important;
    padding-left: 0 !important;
    padding-top: 8px;
  }
}
</style>
