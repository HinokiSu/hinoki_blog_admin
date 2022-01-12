<template>
  <div class="hinoki-blog card_feature">
    <div class="search">
      <fe-input placeholder="请输入..." :value="searchValue" clearable />
      <fe-button load-type="wave" size="large" ghost @click="emitSearchClick">Search</fe-button>
    </div>
    <div class="adjunction">
      <fe-button wd="40px" type="success" auto size="large" @click="emitAddjunction"> Adjunction </fe-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CardFeature',
  props: {
    searchValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:searchValue', 'searchClick', 'addjuctionClick'],
  setup(props, { emit }) {
    const emitSearchClick = () => {
      emit('searchClick', props.searchValue)
    }
    const emitAddjunction = () => {
      emit('addjuctionClick')
    }
    return {
      emitSearchClick,
      emitAddjunction,
    }
  },
})
</script>

<style lang="less" scoped>
.hinoki-blog {
  &.card_feature {
    display: flex;
    justify-content: space-between;

    margin-top: 20px;

    .search {
      button {
        min-width: 40px;
        
        margin-left: 20px;
        font-size: 26px;
        font-weight: 500;
      }
    }
  }
}
</style>
