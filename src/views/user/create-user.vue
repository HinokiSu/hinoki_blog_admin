<template>
  <div class="create-user__wrapper">
    <div class="title">
      <p>创建用户</p>
    </div>
    <a-form ref="formRef" name="custom-validation" :model="formState" :rules="rules" v-bind="layout">
      <a-form-item has-feedback label="用户名" name="username">
        <a-input v-model:value="formState.username" placeholder="请输入用户名✍..." />
      </a-form-item>
      <a-form-item has-feedback label="密码" name="pwd">
        <a-input v-model:value="formState.pwd" type="password" autocomplete="off" placeholder="请输入密码🔑..." />
      </a-form-item>
      <a-form-item has-feedback label="再次确认" name="checkPwd">
        <a-input
          v-model:value="formState.checkPwd"
          type="password"
          autocomplete="off"
          placeholder="请再次输入密码🔑..."
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 8 }">
        <a-button :disabled="isDisabled" type="primary" html-type="submit" @click.prevent="onSubmit">注册</a-button>
        <a-button style="margin-left: 12px" @click.prevent="onCancel">取消</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import { ICreateUser } from '@admin/interfaces'
import { useUserStore } from '@admin/stores'
import type { Rule } from 'ant-design-vue/es/form'
import { computed, defineComponent, getCurrentInstance, onBeforeMount, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'CreateUser',
  setup() {
    const formRef = ref()
    const router = useRouter()
    const formState = reactive<ICreateUser>({
      username: '',
      pwd: '',
      checkPwd: '',
    })
    const { proxy }: any = getCurrentInstance()

    const UserStore = useUserStore()

    // 控制 注册按钮的 启用状态
    const isDisabled = computed((): boolean => {
      return !(formState.username && formState.pwd && formState.checkPwd)
    })

    // 验证 用户名
    let validateUsername = async (_rule: Rule, value: string) => {
      if (value === '') {
        return Promise.reject('请输入昵称')
      } else {
        if (value.includes(' ')) {
          return Promise.reject('昵称不允许存在空格字符')
        } else {
          if (value.length < 4) {
            return Promise.reject('昵称不能小于4个字符')
          } else if (value.length > 10) {
            return Promise.reject('昵称不能大于10个字符')
          } else {
            if (formState.checkPwd !== '') {
              formRef.value.validateFields('username')
            }
          }
        }
        return Promise.resolve()
      }
    }
    let validatePwd = async (_rule: Rule, value: string) => {
      if (value === '') {
        return Promise.reject('请输入密码')
      } else {
        if (value.length < 8) {
          return Promise.reject('密码不能小于8位')
        } else if (value.length > 16) {
          return Promise.reject('密码不能大于16位')
        } else {
          if (formState.checkPwd !== '') {
            formRef.value.validateFields('pwd')
          }
        }
        return Promise.resolve()
      }
    }
    let validatePwd2 = async (_rule: Rule, value: string) => {
      if (value === '') {
        return Promise.reject('请再次输入密码')
      } else if (value !== formState.pwd) {
        return Promise.reject('两次密码不一致!')
      } else {
        return Promise.resolve()
      }
    }

    const rules = {
      username: [{ required: true, validator: validateUsername, trigger: 'change' }],
      pwd: [{ required: true, validator: validatePwd, trigger: 'change' }],
      checkPwd: [{ required: true, validator: validatePwd2, trigger: 'change' }],
    }
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 10 },
    }

    // 创建按钮
    const onSubmit = async () => {
      await UserStore.createUser({
        username: formState.username,
        password: formState.pwd,
      }).then(
        () => {
          proxy.$toast['success']({
            text: '创建用户成功!',
            duration: '1500',
          })
        },
        () => {
          proxy.$toast['error']({
            text: '创建用户失败',
            duration: '1500',
          })
        }
      )
    }

    const onCancel = () => {
      proxy.$toast['warning']({
        text: `取消创建用户`,
        duration: '1500',
      })
      router.push({
        name: 'users',
      })
    }

    onBeforeMount(() => {
      formState.username = ''
      formState.pwd = ''
      formState.checkPwd = ''
    })
    return {
      formState,
      isDisabled,
      formRef,
      rules,
      layout,
      onCancel,
      onSubmit,
    }
  },
})
</script>

<style lang="less" scoped>
.create-user__wrapper {
  padding: 24px;
  display: flex;
  flex-direction: column;
  .title {
    margin-bottom: 24px;
    align-self: center;
    font-size: 1.8rem;
    padding: 16px 0;
  }
}
</style>
