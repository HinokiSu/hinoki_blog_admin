<template>
  <div class="category-feature">
    <card-feature
      :no-search="true"
      add-name="添加类别"
      @addjuction-click="cardFeaturesHandler.addjuction"
    ></card-feature>
  </div>
  <a-table bordered :data-source="categoryList" :columns="columns" :pagination="false">
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'name'">
        {{ record.name }}
      </template>
      <template v-if="column.dataIndex === 'createdAt'">
        {{ record.createdAt }}
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <a style="margin-right: 8px" @click="onEdit(record._id)">编辑</a>
        <a-popconfirm v-if="categoryList.length" title="确定要删除吗?" @confirm="onDelete(record._id)">
          <a>删除</a>
        </a-popconfirm>
      </template>
    </template>
  </a-table>
  <a-modal v-model:visible="visible" title="编辑" @ok="submitEdit" @cancel="cancelEidtModal">
    <p>名称</p>
    <a-input v-model:value="editModalValue.name" placeholder="Basic usage"></a-input>
  </a-modal>
</template>
<script lang="ts">
import { ICategory } from '@admin/interfaces/ICategory'
import { useRouter } from 'vue-router'
import { useCategoryStore } from '@admin/stores'
import { computed, defineComponent, getCurrentInstance, onMounted, ref } from 'vue'
import CardFeature from '@admin/components/card-main/card-feature.vue'

export default defineComponent({
  name: 'Categories',
  components: { CardFeature },
  setup() {
    const router = useRouter()
    const CategoryStore = useCategoryStore()
    const categoryList = computed<ICategory[]>(() => CategoryStore.categoryList)
    const editModalValue = computed(() => CategoryStore.categoryData)
    const { proxy } = getCurrentInstance() as any
    const visible = ref<boolean>(false)
    const categoryId = ref<string>('')

    // 表头
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
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
          // TODO: whether adding new component or modal
          name: 'create-category',
        })
      },
    }

    onMounted(() => {
      CategoryStore.getCategoryList()
    })

    // 删除类别
    const onDelete = async (id: string) => {
      await CategoryStore.deleteCategory(id).then(
        () => {
          CategoryStore.getCategoryList()
          proxy.$toast['success']({
            text: '删除类别成功!',
            duration: '1500',
          })
        },
        () => {
          proxy.$toast['error']({
            text: '删除类别失败',
            duration: '1500',
          })
        }
      )
    }

    // 打开Edit Modal
    const onEdit = (id: string) => {
      // 暂存id
      categoryId.value = id
      // 根据id获取category数据, 将用于编辑
      CategoryStore.getCategoryById(id)
      setTimeout(() => {
        visible.value = !visible.value
      }, 250)
    }

    // Modal中submit
    const submitEdit = async () => {
      await CategoryStore.updateCategory(categoryId.value).then(
        () => {
          CategoryStore.getCategoryList()
          proxy.$toast['success']({
            text: '编辑类别成功!',
            duration: '1500',
          })
        },
        () => {
          proxy.$toast['error']({
            text: '编辑类别失败',
            duration: '1500',
          })
        }
      )
    }
    const cancelEidtModal = () => {
      CategoryStore.recycleCategoryData()
      categoryId.value = ''
      proxy.$toast['warning']({
        text: `已取消编辑`,
        duration: '1500',
      })
    }
    return {
      columns,
      cardFeaturesHandler,
      categoryList,
      onDelete,
      onEdit,
      visible,
      editModalValue,
      submitEdit,
      cancelEidtModal,
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
