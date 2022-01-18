<template>
  <div class="hinoki-blog home">
    <fe-card class="card" shadow>
      <div class="home-container">
        <div class="introduction">
          <div class="logo">
            <img src="@admin/assets/logo.png" />
          </div>
          <div class="caption">
            <p>Hinoki Blog Management Platform</p>
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
    padding-top: 30px;
    padding-left: 50px;
    width: 100%;
    @media only screen and( max-width: 650px) {
      padding-left: 0px;
      padding-bottom: 0px;
    }

    .card {
      height: 100%;
    }

    .home-container {
      .introduction {
        display: grid;
        grid-template-rows: 1fr auto 1fr;
        justify-items: center;
        align-items: center;

        .logo {
          img {
            width: 200px;
            object-fit: cover;
          }
        }

        .caption {
          padding: 10px;
          font-size: 36px;
          font-weight: 500;
          text-align: center;
        }

        .description {
          font-size: 24px;
          font-weight: 400;
          letter-spacing: 1px;
        }
      }
    }
  }
}
</style>
