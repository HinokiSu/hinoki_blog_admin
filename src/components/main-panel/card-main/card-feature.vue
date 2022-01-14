<template>
  <div class="hinoki-blog card_feature">
    <div class="search">
      <fe-input size="small" placeholder="请输入..." clearable v-model="searchValue" />
      <fe-button auto size="large" @click="emitSearchClick">Search</fe-button>
    </div>
    <div class="adjunction">
      <fe-button type="success" auto size="large" @click="emitAddjunction">Add</fe-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CardFeature',
  emits: ['searchClick', 'addjuctionClick'],
  setup(props, { emit }) {
    const searchValue = ref('')
    const emitSearchClick = () => {
      emit('searchClick', searchValue.value)
    }
    const emitAddjunction = () => {
      emit('addjuctionClick')
    }

    return {
      searchValue,
      emitSearchClick,
      emitAddjunction,
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
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    .search {
      display: flex;
      align-items: center;
      button {
        margin-left: 20px;
        font-size: 26px;
        font-weight: 500;
      }
    }

    .adjunction {
      justify-self: right;
      margin-right: 20px;
      button {
        font-size: 26px;
      }
    }
  }
}
</style>
