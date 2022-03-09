<template>
  <div id="article-pie" class="chart__article__pie"></div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted } from 'vue'
import { useFettleStore } from '@admin/stores/fettleStore'
export default defineComponent({
  name: 'ArticlePie',
  setup() {
    const echarts = inject('echarts') as any
    // fettle store by pinia
    const FettleStore = useFettleStore()
    const chartData = computed(() => FettleStore.fettleList)

    onMounted(async () => {
      await FettleStore.getArticleCountInCategory()
      const myChart = echarts.init(document.getElementById('article-pie'))
      myChart.setOption({
        backgroundColor: '#fff',
        title: {
          text: '文章类别汇总',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#ccc',
          },
        },

        tooltip: {
          trigger: 'item',
        },

        series: [
          {
            name: '类别',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            // 数据
            /*
          {value: 文章数， name: 类别名}
        */
            data: chartData.value.sort(function (a, b) {
              return a.value - b.value
            }),
            roseType: 'radius',
            label: {
              color: 'rgba(100, 100, 100, 0.6)',
            },
            labelLine: {
              lineStyle: {
                color: 'rgba(24, 24, 24, 0.4)',
              },
              smooth: 0.2,
              length: 10,
              length2: 20,
            },

            itemStyle: {
              color: function (colors: any) {
                const colorList = ['#45C2E0', '#C1EBDD', '#FFC851', '#5A5476', '#1869A0', '#FF9393']
                return colorList[colors.dataIndex]
              },
              shadowBlur: 100,
              shadowColor: 'rgba(0, 0, 0, 0.2)',
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx: any) {
              return Math.random() * 200
            },
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
.chart__article__pie {
  width: 500px;
  max-width: 100%;
  height: 500px;
}
</style>
