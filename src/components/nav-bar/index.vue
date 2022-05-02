<template>
  <div class="hinoki-blog navigation">
    <div class="navigation__cms-caption">
      <p>Hinoki's Blog CMS</p>
    </div>
    <div class="navigation__user" :class="showFeatures">
      <div class="user_name" @click="clickHandler.showDetail">
        {{ userInfo.username }}
      </div>
      <div class="user__features">
        <div class="feature__arrow"></div>
        <div class="feature" @click="clickHandler.signOut">Sign out</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watchEffect } from 'vue'
import { useUserStore } from '@admin/stores'
import router from '@admin/routes'

export default defineComponent({
  name: 'NavBar',
  setup() {
    const UserStore = useUserStore()
    const userInfo = ref({
      username: '',
    })

    const showFeatures = ref('')

    onMounted(() => {
      userInfo.value.username = localStorage.getItem('username') ? (localStorage.getItem('username') as string) : ''
    })

    /* watchEffect(() => {
      userInfo.value.username = UserStore.user.username ? UserStore.user.username : ''
    }) */

    const clickHandler = {
      // 登出
      signOut() {
        UserStore.logout()
        setTimeout(() => {
          router.replace({
            name: 'login',
          })
        }, 200)
      },
      // 显示详细
      showDetail() {
        showFeatures.value = showFeatures.value === 'open' ? '' : 'open'
      },
    }

    return { userInfo, clickHandler, showFeatures }
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
    border-bottom: 1px solid #eee;

    .navigation__cms-caption {
      margin-left: 24px;
      p {
        text-align: center;
        font-size: 1.35rem;
        font-weight: 400;
        letter-spacing: 1px;
        margin: 0;
      }
    }

    .navigation__user {
      margin-left: auto;
      padding-right: 12px;

      .user_name {
        padding: 8px;
        cursor: pointer;
        font-size: 1rem;

        &::after {
          margin-left: 4px;
          content: '|';
          vertical-align: top;
          color: var(--accents-6);
        }
      }

      &.open {
        transition: all 1s ease;

        .user_name {
          &::before {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 80;
            display: block;
            cursor: default;
            content: ' ';
            background: transparent;
          }
        }

        .user__features {
          display: unset;
        }
      }
      .user__features {
        display: none;
        position: absolute;
        z-index: 999;
        background: var(--accents-1);
        box-shadow: 0 0 24px var(--accents-2);
        border-radius: 12px;
        top: 64px;
        right: 20px;

        padding: 16px 0;

        .feature__arrow {
          position: absolute;
          width: 0;
          height: 0;
          left: 50%;
          bottom: auto;
          right: auto;
          top: 3px;
          transform: translate(-50%, -100%) rotate(90deg);
          border-style: solid;
          border-width: 6px 6px 6px 0;
          border-color: transparent var(--primary-background) transparent transparent;
        }
        .feature {
          padding: 8px 4px;

          width: 100%;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 400;
          cursor: pointer;
          transition: all 0.3s ease-out;

          &:hover {
            background-color: var(--success-light);
            color: var(--accents-1);
          }
        }
      }
    }

    
  }
}
</style>
