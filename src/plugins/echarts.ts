import { TitleComponent, TooltipComponent, VisualMapComponent } from 'echarts/components'
import { PieChart } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

export const Charts = [TitleComponent, TooltipComponent, VisualMapComponent, PieChart, LabelLayout, CanvasRenderer]

export const ChartRegister = (instance: any) => Charts.map((_) => instance.use(_))
