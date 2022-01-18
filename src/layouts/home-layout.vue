<template>
  <div class="hinoki-blog home-layout">
    <nav-bar></nav-bar>

    <div class="tablecloth-layout">
      <side-bar class="side-bar-main"></side-bar>

      <div class="side-bar--shadow" />

      <!-- fold side bar -->
      <fold-side-bar @click="visible = true"></fold-side-bar>

      <fe-drawer placement="left" v-model="visible">
        <side-bar></side-bar>
      </fe-drawer>

      <!-- content area -->
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
  &.home-layout {
    .tablecloth-layout {
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

      @media only screen and( max-width: 650px) {
        & {
          flex-direction: column;
        }
        .side-bar-main {
          display: none;
        }

        .side-bar--shadow {
          display: none;
        }
      }
    }
  }
}
</style>
