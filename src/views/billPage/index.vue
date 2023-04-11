<template>
  <div class="billPage">
    <van-tabs v-model:active="active" :before-change="beforeTabChange" class="fullHeight">
      <van-tab title="本月" name="curMonth">
        <BillList :list="curMonthStore.items" :balance="balance"/>
      </van-tab>
      <van-tab title="上月" name="lastMonth">
        <BillList :list="curMonthStore.items" />
      </van-tab>
      <van-tab title="今年" name="curYear">
        <BillList :list="curMonthStore.items" />
      </van-tab>
      <van-tab title="自定义时间" name="custom">
        <BillList :list="curMonthStore.items" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts" setup name="BillPage">
import BillList from './components/BillList.vue'
import { ref, reactive, onMounted } from 'vue'
import {http} from '@/shared/Http'
import { useItemStore } from '@/store/useItemStore'
import {useAfterMe} from '@/hooks/useAfterMe'
import dayjs from 'dayjs'
const active = ref<string>('0')
const balance = reactive({
  income: 0,
  expenses: 0,
  balance:0
})
const curMonthDate = {
  happened_after: dayjs().startOf('month').format('YYYY-MM-DD'),
  happened_before: dayjs().endOf('month').format('YYYY-MM-DD')
}
const lastMonthDate= {
  happened_after: dayjs().subtract(1,'month').startOf('month').format('YYYY-MM-DD'),
  happened_before: dayjs().subtract(1,'month').endOf('month').format('YYYY-MM-DD')
}
const fetchItemsBalance= async(dateObj: Record<string,string>)=>{
  const response = await http.get('/items/balance',
    dateObj,
    {_mock: 'itemIndexBalance'})
  Object.assign(balance,response.data)
  return response
}
useAfterMe(()=>fetchItemsBalance(curMonthDate))
const curMonthStore = useItemStore(['curMonth',curMonthDate.happened_after, curMonthDate.happened_before])
useAfterMe(()=> curMonthStore.fetchFirstPage(curMonthDate.happened_after, curMonthDate.happened_before) )

const lastMonthStore = useItemStore('lastMonth')
const beforeTabChange = (name: string) => {
  if(name==='lastMonth'){
    const promise1 =lastMonthStore.fetchFirstPage(lastMonthDate.happened_after,lastMonthDate.happened_before)
    const promise2 = fetchItemsBalance(lastMonthDate)
    return Promise.all([promise1,promise2]).then(res=>{
      console.log(res,'🚢🚢🚢')
      return false
    }).catch(err=>{
      console.log(err,'🚢🚢🚢')
      const meg= err.reduce((acc,cur)=>acc+cur.message,'')
      return false
    })
  }
  return true
}
</script>

<style scoped lang="scss">
.billPage {
  height: 100%;
}
</style>
