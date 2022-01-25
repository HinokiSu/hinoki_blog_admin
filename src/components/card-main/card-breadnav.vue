<template>
  <div class="hinoki-blog card_breadnav">
    <fe-breadcrumbs separator="/">
      <fe-breadcrumbsItem class="breadcrumbs-item-main" v-for="item in breadNavList" :key="item" :to="item.toPath">
        <p>{{ item.name }}</p>
      </fe-breadcrumbsItem>
    </fe-breadcrumbs>
  </div>
</template>

<script lang="ts">
import { IBreadNav } from '@admin/interfaces'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'CardBreadNav',
  props: {
    breadNavList: {
      // define props type
      type: Array as PropType<Array<IBreadNav>>,
    },
  },
  setup(props) {
    return {}
  },
})
</script>

<style lang="less" scoped>
.hinoki-blog {
  &.card_breadnav {
    & .breadcrumbs-item-main {
      p {
        text-transform: capitalize;
      }
    }
  }
}
</style>
