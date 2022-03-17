import {
  TitleComponent,
  TooltipComponent,
  VisualMapComponent,
  DatasetComponent,
  GridComponent,
  TransformComponent,
  DatasetComponentOption,
  GridComponentOption,
  LegendComponent,
} from 'echarts/components'
import { PieChart, BarChart, BarSeriesOption } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import * as echarts from 'echarts/core'

export const Charts = [
  PieChart,
  TitleComponent,
  TooltipComponent,
  VisualMapComponent,
  LabelLayout,
  CanvasRenderer,
  BarChart,
  DatasetComponent,
  GridComponent,
  TransformComponent,
  LegendComponent,
]

export type BarEChartsOption = echarts.ComposeOption<DatasetComponentOption | GridComponentOption | BarSeriesOption>

export const ChartRegister = (instance: any) => Charts.map((_) => instance.use(_))
