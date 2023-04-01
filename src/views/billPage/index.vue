<template>
 <div class='billPage'>
  <van-tabs v-model:active="active" class="fullHeight">
    <van-tab title="本月" name="curMonth">
      <BillList :list="list"/>
    </van-tab>
    <van-tab title="上月" name="lastMonth">
      <BillList :list="list"/>
    </van-tab>
    <van-tab title="今年" name="curYear">
      <BillList :list="list"/>
    </van-tab>
    <van-tab title="自定义时间" name="custom">
      <BillList :list="list"/>
    </van-tab>
  </van-tabs>
 </div>
</template>

<script lang='ts' setup name='BillPage'>
  import BillList from './components/BillList.vue'
  import { ref, reactive} from 'vue'
  const active = ref<string>(0)
  const list = reactive([])
</script>

<style scoped lang='scss'>
 .billPage{
  height: 100%;
 }
</style>
