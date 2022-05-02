<template>
  <div class="category-feature">
    <card-feature
      :no-search="true"
      add-name="添加用户"
      @addjuction-click="cardFeaturesHandler.addjuction"
    ></card-feature>
  </div>
  <a-table bordered :data-source="userList" :columns="columns" :pagination="false">
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'username'">
        {{ record.username }}
      </template>
      <template v-if="column.dataIndex === 'createdAt'">
        {{ record.createdAt }}
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <a-popconfirm v-if="userList.length" title="确定要删除吗?" @confirm="onDelete(record._id)">
          <a>删除</a>
        </a-popconfirm>
      </template>
    </template>
  </a-table>
  <a-modal v-model:visible="visible" title="添加用户" @ok="addUser" @cancel="cancelAddUser">
    <!--  <p>名称</p>
    <a-input v-model:value="user" placeholder="Basic usage"></a-input> -->
  </a-modal>
</template>
<script lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@admin/stores'
import { computed, defineComponent, getCurrentInstance, onMounted, ref } from 'vue'
import EmptyWrap from '@admin/components/empty-wrap/index.vue'
import CardFeature from '@admin/components/card-main/card-feature.vue'

export default defineComponent({
  name: 'Users',
  components: { EmptyWrap, CardFeature },
  setup() {
    const router = useRouter()
    const UserStore = useUserStore()
    const userList = computed(() => UserStore.userList)
    const { proxy } = getCurrentInstance() as any
    const visible = ref<boolean>(false)

    // 表头
    const columns = [
      {
        title: '用户名称',
        dataIndex: 'username',
        width: '30%',
      },
      {
        title: '创建的时间',
        dataIndex: 'createdAt',
      },
      {
        title: '操作',
        dataIndex: 'operation',
      },
    ]

    // 面包屑
    const cardFeaturesHandler = {
      addjuction: () => {
        router.push({
          name: 'create-user',
        })
      },
    }

    onMounted(() => {
      UserStore.getUsers()
    })

    // 删除用户
    const onDelete = async (id: string) => {
      await UserStore.deleteUser(id).then(
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
    }

    // Modal中submit
    const addUser = async () => {}
    const cancelAddUser = () => {}
    return {
      cardFeaturesHandler,
      columns,
      userList,
      onDelete,
      visible,
      addUser,
      cancelAddUser,
    }
  },
})
</script>
<style lang="less">
.editable-cell {
  position: relative;
  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    margin-top: 4px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
}
.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}
</style>
