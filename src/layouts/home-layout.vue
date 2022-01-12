<template>
  <div class="hinoki-blog home">
    <nav-bar></nav-bar>
    <div class="tablecloth_layout">
      <side-bar></side-bar>
      <div class="side-bar--shadow" />
      <!-- 内容区域 -->
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBar from '@admin/components/nav-bar/index.vue'
import SideBar from '@admin/components/side-bar/index.vue'
export default defineComponent({
  name: 'HomeLayout',
  components: {
    NavBar,
    SideBar,
  },
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
.hinoki-blog {
  &.home {
    .tablecloth_layout {
      width: 100%;
      top: 0;
      right: 0;
      left: 0;
      position: relative;

      display: flex;
      padding: 0 50px;
      padding-top: 100px;

      .side-bar--shadow {
        width: 200px;
        height: 100%;
        flex-shrink: 0;
      }
    }
  }
}
</style>
