<template>
  <div id="comment-pie" class="chart__comment__pie"></div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted } from 'vue'
import { useFettleStore } from '@admin/stores/fettleStore'
export default defineComponent({
  name: 'CommnetPie',
  setup() {
    const echarts = inject('echarts') as any
    // fettle store by pinia
    const FettleStore = useFettleStore()
    const chartData = computed(() => FettleStore.commentFettle)

    onMounted(async () => {
      await FettleStore.getCommentByEveryArticle()
      const myChart = echarts.init(document.getElementById('comment-pie'))
      myChart.setOption({
       

        tooltip: {
          trigger: 'item',
        },

        series: [
          {
            name: '评论数',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '16',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: chartData.value,
          },
        ],
        // option && myChart.setOption(option)
      })
      window.onresize = function () {
        myChart.resize()
      }
    })
    return {}
  },
})
</script>

<style lang="less" scoped>
.chart__comment__pie {
  width: 500px;
  max-width: 300px;
  height: 400px;
  margin: auto;
}
</style>
