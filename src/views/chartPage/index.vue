<template>
  <div class='chartPage'>
    <van-tabs v-model:active="active" class="fullHeight">
      <van-tab title="本月" name="curMonth">
        本月
        <LineChart/>
        <PieChart/>
      </van-tab>
      <van-tab title="上月" name="lastMonth">
        上月
        <LineChart/>
      </van-tab>
      <!-- <van-tab title="今年" name="curYear">
      </van-tab> -->
      <van-tab title="自定义时间" name="custom">
      </van-tab>
    </van-tabs>
  </div>
 </template>
 <script lang='ts' setup name='ChartPage'>
  import { ref, reactive, onMounted} from 'vue'
  const active = ref<string>('curMonth')
  const showChart = ref<boolean>(false)
  onMounted(() => {
    console.log('mounted')
    showChart.value=true
  })
 </script>
 <style scoped lang='scss'>
  .chartPage{
    height: 100%;
  }
 </style>
 