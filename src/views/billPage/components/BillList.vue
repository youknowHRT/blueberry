<template>
  <div class="billList">
    <van-empty v-if="props.list.length === 0" description="暂无数据" />
  </div>
</template>
<script lang="ts" setup name="BillList">
import { ref, reactive } from 'vue'
const props = defineProps<{
  list: Array
}>()
</script>
<style scoped lang="scss"></style>
