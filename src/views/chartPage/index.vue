<template>
  <div class=''>
    <van-tabs v-model:active="active" class="fullHeight">
      <van-tab title="本月" name="curMonth">
      </van-tab>
      <van-tab title="上月" name="lastMonth">
      </van-tab>
      <!-- <van-tab title="今年" name="curYear">
      </van-tab> -->
      <van-tab title="自定义时间" name="custom">
      </van-tab>
    </van-tabs>
  </div>
 </template>
 <script lang='ts' setup name='ChartPage'>
  import { ref, reactive} from 'vue'
  const active = ref<string>('curMonth')
 </script>
 <style scoped lang='scss'>
  
 </style>
 