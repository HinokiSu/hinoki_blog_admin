<template>
  <main class="hinoki-blog main_content">
    <fe-card shadow>
      <div class="bread_wrapper">
        <card-breadnav :breadNavList="navListProp"></card-breadnav>
      </div>
      <router-view></router-view>
    </fe-card>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CardBlock from '@admin/components/main-panel/card-block/card-block.vue'
import CardBreadnav from '@admin/components/main-panel/card-main/card-breadnav.vue'
import { IBreadNav } from '@admin/interfaces'

export default defineComponent({
  name: 'ContentLayout',
  components: { CardBlock, CardBreadnav },
  setup() {
    const navList = <IBreadNav[]>[
      {
        name: 'Home',
        toPath: '/article',
      },
      {
        name: 'Article',
        toPath: '/article',
      },
      {
        name: 'List',
        toPath: '/article',
      },
    ]

    const navListProp = ref(navList)
    return {
      navListProp,
    }
  },
})
</script>

<style lang="less" scoped>
.hinoki-blog {
  &.main_content {
    display: flex;
    width: 100%;
    padding-top: 30px;
    padding-left: 50px;
    padding-bottom: 40px;

    .bread_wrapper {
      padding: 0px 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid var(--accents-2);
    }
  }
}
</style>
