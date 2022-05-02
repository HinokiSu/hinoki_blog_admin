<template>
  <div class="comments__wrapper">
    <a-table bordered :data-source="commentList" :columns="columns" :pagination="false">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'nickname'">
          {{ record.visitor?.nickname || '' }}
        </template>
        <template v-if="column.dataIndex === 'createdAt'">
          {{ record.createdAt }}
        </template>
        <template v-if="column.dataIndex === 'content'">
          {{ record.content }}
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <a-popconfirm v-if="commentList.length" title="确定要删除吗?" @confirm="onDelete(record._id)">
            <a>删除</a>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
import { useRouter } from 'vue-router'
import { useCommentStore } from '@admin/stores'
import { computed, defineComponent, getCurrentInstance, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'Comments',
  setup() {
    const router = useRouter()
    const CommentStore = useCommentStore()
    const commentList = computed(() => CommentStore.commentList)
    const { proxy } = getCurrentInstance() as any
    const visible = ref<boolean>(false)

    // 表头
    const columns = [
      {
        title: '评论的访问者',
        dataIndex: 'nickname',
        width: '30%',
      },
      {
        title: '评论创建的时间',
        dataIndex: 'createdAt',
      },
      {
        title: '评论的内容',
        dataIndex: 'content',
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
      CommentStore.getCommentList()
    })

    // 删除用户
    const onDelete = async (id: string) => {
      await CommentStore.deleteVisitor(id).then(
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
      await CommentStore.getCommentList()
    }

    return {
      cardFeaturesHandler,
      columns,
      commentList,
      onDelete,
      visible,
    }
  },
})
</script>
<style lang="less">
.comments__wrapper {
  margin-top: 24px;
}

</style>
