<template>
  <div class="editPage">
    <section class="tagsBox">
      <van-tabs v-model:active="active" class="fullHeight">
        <van-tab title="支出" name="expenses">
          <Tags kind="expenses" v-model="expensesTagId"/>
        </van-tab>
        <van-tab title="收入" name="income"> 
          <Tags kind="income" v-model="incomeTagId"/>
        </van-tab>
      </van-tabs>
    </section>
    <NumberPad @submit="handleSubmit"/>
  </div>
</template>
<script lang="ts" setup name="EditPage">
import { ref, computed } from 'vue'
import NumberPad from '@/components/inputPad/NumberPad.vue'
import Tags from '@/views/editPage/components/Tags.vue'
import { showDialog, showSuccessToast, showFailToast } from 'vant'
import { http } from '@/shared/Http'
import { useRouter } from 'vue-router'

const active = ref<'expenses'|'income'>('expenses')
const expensesTagId = ref()
const incomeTagId = ref()
const router = useRouter()
const signValue = computed(()=>{
  return active.value === 'expenses' ? expensesTagId.value : incomeTagId.value
})
const handleSubmit = (value: Partial<Item>) => {
  if(signValue.value === undefined){
    showDialog({ title: '错误', message: '请选择标签', width: '320px' })
    return
  }
  http.post('/items', { ...value, tag_ids: [signValue.value], kind: active.value }, { _autoLoading: true }).then(res=>{
    console.log(res,'item')
    showSuccessToast({message:'添加成功',iconSize:'28px'})
    setTimeout(() => {
      router.push('/home/billPage')
    }, 500);
  }).catch(err=>{
    showFailToast({message:'保存失败',iconSize:'28px'})
  })
}
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
