<template>
  <div class="editPage">
    <section class="tagsBox">
      <van-tabs v-model:active="active" class="fullHeight">
        <van-tab title="支出" name="expense"> 支出 </van-tab>
        <van-tab title="收入" name="income"> 收入 </van-tab>
      </van-tabs>
    </section>
    <NumberPad />
  </div>
</template>
<script lang="ts" setup name="EditPage">
import { ref, reactive } from 'vue'
import NumberPad from '@/components/inputPad/NumberPad.vue'
const active = ref<string>('expense')
</script>
<style scoped lang="scss">
.editPage {
  height: 100%;
  display: flex;
  flex-direction: column;
  .tagsBox {
    flex: 1;
    height: 100px;
  }
}
</style>
