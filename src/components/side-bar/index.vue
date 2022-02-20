<template>
  <div class="hinoki-blog side-bar">
    <div class="features">
      <router-link :to="{ name: 'articles' }">
        <div class="feature">
          <p><FileText class="f-icon filetext-icon" />Article</p>
        </div>
      </router-link>
      <router-link :to="{ name: 'categories' }">
        <div class="feature">
          <p><Hash class="f-icon hash-icon" />Category</p>
        </div>
      </router-link>
      <div class="feature">
        <p><Image class="f-icon image-icon" />Photo</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Hash, FileText, Image } from '@fect-ui/vue-icons'

export default defineComponent({
  name: 'SideBar',
  components: {
    Hash,
    FileText,
    Image,
  },
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
.hinoki-blog {
  &.side-bar {
    flex-shrink: 0;
    width: inherit;
    height: inherit;
    overflow: auto;
    box-shadow: 0 0 30px var(--accents-2);
    border-radius: 24px;

    // hidden srrollbar
    &::-webkit-scrollbar {
      width: 0;
    }

    @media only screen and (max-width: 650px) {
      & {
        top: 0;
        left: 0;
        width: 30vw;
        height: 100%;
        z-index: 300;
        position: static;
        box-shadow: unset;
      }
    }

    .features {
      padding-top: 64px;
      display: grid;
      row-gap: 48px;
      justify-items: center;
      align-items: center;

      & a {
        width: 100%;
      }

      .feature {
        text-align: center;
        cursor: pointer;
        transition: all 0.4s ease 0s;
        border-radius: 16px;
        color: var(--accents-5);
        padding: 24px 0;
        width: 100%;

        &:hover {
          // TODO: 选中后 切换到这个 tab
          background-color: var(--accents-2);
          color: var(--primary-foreground);
        }

        p {
          font-size: 1.25rem;
          font-weight: 500;
        }

        .f-icon {
          vertical-align: sub;

          &.filetext-icon {
            width: 34px;
          }

          &.hash-icon {
            width: 24px;
          }
          &.image-icon {
            width: 36px;
          }
        }
      }
    }
  }
}
</style>
