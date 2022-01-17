<template>
  <div class="hinoki-blog side-bar">
    <div class="features">
      <div class="feature">
        <router-link :to="{ name: 'articles' }">
          <p>Article</p>
        </router-link>
      </div>
      <div class="feature">
        <router-link :to="{ name: 'users' }">
          <p>User</p>
        </router-link>
      </div>
      <div class="feature">
        <p>Category</p>
      </div>
      <div class="feature">
        <p>Photo</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SideBar',
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
.hinoki-blog {
  &.side-bar {
    position: fixed;
    flex-shrink: 0;

    width: 200px;
    height: 85%;
    overflow: auto;
    top: 120px;
    bottom: 0;
    box-shadow: 0 0 30px var(--accents-2);
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
      display: grid;
      justify-items: center;
      align-items: center;

      .feature {
        padding: 10px;
        margin: 20px 0;
        width: 80%;
        text-align: center;

        border: 2px solid white;
        cursor: pointer;
        transition: border 0.2s ease 0s, color 0.2s ease 0s;
        border-radius: 10px;

        &:hover {
          border-color: var(--accents-3);
        }

        p {
          font-size: 30px;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
