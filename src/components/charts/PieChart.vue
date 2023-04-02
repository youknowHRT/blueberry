<template>
 <div class='pieContainer' ref="pieChart">
 </div>
</template>
<script lang='ts' setup name='PieChart'>
  import * as echarts from 'echarts';
  import { ref, reactive, onMounted, nextTick} from 'vue'
  const pieChart = ref<HTMLElement>()
  const initChart=()=>{
    var myChart = echarts.init(pieChart.value);
    myChart.setOption({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        // top: '5%',
        // left: 'center'
        top: 'bottom'
      },
      grid: [
        { left: 0, top: 0, right: 0, bottom: 0 }
      ],
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    })
  }
  onMounted(() => {
    if(!pieChart.value) return
    nextTick(() => {
      initChart()
    })
  })
</script>
<style scoped lang='scss'>
 .pieContainer{
  height: 100vw
 }
</style>
