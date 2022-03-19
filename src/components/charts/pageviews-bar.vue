<template>
  <div id="pageviews-bar" class="chart__pageviews-bar"></div>
</template>

<script lang="ts">
import { BarEChartsOption } from '@admin/plugins'
import { useFettleStore } from '@admin/stores/fettleStore'
import { defineComponent, computed, onMounted, inject } from 'vue'

export default defineComponent({
  name: 'PageviewsBar',
  setup() {
    const echarts = inject('echarts') as any
    // fettle store by pinia
    const FettleStore = useFettleStore()
    const chartData = computed(() => FettleStore.pageviewsList)


    onMounted(async () => {
      await FettleStore.getPageviewsByCategory()
      const myChart = echarts.init(document.getElementById('pageviews-bar'))
      let option: BarEChartsOption = {
        title: {
          text: '类别浏览量汇总',
          left: 'center',
          top: 10,
          textStyle: {
            color: '#ccc',
          },
        },
        dataset: [
          {
            dimensions: ['name', 'value'],
            source: chartData.value,
          },
          {
            transform: {
              type: 'sort',
              config: { dimension: 'value', order: 'desc' },
            },
          },
        ],
        xAxis: {
          type: 'category',
          axisLabel: { interval: 0, rotate: 30 },
        },
        yAxis: {},
  
        series: {
          name: '浏览量',
          type: 'bar',
          encode: { x: 'name', y: 'value' },
          datasetIndex: 1,
  
          itemStyle: {
            color: function (colors: any) {
              const colorList = ['#45C2E0', '#C1EBDD', '#FFC851', '#5A5476', '#1869A0', '#FF9393']
              return colorList[colors.dataIndex]
            },
            shadowBlur: 100,
            shadowColor: 'rgba(0, 0, 0, 0.2)',
          },
        },
        tooltip: {},
      }
      myChart.setOption(option)
      window.onresize = function () {
        myChart.resize()
      }
    })

    return {}
  },
})
</script>

<style lang="less" scoped>
.chart__pageviews-bar {
  width: 500px;
  max-width: 100%;
  height: 500px;
}
</style>
