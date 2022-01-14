<template>
  <div class="hinoki-card card-block" :style="style">
    <div class="wrapper">
      <div class="content">
        <slot></slot>
      </div>
      <div class="collapse-features">
        <!-- TODO: 1.跳转到:id 的文章, 可以修改/预览，保存 -->
        <div class="feature">
          <router-link :to="seeToLink">
            <p>See</p>
          </router-link>
        </div>

        <!-- TODO: 2.弹出对话框，修改标题、摘要... 设置是否可见， -->
        <div class="feature">
          <p>Mod</p>
        </div>

        <!-- TODO: 3.删除文章，会弹出提示框 -->
        <div class="feature">
          <p>Del</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'CardBlock',
  props: {
    disable: Boolean,
    // Whole width
    wd: {
      type: String,
      default: '240px',
    },
    // Whole height
    hg: {
      type: String,
      default: 'auto',
    },
    seeToLink: Object,

  },
  setup(props) {
    return {
      style: computed(() => ({
        width: `${props.wd}`,
        height: `${props.hg}`,
      })),
    }
  },
})
</script>

<style lang="less" scoped>
.hinoki-card {
  &.card-block {
    margin: 0;
    padding: 0;

    .wrapper {
      padding: 20px;
      transition: all 0.4s ease;

      .content {
        padding: 15px;
        box-shadow: 0 0 30px var(--accents-2);
      }

      .collapse-features {
        display: grid;
        border-top: 1px solid var(--accents-2);
        grid-template-columns: repeat(3, 1fr);
        justify-items: center;

        padding-top: 15px;

        .feature {
          font-size: 20px;
          font-weight: 500;
          cursor: pointer;

          transform: translateY(-50%);
          opacity: 0;
          transition: all 0.2s ease;
          transition-property: transform, opacity;
          transition-timing-function: cubic-bezier(1, 0, 0.65, 0.75), linear;
        }

        :nth-child(2) {
          transition-delay: 0.15s;
        }
        :nth-child(3) {
          transition-delay: 0.1s;
        }
      }

      &:hover {
        box-shadow: 0 0 36px var(--accents-2);

        .collapse-features {
          .feature {
            opacity: 1;
            transform: translateY(0);
            opacity: 1;
            transition-timing-function: cubic-bezier(0.2, 0.15, 0.1, 1), ease;
          }

          :nth-child(1) {
            transition-delay: 0.2s;
          }
          :nth-child(2) {
            transition-delay: 0.15s;
          }
          :nth-child(3) {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
