<template>
  <div class='chartGroupWrap'>
    <van-dropdown-menu>
      <van-dropdown-item v-model="kind" :options="options" />
    </van-dropdown-menu>
    <LineChart />
    <PieChart />
    <RowBarChart/>
  </div>
</template>
<script lang="ts" setup name="ChartGroup">
import { ref, reactive, PropType, onMounted, watch } from 'vue'
import { http } from '@/shared/Http'

const kind = ref('expenses')
const options = [
  { text: '支出', value: 'expenses' },
  { text: '收入', value: 'income' }
]
const props = defineProps({
  timePeriod: {
    type: Object as PropType<ItemListDateParam>,
    default: {
      happened_after: '',
      happened_before: ''
    }
  }
})
type lineItem = { happen_at: string; amount: number }
type lineChartData = lineItem[]
type pieItem = { tag_id: number; amount: number; tag: Tag }
type pieChartData = pieItem[]

const fetchFn = async <K extends 'happen_at' | 'tag_id'>(groupBy: K) => {
  type rData<K> = K extends 'happen_at'
    ? { groups: lineChartData; total: number }
    : { groups: pieChartData; total: number }
  return await http.get<rData<K>>(
    '/items/summary',
    {
      ...props.timePeriod,
      group_by: groupBy,
      kind: kind.value
    },
    {
      _mock: 'itemSummary',
      _autoLoading: true
    }
  )
}
const lineChartList = ref<lineChartData>([])
const pieChartList = ref<pieChartData>([])
// 处理函数
const getLineChartData = async () => {
  const response = await fetchFn('happen_at')
  lineChartList.value = response.data.groups
}
const getPieChartData = async () => {
  const response = await fetchFn('tag_id')
  pieChartList.value = response.data.groups
}
const getChartData = () => {
  getLineChartData()
  getPieChartData()
}
onMounted(() => {
  getChartData()
})
watch(()=>kind.value,()=>getChartData())
watch(props.timePeriod,()=>getChartData())
</script>
<style scoped lang="scss">
.chartGroupWrap{
  height: 100%;
  overflow-y: auto;
}
:deep(.van-dropdown-menu__bar) {
  box-shadow: unset;
}
</style>
