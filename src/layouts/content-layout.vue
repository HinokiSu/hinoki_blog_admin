<template>
  <main class="hinoki-blog main-content">
    <fe-card shadow>
      <div class="bread_wrapper">
        <card-breadnav :breadNavList="curNavList"></card-breadnav>
      </div>
      <div class="content__container">
        <router-view></router-view>
      </div>
    </fe-card>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import CardBreadnav from '@admin/components/card-main/card-breadnav.vue'
import { IBreadNav } from '@admin/interfaces'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'ContentLayout',
  components: { CardBreadnav },
  setup() {
    const router = useRouter()
    const curNavList = ref<IBreadNav[]>([
      {
        name: 'Home',
        toPath: '/',
      },
    ])

    const curRouteList = ref<string[]>([])
    watchEffect(() => {
      const curRoutePath = router.currentRoute.value.fullPath
      curRouteList.value = curRoutePath.slice(1).split('/', 3)

      if (curRouteList.value[0] === 'manage') {
        curNavList.value.length = 1
        if (curRouteList.value[1] === 'articles' || curRouteList.value[1] === 'article') {
          curNavList.value.push({
            name: 'Articles',
            toPath: '/manage/articles',
          })
          if (curRouteList.value[2]) {
            if (curRouteList.value[2] === 'create') {
              curNavList.value.push({
                name: 'Create',
                toPath: curRoutePath,
              })
            } else if (curRouteList.value[2] === 'update') {
              curNavList.value.push({
                name: 'Update',
                toPath: curRoutePath,
              })
            }
          }
        } else if (curRouteList.value[1] === 'categories' || curRouteList.value[1] === 'category') {
          curNavList.value.push({
            name: 'Categories',
            toPath: '/manage/categories',
          })
          if (curRouteList.value[2]) {
            if (curRouteList.value[2] === 'create') {
              curNavList.value.push({
                name: 'Create',
                toPath: curRoutePath,
              })
            }
          }
        } else if (curRouteList.value[1] === 'users' || curRouteList.value[1] === 'user') {
          curNavList.value.push({
            name: 'Users',
            toPath: '/manage/users',
          })
          if (curRouteList.value[2]) {
            if (curRouteList.value[2] === 'create') {
              curNavList.value.push({
                name: 'Create',
                toPath: curRoutePath,
              })
            }
          }
        } else if (curRouteList.value[1] === 'fettle') {
          curNavList.value.push({
            name: 'Fettle',
            toPath: '/manage/fettle',
          })
        } else if (curRouteList.value[1] === 'visitors') {
          curNavList.value.push({
            name: 'Visitors',
            toPath: '/manage/visitors',
          })
        } else if (curRouteList.value[1] === 'comments') {
          curNavList.value.push({
            name: 'Comments',
            toPath: '/manage/comments',
          })
        }
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
  &.main-content {
    display: flex;
    width: 100%;
    padding-bottom: 40px;

    .bread_wrapper {
      padding: 0px 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid var(--accents-2);
    }
    .content__container {
    }

    @media only screen and( max-width: 650px) {
      padding-left: 0px;
      padding-bottom: 0px;
    }
  }
}
</style>
