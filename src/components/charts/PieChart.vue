<template>
  <div class="pieContainer" ref="pieChart"></div>
</template>
<script lang="ts" setup name="PieChart">
import * as echarts from 'echarts'
import { ref, PropType, onMounted, nextTick, watch} from 'vue'
import { getMoney } from '@/utils/money'
const pieChart = ref<HTMLDivElement>()
const option = {
  tooltip: {
    trigger: 'item',
    formatter: (x:{name: string,value: number,percent: number})=>{
      const {name,value,percent} = x
      return `${name}: ￥${getMoney(value)} 占比 ${percent}%`
    }
  },
  grid: [{ left: 16, top: 0, right: 16, bottom: 16 }],
  series: [
    {
      name: '类目占比',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
    }
  ]
}
let myChart: echarts.ECharts | undefined = undefined
onMounted(() => {
  if (!pieChart.value) return
  nextTick(() => {
    myChart = echarts.init(pieChart.value as HTMLDivElement)
    myChart!.setOption(option)
  })
})
const props = defineProps({
  data: {
    type: Array as PropType<{ name: string; value: number }[]>,
    default: () => []
  }
})
watch(
  () => props.data,
  () => {
    myChart!.setOption({
      series: [{
        data: props.data
      }]
    })
  }
)
</script>
<style scoped lang="scss">
.pieContainer {
  height: 80vw;
}
</style>
