<template>
  <div class="hinoki-blog empty-wrap" v-if="isEmpty">
    <div class="tips">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EmptyWrap',
  props: {
    isEmpty: Boolean,
    tips: String,
  },
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
.hinoki-blog {
  & .empty-wrap {
    width: 100%;
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .tips {
      font-size: 1.8rem;
      font-weight: 500;
    }
  }
}
</style>
