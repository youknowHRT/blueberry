<template>
  <div class="billPage">
    <van-tabs v-model:active="active" :before-change="beforeTabChange" ref="refTab" class="fullHeight">
      <van-tab title="本月" name="curMonth">
        <BillList :list="curMonthStore.items" :balance="balance" />
      </van-tab>
      <van-tab title="上月" name="lastMonth">
        <BillList :list="lastMonthStore.items" :balance="balance" />
      </van-tab>
      <van-tab title="今年" name="curYear">
        <BillList :list="curYearStore.items" :balance="balance" />
      </van-tab>
      <van-tab title="自定义时间" name="custom">
        <BillList :list="curMonthStore.items" :balance="balance" />
      </van-tab>
    </van-tabs>
  </div>
  <van-overlay :show="showPop" @click="showPop = false">
    <CustomTimeCard @cancel="showPop = false" @success="moveToCustom" />
  </van-overlay>
</template>

<script lang="ts" setup name="BillPage">
import BillList from './components/BillList.vue'
import { ref, reactive, onMounted } from 'vue'
import { http } from '@/shared/Http'
import { useItemStore, UseItemStore } from '@/store/useItemStore'
import { useAfterMe } from '@/hooks/useAfterMe'
import dayjs from 'dayjs'
import { showDialog, TabsInstance } from 'vant'
import CustomTimeCard from '@/components/overlayCards/CustomTimeCard.vue'
const active = ref<string>('0')
const balance = reactive({
  income: 0,
  expenses: 0,
  balance: 0
})
const showPop = ref<boolean>(false)
type DataObj = {
  happened_after: string
  happened_before: string
}
const curMonthDate:DataObj = {
  happened_after: dayjs().startOf('month').format('YYYY-MM-DD'),
  happened_before: dayjs().endOf('month').format('YYYY-MM-DD')
}
const lastMonthDate:DataObj = {
  happened_after: dayjs().subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
  happened_before: dayjs().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
}
const curYearDate:DataObj = {
  happened_after: dayjs().startOf('year').format('YYYY-MM-DD'),
  happened_before: dayjs().endOf('year').format('YYYY-MM-DD')
}
const customDate:DataObj = {
  happened_after: '',
  happened_before: ''
}
const fetchItemsBalance = async (dateObj: Record<string, string>) => {
  const response = await http.get('/items/balance', dateObj, { _mock: 'itemIndexBalance' })
  Object.assign(balance, response.data)
  return response
}
useAfterMe(() => fetchItemsBalance(curMonthDate))
let curMonthStore = useItemStore(['curMonth', curMonthDate.happened_after, curMonthDate.happened_before])
useAfterMe(() => curMonthStore.fetchFirstPage(curMonthDate.happened_after, curMonthDate.happened_before))

