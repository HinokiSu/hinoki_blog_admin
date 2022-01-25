<template>
  <main class="hinoki-blog main_content">
    <fe-card shadow>
      <div class="bread_wrapper">
        <card-breadnav :breadNavList="curNavList"></card-breadnav>
      </div>
      <router-view></router-view>
    </fe-card>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import CardBreadnav from '@admin/components/card-main/card-breadnav.vue'
import { IBreadNav } from '@admin/interfaces'
import router from '@admin/routes'

export default defineComponent({
  name: 'ContentLayout',
  components: { CardBreadnav },
  setup() {
    const curNavList = ref<IBreadNav[]>([
      {
        name: 'Home',
        toPath: '/',
      },
    ])

    const curRouteList = ref<string[]>([])
    watchEffect(() => {
      const curRoutePath = router.currentRoute.value.fullPath
      curRouteList.value = curRoutePath.slice(1).split('/', 2)

      if (curRouteList.value[0] === 'manage') {
        curNavList.value.length = 1
        if (curRouteList.value[1] === 'articles' || curRouteList.value[1] === 'article') {
          curNavList.value.push({
            name: 'Articles',
            toPath: curRoutePath,
          })
        } else if (curRouteList.value[1] === 'categories') {
          curNavList.value.push({
            name: 'Categories',
            toPath: curRoutePath,
          })
        }
      }

      if (curRouteList.value[0] === 'article') {
        curNavList.value.length = 2
        curNavList.value.push({
          name: curRouteList.value[1],
          toPath: curRoutePath,
        })
      }
    })

    return {
      curNavList,
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

    @media only screen and( max-width: 650px) {
      padding-left: 0px;
      padding-bottom: 0px;
    }
  }
}
</style>
