<template>
  <div class="hinoki-blog login">
    <div class="container">
      <div class="left-area">
        <img src="" alt="" />
      </div>
      <div class="login-in-wrapper">
        <div class="login-in-container">
          <div class="caption">
            <p>Login In</p>
          </div>
          <div class="login-form">
            <fe-form :model="loginForm" :rules="rules" ref="formRef" label-width="100" inline label-position="top">
              <fe-form-item label="Username" prop="username">
                <fe-input
                  size="large"
                  clearable
                  v-model="loginForm.username"
                  placeholder="input your nick name"
                  class="form-username"
                ></fe-input>
              </fe-form-item>
              <fe-form-item label="Password" prop="password">
                <fe-input class=""  size="large" type="password" v-model="loginForm.password" placeholder="input your password"></fe-input>
              </fe-form-item>
            </fe-form>
          </div>
          <div class="form-btn">
            <fe-button size="large" auto @click="formBtnHandler.login">Sumbit</fe-button>
            <fe-button size="large" auto @click="formBtnHandler.reset">Rest</fe-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'login',
  setup() {
    interface ILoginInfo {
      username: string
      password: string
    }
    const loginForm = ref<ILoginInfo>({
      username: '',
      password: '',
    })

    const formRef = ref<Element>()

    const rules = ref({})

    const formBtnHandler = {
      login() {
        console.log(loginForm.value)
      },
      reset() {
        loginForm.value.username = ''
        loginForm.value.password = ''
      },
    }

    return {
      loginForm,
      rules,
      formRef,
      formBtnHandler,
    }
  },
})
</script>

<style lang="less" scoped>
.hinoki-blog {
  &.login {
    width: 100vw;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;

    .container {
      width: 65%;
      height: 80%;

      display: grid;
      grid-template-columns: repeat(2, 1fr);

      background-color: var(--accents-2);

      box-shadow: 0 0 20px var(--accents-3);
      border-radius: 30px;

      .left-area {
        border-radius: 30px 0 0 30px;
        background-color: rgb(79, 74, 90);
        z-index: 16;
      }

      .login-in-wrapper {
        border-radius: 0 30px 30px 0;
        background-color: var(--accents-1);
        margin-left: -40px;
        z-index: 15;
      }

      .login-in-container {
        width: 100%;
        height: 100%;
        display: grid;
        padding-left: 40px;
        padding-bottom: 40px;
        padding-top: 64px;
        grid-template-rows: 1fr 4fr 2fr;
        align-items: center;
        justify-items: center;

        .caption {
          font-size: 48px;
          font-weight: 500;
        }

        .login-form {
        }

        .form-btn {
          width: 50%;
          display: flex;
          flex-direction: column;
          row-gap: 20px;

          button {
            font-size: 24px;
            height: 56px;
          }
        }
      }
    }
  }
}
</style>
