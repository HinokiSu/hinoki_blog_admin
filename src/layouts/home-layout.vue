<template>
  <div class="hinoki-blog layout-body">
    <div class="layout--header">
      <nav-bar></nav-bar>
    </div>
    <div class="layout--left-side">
      <side-bar></side-bar>
      <!-- fold side bar -->
      <!--  <fold-side-bar @click="visible = true"></fold-side-bar>
      <fe-drawer placement="left" v-model="visible">
        <side-bar></side-bar>
      </fe-drawer> -->
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
    const visible = ref<boolean>(false)
    return {
      visible,
    }
  },
})
</script>

<style lang="less" scoped>
.hinoki-blog {
  &.layout-body {
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 100vh;

    & .layout--header {
      position: fixed;
      height: 64px;
      width: 100%;
      z-index: 99;
    }

    & .layout--left-side {
      position: fixed;
      padding: 0 24px;
      margin-top: 120px;
      width: 120px;
      height: 80vh;
    }

    & .layout--main {
      width: 100%;
      margin-left: 196px;
      margin-right: 24px;
      margin-top: 120px;
    }

    /* @media only screen and( max-width: 650px) {
        & {
          flex-direction: column;
        }
        .side-bar-main {
          display: none;
        }

        .side-bar--shadow {
          display: none;
        }
      } */
  }
}
</style>
