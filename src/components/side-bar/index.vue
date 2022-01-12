<template>
  <div class="hinoki-blog sidebar">
    <div class="features" v-for="item in 4" :key="item">
      <div class="feature">
        <router-link :to="{name: 'article'}">
          <p>Article</p>
        </router-link>
      </div>
      <router-link :to="{name: 'user'}">
        <div class="feature">
          <p>User</p>
        </div>
      </router-link>
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
  &.sidebar {
    position: fixed;
    flex-shrink: 0;

    width: 200px;
    height: 85%;
    overflow: auto;
    top: 120px;
    bottom: 0;

    // hidden srrollbar
    &::-webkit-scrollbar {
      width: 0;
    }

    box-shadow: 0 0 30px var(--accents-2);

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
