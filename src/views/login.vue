<template>
  <div class="hinoki-blog login">
    <div class="login-page__container">
      <div class="login__left">
        <img class="decorative-img" src="../assets/img/login-page__purple_sky.jpg" alt="" />
      </div>
      <div class="login__right">
        <div class="right__caption">
          <p>Login In</p>
        </div>
        <div class="right__form">
          <label class="form-item">
            <span :class="classes.nameLabel"> 用户名 </span>
            <fe-input
              size="large"
              clearable
              @change="formInputHandler.changeHandler($event)"
              v-model="loginForm.username"
              placeholder="input your name"
            />
          </label>
          <label class="form-item">
            <span :class="classes.pwdLabel"> 密码 </span>
            <fe-input size="large" type="password" v-model="loginForm.password" placeholder="input your password" />
          </label>
        </div>
        <div class="form__btns">
          <fe-button size="medium" type="success" auto @click="formBtnHandler.login">Sumbit</fe-button>
          <fe-button size="medium" auto @click="formBtnHandler.reset">Rest</fe-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ILoginUser } from '@admin/interfaces'
import router from '@admin/routes'
import { useUserStore } from '@admin/stores/userStore'
import { computed, defineComponent, reactive, ref, watch, watchEffect } from 'vue'

export default defineComponent({
  name: 'Login',
  setup() {
    const UserStore = useUserStore()
    const loginForm = ref<ILoginUser>({
      username: '',
      password: '',
    })

    const formInputHandler = {
      // 验证是否为空
      changeHandler: (e: Event) => {
        // console.log(e)
      },
    }

    const classes = ref({
      nameLabel: '',
      pwdLabel: '',
    })

    watch(
      () => loginForm.value.username,
      () => {
        if (loginForm.value.username === '') {
          classes.value.nameLabel = 'error'
        } else {
          classes.value.nameLabel = ''
        }
      }
    )

    watch(
      () => loginForm.value.password,
      () => {
        if (loginForm.value.password !== '') {
          classes.value.pwdLabel = ''
        }
      }
    )

    const formBtnHandler = {
      async login() {
        if (loginForm.value.username === '' || loginForm.value.password === '') {
          classes.value.nameLabel = 'error'
          classes.value.pwdLabel = 'error'
        } else {
          const res = await UserStore.loginAuth(loginForm.value.username, loginForm.value.password)
          if (res) {
            router.push(
              router.currentRoute.value.query!.redirect ? (router.currentRoute.value.query!.redirect as string) : '/'
            )
          }
        }
      },
      reset() {
        loginForm.value.username = ''
        loginForm.value.password = ''
      },
    }

    return {
      loginForm,
      formBtnHandler,
      formInputHandler,
      classes,
    }
  },
})
</script>

<style lang="less" scoped>
.hinoki-blog {
  &.login {
    position: relative;
    background: linear-gradient(
      to right bottom,
      rgba(112, 132, 219, 0.521),
      rgba(147, 80, 185, 0.425),
      rgba(182, 19, 60, 0.233)
    );

    width: 100%;
    height: 100vh;
    min-height: 600px;
    overflow: auto;

    & .login-page__container {
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      position: absolute;
      margin: auto;

      width: 60%;
      min-width: 800px;
      height: 80%;
      min-height: 500px;

      display: flex;
      background-color: var(--accents-1);
      border-radius: 32px;
    }

    & .login__left {
      width: 50%;

      img {
        border-radius: 32px;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    & .login__right {
      width: 50%;
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .right__caption {
        font-size: 2rem;
        font-weight: 600;
        color: var(--accents-7);
        margin-top: -12px;
      }

      .right__form {
        display: flex;
        flex-direction: column;

        .form-item {
          display: flex;
          flex-direction: column;
          padding: 12px 0;

          span {
            padding-bottom: 8px;
            font-size: 1.1rem;
            font-weight: 500;
            color: var(--accents-6);
            transition: all 0.2s ease-in;

            &.error {
              color: var(--error-default);
              &::before {
                content: '*';
              }
            }
          }
        }
      }

      .form__btns {
        margin-top: 24px;
        width: 65%;
        display: flex;
        flex-direction: column;
        row-gap: 24px;
      }
    }
  }
}
</style>
