<template>
  <div class="billPage">
    <van-tabs v-model:active="active" class="fullHeight">
      <van-tab title="本月" name="curMonth">
        <BillList :list="list" />
      </van-tab>
      <van-tab title="上月" name="lastMonth">
        <BillList :list="list" />
      </van-tab>
      <van-tab title="今年" name="curYear">
        <BillList :list="list" />
      </van-tab>
      <van-tab title="自定义时间" name="custom">
        <BillList :list="list" />
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
const active = ref<string>('0')
const list = reactive([])
const balance = reactive({
  income: 0,
  expenses: 0,
  balance:0
})
const fetchItemsBalance=async()=>{
  const response = await http.get('/items/balance', {}, {_mock: 'itemIndexBalance'})
  Object.assign(balance,response.data)
}
useAfterMe(fetchItemsBalance)
const itemStore = useItemStore(['curMonth','2023-4-1','2023-4-30'])
useAfterMe(()=> itemStore.fetchFirstPage('2023-4-1','2023-4-30') )
</script>

<style scoped lang="scss">
.billPage {
  height: 100%;
}
</style>
