<template>
  <div class="hinoki-blog card_feature">
    <div class="search" v-if="!noSearch">
      <fe-input size="medium" placeholder="请输入..." clearable v-model="searchValue" @clear-click="emitClearClick" />
      <fe-button class="search-btn" size="medium" auto @click="searchClick">{{ searchName }}</fe-button>
    </div>
    <div class="adjunction">
      <fe-button class="add-btn" type="success" auto size="medium" @click="emitAddjunction">{{ addName }}</fe-button>
    </div>
  </div>
</template>

<script lang="ts">
import { debounce } from '@admin/hooks'
import { defineComponent, getCurrentInstance, ref, watch } from 'vue'

export default defineComponent({
  name: 'CardFeature',
  props: {
    noSearch: {
      type: Boolean,
      default: false,
    },
    searchName: {
      type: String,
      default: '搜索',
    },
    addName: {
      type: String,
      default: '添加',
    },
  },
  emits: ['searchClick', 'addjuctionClick', 'clearClick', 'judgeEmpty'],
  setup(props, { emit }) {
    const searchValue = ref('')
    const { proxy } = getCurrentInstance() as any

    const emitSearchClick = () => {
      if (searchValue.value === '') {
        proxy.$toast['warning']({
          text: '搜索内容不能为空',
          duration: '1000',
        })
      } else {
        emit('searchClick', searchValue.value)
      }
    }

    watch(
      () => searchValue.value === '',
      () => {
        if (searchValue.value === '') {
          emit('judgeEmpty')
        }
      }
    )

    const searchClick = debounce(emitSearchClick, 500)
    const emitAddjunction = () => {
      emit('addjuctionClick')
    }

    const emitClearClick = () => {
      emit('clearClick')
    }

    return {
      searchValue,
      searchClick,
      emitAddjunction,
      emitClearClick,
    }
  },
})
</script>

<style lang="less" scoped>
.hinoki-blog {
  &.card_feature {
    padding-top: 16px;
    padding-bottom: 20px;

    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    column-gap: 10px;

    .search {
      display: flex;
      flex-direction: row;
      align-items: center;
      column-gap: 12px;

      .search-btn {
        font-size: 1.2rem;
        font-weight: 500;
      }
    }

    .adjunction {
      justify-self: right;

      .add-btn {
        font-size: 1.1rem;
      }
    }

    @media screen and (max-width: 500px) {
      & {
        grid-template-columns: unset;
        grid-template-rows: repeat(2, 1fr);
        row-gap: 0.8rem;

        .search {
          flex-direction: unset;
        }

        .adjunction {
          justify-self: left;
        }
      }
    }
  }
}
</style>
