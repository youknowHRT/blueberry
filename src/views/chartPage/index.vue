<template>
  <div class="chartPage">
    <van-tabs v-model:active="active" class="fullHeight" :before-change="beforeTabChange">
      <van-tab title="本月" name="curMonth">
        <ChartGroup :timePeriod="curMonthDate"/>
      </van-tab>
      <van-tab title="上月" name="lastMonth">
        <ChartGroup :timePeriod="lastMonthDate"/>
      </van-tab>
      <van-tab title="自定义时间" name="custom"> 
        <ChartGroup :timePeriod="customDate"/>
      </van-tab>
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

const curMonthDate= reactive<ItemListDateParam>( {
  happened_after: dayjs().startOf('month').format('YYYY-MM-DD'),
  happened_before: dayjs().endOf('month').format('YYYY-MM-DD')
})
const lastMonthDate= reactive<ItemListDateParam>( {
  happened_after: dayjs().subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
  happened_before: dayjs().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
})
const customDate= reactive<ItemListDateParam>( {
  happened_after: dayjs().format('YYYY-MM-DD'),
  happened_before: dayjs().format('YYYY-MM-DD')
})

const showPop = ref(false)
const popResolve = ref<Function>()
const popReject = ref<Function>()
const handleSuccess = (dateObj:ItemListDateParam)=>{
  showPop.value = false
  Object.assign(customDate, dateObj)
  popResolve.value!(true)
}
const handleCancel = ()=>{
  popReject.value!(false)
  showPop.value = false
}
const beforeTabChange = (name: string) => {
  if(name === 'curMonth'){
    const happened_after =  dayjs().startOf('month').format('YYYY-MM-DD')
    const happened_before = dayjs().endOf('month').format('YYYY-MM-DD')
    Object.assign(curMonthDate, {happened_after,happened_before})
    return true
  }else if(name === 'lastMonth'){
    const happened_after = dayjs().subtract(1, 'month').startOf('month').format('YYYY-MM-DD')
    const happened_before = dayjs().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
    Object.assign(lastMonthDate, {happened_after,happened_before})
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
