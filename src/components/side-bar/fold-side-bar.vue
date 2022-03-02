<template>
  <div class="hinoki-blog fold-side-bar">
    <div class="burger" @click="clickHandler">
      <div class="burger-line-1"></div>
      <div class="burger-line-2"></div>
      <div class="burger-line-3"></div>
    </div>
    <fe-drawer placement="left" v-model="visible">
      <side-bar style="box-shadow: unset"></side-bar>
    </fe-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import SideBar from '@admin/components/side-bar/index.vue'

export default defineComponent({
  name: 'FoldSideBar',
  components: {
    SideBar,
  },
  setup(props, { emit }) {
    const visible = ref<boolean>(false)
    const clickHandler = () => {
      visible.value = !visible.value
    }
    return {
      clickHandler,
      visible,
    }
  },
})
</script>

<style lang="less" scoped>
.hinoki-blog {
  &.fold-side-bar {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 30;
    background: var(--primary-background);
    box-sizing: border-box;
    border-bottom: 1px solid var(--fay-border);
    & .burger {
      width: 45px;
      height: 19px;

      display: grid;
      grid-template-rows: repeat(3, 1fr);
      justify-items: center;
      align-items: center;

      row-gap: 2px;
      cursor: pointer;

      .burger-line-1,
      .burger-line-2,
      .burger-line-3 {
        width: 45px;
        height: 2px;
        background-color: var(--accents-7);
        transition: all 0.5s ease;
        border-radius: 2px;
        margin: 2px 0;
      }

      &:hover {
        .burger-line-1,
        .burger-line-2,
        .burger-line-3 {
          background-color: #2e2e2e;
          transition: 0.4s ease;
        }
        .burger-line-1 {
          transform: translateX(10px);
        }
        .burger-line-2 {
          transform: translateX(15px);
        }
        .burger-line-3 {
          transform: translateX(10px);
        }
      }
    }
  }
}
</style>
