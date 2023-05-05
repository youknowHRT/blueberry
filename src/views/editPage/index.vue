<template>
  <div class="editPage">
    <section class="tagsBox">
      <van-tabs v-model:active="active" class="fullHeight">
        <van-tab title="支出" name="expenses">
          <Tags kind="expenses" />
        </van-tab>
        <van-tab title="收入" name="income"> 
          <Tags kind="income" />
        </van-tab>
      </van-tabs>
    </section>
    <NumberPad />
  </div>
</template>
<script lang="ts" setup name="EditPage">
import { ref } from 'vue'
import NumberPad from '@/components/inputPad/NumberPad.vue'
import Tags from '@/views/editPage/components/Tags.vue'
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
