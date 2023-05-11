<template>
  <!-- <div class=''> -->
  <van-dropdown-menu>
    <van-dropdown-item v-model="kind" :options="options" />
  </van-dropdown-menu>
  <LineChart />
  <PieChart />
  <!-- </div> -->
</template>
<script lang="ts" setup name="ChartGroup">
import { ref, reactive,PropType,onMounted } from 'vue'
import { http } from '@/shared/Http'

const kind = ref('expenses')
const options = [
  { text: '支出', value: 'expenses' },
  { text: '收入', value: 'income' }
]
const props= defineProps({
  timePeriod:{
    type: Object as PropType<ItemListDateParam>,
    default:{
      happened_after: '',
      happened_before: ''
    }
  }
})
type lineItem = { happen_at: string; amount: number }
type lineChartData = lineItem[]
type pieItem = { tag_id: number; amount: number; tag: Tag }
type pieChartData = pieItem[]

const curMonthData= ref<lineChartData>([])

const getLineChartData = async () => {
  const response = await http.get<{ groups: lineChartData; total: number }>(
    '/items/summary',
    {
      ...props.timePeriod,
      group_by: 'happen_at',
      kind: kind.value
    },
    {
      _mock: 'itemSummary',
      _autoLoading: true
    }
  )
}
</script>
<style scoped lang="scss">

:deep(.van-dropdown-menu__bar){
  box-shadow: unset;
}
</style>
