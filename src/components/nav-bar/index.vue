<template>
  <div class="hinoki navbar">
    <div class="container">
      <div class="logo">
        <router-link :to="{ name: 'home' }">
          <img src="@admin/assets/logo.png" alt="" />
        </router-link>
      </div>
      <div class="cms_name">
        <p>Hinoki's Blog CMS</p>
      </div>
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
.hinoki {
  &.navbar {
    position: fixed;
    height: 100px;
    width: 100%;
    z-index: 99;
    background-color: var(--primary-background);

    .container {
      display: flex;
      flex-direction: row;
      align-items: center;
      box-shadow: 0 0 30px var(--accents-3);

      .logo {
        margin-left: 30px;
        cursor: pointer;
        overflow: hidden;
        img {
          width: 110px;
          height: 100%;
          object-fit: cover;
        }
      }

      .cms_name {
        margin-left: 30px;
        p {
          font-size: 38px;
          font-weight: 500;
          letter-spacing: 1px;
        }
      }
    }
  }
}
</style>