let lastMonthStore = useItemStore(['lastMonth', lastMonthDate.happened_after, lastMonthDate.happened_before])
let curYearStore = useItemStore(['curYear', curYearDate.happened_after, curYearDate.happened_before])
let customStore: UseItemStore|undefined
type tabName = 'curMonth' | 'lastMonth' | 'curYear' | 'custom'
const checkDateChange = (tab: tabName) => {
  if (tab === 'curMonth') {
    const monthFirstDay = dayjs().startOf('month').format('YYYY-MM-DD')
    if (curMonthDate.happened_after !== monthFirstDay) {
      curMonthDate.happened_after = monthFirstDay
      curMonthDate.happened_before = dayjs().endOf('month').format('YYYY-MM-DD')
      curMonthStore = useItemStore(['curMonth', curMonthDate.happened_after, curMonthDate.happened_before])
    }
  } else if (tab === 'lastMonth') {
    const monthFirstDay = dayjs().subtract(1, 'month').startOf('month').format('YYYY-MM-DD')
    if (lastMonthDate.happened_after !== monthFirstDay) {
      lastMonthDate.happened_after = monthFirstDay
      lastMonthDate.happened_before = dayjs().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
      lastMonthStore = useItemStore(['lastMonth', lastMonthDate.happened_after, lastMonthDate.happened_before])
    }
  } else if (tab === 'curYear') {
    const yearFirstDay = dayjs().startOf('year').format('YYYY-MM-DD')
    if (curYearDate.happened_after !== yearFirstDay) {
      curYearDate.happened_after = yearFirstDay
      curYearDate.happened_before = dayjs().endOf('year').format('YYYY-MM-DD')
      curYearStore = useItemStore(['curYear', curYearDate.happened_after, curYearDate.happened_before])
    }
  } else if (tab === 'custom') {
    if(customStore !== undefined)customStore.$reset()
    customStore = useItemStore(['custom', customDate.happened_after, customDate.happened_before])
  }
}
const customTrigger = ref(false) //用于处理 自定义时间tab的点击事件的状态
const beforeTabChange = (name: string) => {
  if (name === 'curMonth') {
    checkDateChange('curMonth')
    const promiseArray = []
    if(curMonthStore.items.length === 0) {
      const promise1 = curMonthStore.fetchFirstPage(curMonthDate.happened_after, curMonthDate.happened_before)
      promiseArray.push(promise1)
    }
    const promise2 = fetchItemsBalance(curMonthDate)
    promiseArray.push(promise2)
    return Promise.all(promiseArray)
      .then((res) => {
        return true
      })
      .catch((err) => {
        showDialog({
          title: '出错',
          message: '本月详情数据请求出错',
          width: '80%',
          confirmButtonColor: '#ee0a24'
        })
        return false
      })
  } else if (name === 'lastMonth') {
    checkDateChange('lastMonth')
    const promiseArray = []
    if(lastMonthStore.items.length === 0) {
      const promise1 = lastMonthStore.fetchFirstPage(lastMonthDate.happened_after, lastMonthDate.happened_before)
      promiseArray.push(promise1)
    }
    const promise2 = fetchItemsBalance(lastMonthDate)
    promiseArray.push(promise2)
    return Promise.all(promiseArray)
      .then((res) => {
        return true
      })
      .catch((err) => {
        showDialog({
          title: '出错',
          message: '上月详情数据请求出错',
          width: '80%',
          confirmButtonColor: '#ee0a24'
        })
        return false
      })
  } else if (name === 'curYear') {
    checkDateChange('curYear')
    const promiseArray = []
    if(curYearStore.items.length === 0) {
      const promise1 = curYearStore.fetchFirstPage(curYearDate.happened_after, curYearDate.happened_before)
      promiseArray.push(promise1)
    }
    const promise2 = fetchItemsBalance(curYearDate)
    promiseArray.push(promise2)
    return Promise.all(promiseArray)
      .then((res) => {
        return true
      })
      .catch((err) => {
        showDialog({
          title: '出错',
          message: '今年详情数据请求出错',
          width: '80%',
          confirmButtonColor: '#ee0a24'
        })
        return false
      })
  } else if (name === 'custom') {
    if (customTrigger.value) {
      customTrigger.value = false

      const promiseArray = []
      if( customStore!.items.length === 0) {
        const promise1 = customStore!.fetchFirstPage(customDate.happened_after, customDate.happened_before)
        promiseArray.push(promise1)
      }
      const promise2 = fetchItemsBalance(customDate)
      promiseArray.push(promise2)
      return Promise.all(promiseArray)
        .then(() => {
          active.value = 'custom'
          return true
        })
        .catch(() => {
          showDialog({
            title: '出错',
            message: '自定义详情数据请求出错',
            width: '80%',
            confirmButtonColor: '#ee0a24'
          })
          return false
        })
    } else {
      showPop.value = true
      return false
    }
  }
  return true
}
const refTab = ref<TabsInstance>()
const moveToCustom = (val: DataObj) => {
  showPop.value = false
  customTrigger.value = true
  const customDateChanged = Object.keys(val).some((key) => {
    return customDate[key as keyof DataObj] !== val[key as keyof DataObj] ||
    customDate[key as keyof DataObj] !== ''
  })
  if (customDateChanged) {
    Object.assign(customDate, val)
    checkDateChange('custom')
  }
  
  refTab.value!.beforeChange!('custom')
}
</script>

<style scoped lang="scss">
.billPage {
  height: 100%;
}
</style>
