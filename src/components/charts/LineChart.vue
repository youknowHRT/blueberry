<template>
 <div class='main' ref="lineChart" style="height: 228px;width:100vw">
 </div>
</template>
<script lang='ts' setup name=''>
  import * as echarts from 'echarts';
  import { ref, reactive, onMounted, nextTick} from 'vue'
  const lineChart = ref<HTMLElement>()
  const initChart=()=>{
    var myChart = echarts.init(lineChart.value);
    myChart.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
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
