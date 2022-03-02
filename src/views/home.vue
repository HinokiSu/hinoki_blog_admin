<template>
  <div class="hinoki-blog home">
    <fe-card class="card" shadow>
      <div class="home-container">
        <div class="introduction">
          <div class="logo">
            <img src="@admin/assets/logo.png" />
          </div>
          <div class="caption">
            <p>Hinoki's Blog Management Platform</p>
          </div>
          <div class="description">
            <p>This platform is used to manage blog resources, including articles, categories, photos, etc</p>
          </div>
        </div>
        <div class="charts">
          <!-- TODO: show chart -->
        </div>
      </div>
    </fe-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
.hinoki-blog {
  &.home {
    width: 100%;
    height: 80vh;
    display: flex;

    @media only screen and( max-width: 650px) {
      padding-left: 0px;
      padding-bottom: 0px;
    }

    .card {
      display: flex;
    }

    .home-container {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      .introduction {
        display: grid;
        grid-template-rows: 1fr auto 1fr;
        justify-items: center;
        align-items: center;

        .logo {
          width: 120px;
          img {
            object-fit: cover;
          }
        }

        .caption {
          padding: 10px;
          font-size: 2rem;
          font-weight: 500;
          text-align: center;
        }

        .description {
          font-size: 1.2rem;
          font-weight: 400;
          letter-spacing: 1px;
        }
      }
    }
  }
}
</style>
