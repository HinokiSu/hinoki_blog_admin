<template>
  <div class="hinoki-blog side-bar">
    <div class="navigation__logo">
      <router-link :to="{ name: 'home' }">
        <img src="@admin/assets/logo.png" alt="logo" />
      </router-link>
    </div>
    <div class="features">
      <router-link :to="{ name: 'fettle' }">
        <div class="feature">
          <p><pie-chart class="f-icon state-icon" />仪表盘</p>
        </div>
      </router-link>
      <router-link :to="{ name: 'articles' }">
        <div class="feature">
          <p><file-text class="f-icon filetext-icon" />文章</p>
        </div>
      </router-link>
      <router-link :to="{ name: 'categories' }">
        <div class="feature">
          <p><hash class="f-icon hash-icon" />类别</p>
        </div>
      </router-link>
      <router-link :to="{ name: 'users' }">
        <div class="feature">
          <p><user class="f-icon user-icon" />用户</p>
        </div>
      </router-link>
      <router-link :to="{ name: 'visitors' }">
        <div class="feature">
          <p><Users class="f-icon user-icon" />访问者</p>
        </div>
      </router-link>
      <router-link :to="{ name: 'comments' }">
        <div class="feature">
          <p><MessageSquare class="f-icon message-icon" />评论</p>
        </div>
      </router-link>

      <!-- TODO -->
      <!-- <div class="feature">
        <p><image-icon class="f-icon image-icon" />Photo</p>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Hash, FileText, Image as ImageIcon, User, PieChart, MessageSquare, Users } from '@fect-ui/vue-icons'

export default defineComponent({
  name: 'SideBar',
  components: {
    Hash,
    FileText,
    ImageIcon,
    User,
    PieChart,
    Users,
    MessageSquare,
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
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 21, 41);
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 875px) {
      &.side-bar {
        background-color: #fff;

        .navigation__logo {
          background-color: white;
        }
        .features {
          .feature {
            color: var(--accents-5);
            border-radius: 16px;
            padding: 24px 0;
            &:hover {
              background-color: var(--accents-2);

              color: var(--accents-7);
            }
          }
        }
      }
    }
    // hidden srrollbar
    &::-webkit-scrollbar {
      width: 0;
    }

    .navigation__logo {
      margin-top: 20px;
      padding: 0 20px;
      cursor: pointer;
      width: 100px;
      height: 60px;
      background-color: rgba(236, 239, 243, 0.764);
      border-radius: 6px;
      img {
        width: 60px;
        object-fit: cover;
      }
    }

    .features {
      margin: 32px 0;
      display: grid;
      row-gap: 64px;
      justify-items: center;
      align-items: center;
      width: 100%;

      & a {
        width: 100%;
      }

      .feature {
        text-align: center;
        cursor: pointer;
        transition: all 0.4s ease 0s;
        color: rgb(136, 153, 169);
        padding: 16px 0;

        &:hover {
          // TODO: 选中后 切换到这个 tab
          background-color: rgba(40, 133, 233, 0.836);
          color: #fefefe;
        }

        p {
          font-size: 1.15rem;
          font-weight: 500;
          margin: 0;
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

          &.user-icon {
            width: 32px;
          }

          &.state-icon {
            width: 32px;
          }
          &.message-icon {
            width: 32px;
          }
        }
      }
    }
  }
}
</style>
