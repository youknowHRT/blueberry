<template>
  <div class="main" ref="lineChart" style="height: 128px"></div>
</template>
<script lang="ts" setup name="LineChart">
import * as echarts from 'echarts'
import { ref, onMounted, nextTick, PropType, watch } from 'vue'
import dayjs from 'dayjs'
import { getMoney } from '@/utils/money'

const props= defineProps({
  data: {
    type: Array as PropType<[string, number][]>,
    default: () => []
  }
})
const lineChart = ref<HTMLDivElement>()
let myChart: echarts.ECharts | undefined = undefined

const option = {
    grid: [{ left: 16, top: 20, right: 16, bottom: 20 }],
    tooltip: {
      show: true,
      trigger: 'axis',
      formatter: ([item]: any) => {
        const [x, y] = item.data
        return `${dayjs(x).format('YYYY年MM月DD日')} ￥${getMoney(y)}`
      },
    },
    xAxis: {
      type: 'time',
      boundaryGap: ['3%', '0%'],
      axisLabel:{
        formatter:(value: string)=>{
          return dayjs(value).format('MM-DD')
        },
      },
      axisTick: {
        alignWithLabel: true,
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        show: false
      }
    },
  }
const initChart = () => {
  myChart!.setOption({
    ...option,
    series: [
      {
        data: props.data,
        type: 'line'
      }
    ]
  })
}
onMounted(() => {
  if (lineChart.value === undefined) return
  nextTick(() => {
    myChart = echarts.init(lineChart.value as HTMLDivElement)
    initChart()
  })
})
watch(
  () => props.data,
  () => initChart()
)
</script>
<style scoped lang="scss"></style>
