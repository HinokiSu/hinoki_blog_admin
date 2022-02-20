<template>
  <div class="hinoki-blog navigation">
    <div class="logo">
      <router-link :to="{ name: 'home' }">
        <img src="@admin/assets/logo.png" alt="logo" />
      </router-link>
    </div>
    <div class="cms_name">
      <p>Hinoki's Blog CMS</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NavBar',
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
.hinoki-blog {
  &.navigation {
    width: 100%;
    height: 100%;
    background-color: var(--primary-background);

    display: flex;
    flex-direction: row;
    align-items: center;
    box-shadow: 0 0 36px var(--accents-2);

    .logo {
      margin-left: 24px;
      cursor: pointer;
      overflow: hidden;
      img {
        width: 56px;
        object-fit: cover;
      }
    }

    .cms_name {
      margin-left: 30px;
      p {
        font-size: 1.8rem;
        font-weight: 500;
        letter-spacing: 1px;
      }
    }
  }
}
</style>
