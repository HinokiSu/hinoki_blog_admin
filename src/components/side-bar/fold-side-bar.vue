<template>
  <div class="hinoki-blog fold-side-bar">
    <div class="burger" @click="clickHandler">
      <div class="burger-line-1"></div>
      <div class="burger-line-2"></div>
      <div class="burger-line-3"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FoldSideBar',
  emits: ['click'],
  setup(props, { emit }) {
    const clickHandler = () => emit('click')
    return {
      clickHandler,
    }
  },
})
</script>

<style lang="less" scoped>
.hinoki-blog {
  & .fold-side-bar {
    display: none;

    .burger {
      display: none;
    }

    @media only screen and( max-width: 650px) {
      & {
        display: block;
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        position: sticky;
        top: 0;
        left: 0;
        z-index: 30;
        background: var(--primary-background);
        padding-left: 2vw;
        box-sizing: border-box;
        border-bottom: 1px solid var(--fay-border);
      }
      & .burger {
        width: 45px;
        height: 19px;

        display: grid;
        grid-template-rows: repeat(3, 1fr);
        justify-items: center;
        align-items: center;

        row-gap: 4px;
        cursor: pointer;

        .burger-line-1,
        .burger-line-2,
        .burger-line-3 {
          width: 45px;
          height: 3px;
          background-color: var(--accents-8);
          transition: 0.5s ease;
          border-radius: 2px;
        }

        /* 折叠按钮的三条线 */
        &:hover {
          .burger-line-1,
          .burger-line-2,
          .burger-line-3 {
            background-color: #2e2e2e;
            /* 折叠动画 */
            transition: 0.4s ease;
          }
          .burger-line-1 {
            /* 转动45度，正数是一个从左到右旋转 */
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
}
</style>
