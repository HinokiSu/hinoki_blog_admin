<template>
  <div class="hinoki-blog user">
   <card-feature no-search @addjuction-click="showHandler.create" addName="添加用户"></card-feature>
    <div class="user__container">
      <fe-grid-group justify="flex-start" :gap="2">
        <fe-grid v-for="user in users" :key="user._id" :xs="24" :md="12">
          <user-item :user="user" @delete-click="showHandler.delete"></user-item>
        </fe-grid>
      </fe-grid-group>
    </div>
  </div>

  <fe-modal
    title="删除用户"
    v-model:visible="showModal.delete"
    cancel="取消"
    done="提交"
    @confirm="confirmHandler.delete"
    @cancel="cancelHandler"
  >
    <div v-if="showModal.delete" class="delete">
      {{ modalUser?.username }}
    </div>
  </fe-modal>

  <!-- Add User Modal -->
  <fe-modal
    title="添加用户"
    v-model:visible="showModal.create"
    cancel="取消"
    done="创建"
    @confirm="confirmHandler.create"
    @cancel="cancelHandler"
  >
    <div v-if="showModal.create" class="create-user">
      <!-- <div ></div> -->
      <div style="font-size: 1.1rem; margin-bottom: 4px">
        <fe-dot type="success">
          <span style="color: var(--highlight-pink); font-size: 14px; font-weight: 500" class="input-caption"
            >用户名</span
          >
        </fe-dot>
      </div>

      <fe-input auto v-model="creatingUser.username"> </fe-input>
      <fe-spacer :y="0.5" />
      <div style="font-size: 1.1rem; margin-bottom: 4px">
        <fe-dot type="warning">
          <span style="color: var(--highlight-pink); font-size: 14px; font-weight: 500" class="input-caption"
            >密码</span
          >
        </fe-dot>
      </div>
      <fe-input auto v-model="creatingUser.password"> </fe-input>
    </div>
  </fe-modal>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, onMounted, reactive, ref, watchEffect } from 'vue'
import { useUserStore } from '@admin/stores'
import UserItem from '@admin/components/user-item/user-item.vue'
import { IBaseUser } from '@admin/interfaces'
import { debounce } from '@admin/hooks'
import CardFeature from '@admin/components/card-main/card-feature.vue'
export default defineComponent({
  name: 'User',
  components: { UserItem, CardFeature },
  setup() {
    const UserStore = useUserStore()
    const showModal = reactive({
      create: false,
      delete: false,
    })
    const text = ref('')
    let modalUser = ref<IBaseUser>({
      _id: '',
      username: '',
      createdAt: '',
      updatedAt: '',
    })
    const { proxy } = getCurrentInstance() as any

    const creatingUser = reactive({
      username: '',
      password: '',
    })

    onMounted(() => {
      UserStore.getUsers()
    })

    const users = computed(() => UserStore.userList)

    // 控制模态框的显示
    const showHandler = {
      create() {
        showModal.create = !showModal.create
      },
      delete: (val: string) => {
        showModal.delete = !showModal.delete
        modalUser.value = <IBaseUser>UserStore.userList.find((item) => {
          if (item._id === val) {
            return item
          }
        })
      },
    }

    // 确认处理
    const confirmHandler = {
      async create() {
        if (creatingUser.username === '' || creatingUser.password === '') {
          proxy.$toast['warning']({
            text: '用户和密码不能为空',
            duration: '1500',
          })
        } else {
          await UserStore.createUser(creatingUser).then(() => {
            proxy.$toast['success']({
              text: '创建用户成功!',
              duration: '1500',
            })
          }),
            () => {
              proxy.$toast['error']({
                text: '创建用户失败',
                duration: '1500',
              })
            }
          await UserStore.getUsers()
        }
      },
      async delete() {
        await UserStore.deleteUser(modalUser.value._id).then(
          () =>
            proxy.$toast['success']({
              text: '删除用户成功!',
              duration: '1500',
            }),
          () =>
            proxy.$toast['error']({
              text: '删除用户失败!',
              duration: '1500',
            })
        )
        await UserStore.getUsers()
      },
    }

    const recycleData = () => {
      modalUser.value = {
        _id: '',
        username: '',
        createdAt: '',
        updatedAt: '',
      }
      creatingUser.username = ''
      creatingUser.password = ''
    }

    watchEffect(async () => {
      text.value = showModal.create ? '创建' : '删除'

      if (!showModal.create && !showModal.delete) {
        recycleData()
      }
    })

    const cancelHandler = debounce(() => {
      proxy.$toast['warning']({
        text: `取消${text.value}用户`,
        duration: '1500',
      })
    }, 500)

    return {
      users,
      showModal,
      showHandler,
      modalUser,
      confirmHandler,
      cancelHandler,
      creatingUser,
    }
  },
})
</script>

<style lang="less" scoped>
.hinoki-blog {
  &.user {
    width: 100%;
    margin-top: 24px;
    .user__container {
      padding-top: 24px;
      padding-bottom: 64px;
    }
  }
}
</style>
