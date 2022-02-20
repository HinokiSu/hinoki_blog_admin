<template>
  <div class="hinoki-blog layout-body">
    <div class="layout--header">
      <nav-bar></nav-bar>
    </div>
    <div class="layout--left-side">
      <side-bar></side-bar>
      <!-- fold side bar -->
    </div>
    <div class="layout--left-side__fold">
      <fold-side-bar></fold-side-bar>
    </div>
    <div class="layout--main">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavBar from '@admin/components/nav-bar/index.vue'
import SideBar from '@admin/components/side-bar/index.vue'
import FoldSideBar from '@admin/components/side-bar/fold-side-bar.vue'
export default defineComponent({
  name: 'HomeLayout',
  components: {
    NavBar,
    SideBar,
    FoldSideBar,
  },
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
.hinoki-blog {
  &.layout-body {
    display: flex;
    flex-direction: row;
    width: 100vw;

    @media only screen and( max-width: 875px) {
      & {
        flex-direction: column;
      }
    }

    & .layout--header {
      position: fixed;
      height: 64px;
      width: 100%;
      z-index: 99;
    }

    & .layout--left-side {
      position: fixed;
      padding-top: 96px;
      width: 120px;
      height: 100vh;

      @media only screen and(max-width: 875px) {
        & {
          display: none;
        }
      }
    }

    & .layout--left-side__fold {
      display: none;
      @media only screen and(max-width: 875px) {
        & {
          margin-top: 80px;
          margin-left: 24px;
          display: block;
        }
      }
    }

    & .layout--main {
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: column;
      margin-left: 160px;
      margin-right: 24px;
      margin-top: 100px;

      @media only screen and (max-width: 875px) {
        margin: unset;
        padding: 12px;
      }
    }
  }
}
</style>
