<template>
  <fe-card class="hinoki-blog user__card" shadow>
    <div class="user_container">
      <div class="user__name">
        {{ user?.username }}
      </div>
      <div class="user__features">
        <div class="feature__delete" @click="clickHandler.delete">删除</div>
      </div>
    </div>
  </fe-card>
</template>

<script lang="ts">
import { IBaseUser } from '@admin/interfaces'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'UserItem',
  props: {
    user: Object as PropType<IBaseUser>,
  },
  emits: ['editClick', 'deleteClick'],
  setup(props, { emit }) {
    const clickHandler = {
      edit() {
        emit('editClick', props.user?._id)
      },
      delete() {
        emit('deleteClick', props.user?._id)
      },
    }
    return {
      clickHandler,
    }
  },
})
</script>

<style lang="less" scoped>
.hinoki-blog {
  &.user__card {
    .user_container {
      width: 100%;
      display: flex;
      column-gap: 12px;
      justify-content: space-between;
    }

    & .user__name {
      font-size: 1.1rem;
    }

    & .user__features {
      .feature__delete {
        font-size: 1.2rem;
        color: var(--accents-5);
        cursor: pointer;
        transition: all 0.3s ease;
        padding: 4px 12px;
        &:hover {
          color: var(--accents-7);
          border-radius: 8px;
          background-color: var(--accents-2);
        }
      }
    }
  }
}
</style>
