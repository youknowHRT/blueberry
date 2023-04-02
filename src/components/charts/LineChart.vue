<template>
 <div class='main' ref="lineChart" style="height: 128px">
 </div>
</template>
<script lang='ts' setup name='LineChart'>
  import * as echarts from 'echarts';
  import { ref, reactive, onMounted, nextTick} from 'vue'
  const lineChart = ref<HTMLElement>()
  const initChart=()=>{
    var myChart = echarts.init(lineChart.value);
    myChart.setOption({
      grid: [{ left: 16, top: 20, right: 16, bottom: 20 }],
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        // boundaryGap: ['3%', '0%'],
        // axisTick: {
        //   alignWithLabel: true,
        // },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          show: false,
        },
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    })
  }
  onMounted(() => {
    if(!lineChart.value) return
    nextTick(() => {
      initChart()
    })
  })
</script>
<style scoped lang='scss'>
 
</style>
