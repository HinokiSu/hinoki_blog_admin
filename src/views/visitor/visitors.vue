<template>
  <div class="visitor__wrapper">
    <a-table bordered :data-source="visitorList" :columns="columns" :pagination="false">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'nickname'">
          {{ record.nickname }}
        </template>
        <template v-if="column.dataIndex === 'email'">
          {{ record.email }}
        </template>
        <template v-if="column.dataIndex === 'createdAt'">
          {{ record.createdAt }}
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <a-popconfirm v-if="visitorList.length" title="确定要删除吗?" @confirm="onDelete(record._id)">
            <a>删除</a>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
import { useRouter } from 'vue-router'
import { computed, defineComponent, getCurrentInstance, onMounted, ref } from 'vue'
import { useVisitorStore } from '@admin/stores/visitorStore'

export default defineComponent({
  name: 'Visitor',
  setup() {
    const router = useRouter()
    const VisitorStore = useVisitorStore()
    const visitorList = computed(() => VisitorStore.visitorList)
    const { proxy } = getCurrentInstance() as any
    const visible = ref<boolean>(false)

    // 表头
    const columns = [
      {
        title: '访问者名称',
        dataIndex: 'nickname',
        width: '30%',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
      },
      {
        title: '注册的时间',
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
      VisitorStore.getVisitorList()
    })

    // 删除用户
    const onDelete = async (id: string) => {
      await VisitorStore.deleteVisitor(id).then(
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
      await VisitorStore.getVisitorList()
    }

    return {
      cardFeaturesHandler,
      columns,
      visitorList,
      onDelete,
      visible,
    }
  },
})
</script>
<style lang="less">
.visitor__wrapper {
  margin-top: 24px;
}
</style>
