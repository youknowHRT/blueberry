<template>
  <div class="chartPage">
    <van-tabs v-model:active="active" class="fullHeight" :before-change="beforeTabChange">
      <van-tab title="本月" name="curMonth">
        <ChartGroup />
      </van-tab>
      <van-tab title="上月" name="lastMonth">
        <ChartGroup />
      </van-tab>
      <van-tab title="自定义时间" name="custom"> </van-tab>
    </van-tabs>
    <van-overlay :show="showPop" @click="showPop = false">
      <CustomTimeCard @cancel="handleCancel" @success="handleSuccess" />
    </van-overlay>
  </div>
</template>
<script lang="ts" setup name="ChartPage">
import { ref, reactive, onMounted } from 'vue'
import ChartGroup from '@/views/chartPage/components/ChartGroup.vue'
import dayjs from 'dayjs'

const active = ref<string>('curMonth')
const timeParams = reactive<ItemListDateParam>({
  happened_after: dayjs().startOf('month').format('YYYY-MM-DD'),
  happened_before: dayjs().endOf('month').format('YYYY-MM-DD')
})
const curMonthDate:ItemListDateParam = {
  happened_after: dayjs().startOf('month').format('YYYY-MM-DD'),
  happened_before: dayjs().endOf('month').format('YYYY-MM-DD')
}
const lastMonthDate:ItemListDateParam = {
  happened_after: dayjs().subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
  happened_before: dayjs().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
}

const showPop = ref(false)
const popResolve = ref<Function>()
const popReject = ref<Function>()
const handleSuccess = (dateObj:ItemListDateParam)=>{
  Object.assign(timeParams, dateObj)
  popResolve.value!(true)
  showPop.value = false
}
const handleCancel = ()=>{
  popResolve.value!(false)
  showPop.value = false
}
const beforeTabChange = (name: string) => {
  if(name === 'curMonth'){
    Object.assign(timeParams, curMonthDate)
    return true
  }else if(name === 'lastMonth'){
    Object.assign(timeParams, lastMonthDate)
    return true
  }else {
    return new Promise<boolean>((resolve,reject)=>{
      popResolve.value=resolve
      popReject.value=reject
      showPop.value = true
    })
  }
}

</script>
<style scoped lang="scss">
.chartPage {
  height: 100%;
}
</style>
