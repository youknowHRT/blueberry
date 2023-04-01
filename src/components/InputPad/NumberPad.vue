<template>
 <div class='numberPad'>
    <div class='msgRow'>
      <span class="dateBox">
        <IconSvgCalendar/>
        <span>
          <span @click="showCalendar = true">{{padForm.date}}</span>
          <van-popup v-model:show="showCalendar" position="bottom" >
            <van-date-picker
              v-model="refDate"
              title="选择日期"
              @confirm="handleDateConfirm"
              @cancel="showCalendar = false"
              @change="handleDateChange"
            />
          </van-popup>
        </span>
      </span>
      <span class="amountBox">金额</span>
    </div>
    <div class="numPad">
      <button class="btn" v-for="btn in buttons" :key="btn.text" @click="btn.onClick">
        {{btn.text}}
      </button>
    </div>
 </div>
</template>
<script lang='ts' setup name='NumberPad'>
   import { ref, reactive, onMounted} from 'vue'
   import * as dayjs from 'dayjs'
   const padForm = reactive({
     amount: '',
     date: '',
   })
   const showCalendar = ref<boolean>(false)
   onMounted(()=>{
     padForm.date = dayjs().format('YYYY-MM-DD')
     refDate.value = padForm.date.split('-')
   })
   const refDate = ref<string[]>([]);
   const handleDateChange=(value:string)=>{
     padForm.date = value.selectedValues.join('-')
   }
    const handleDateConfirm=()=>{
      showCalendar.value = false
      padForm.date = refDate.value.join('-')
    }

    const refAmount = ref<string>('')
   const handleBtnNum=(value:string)=>{
     console.log(value)
   }
   const buttons= [
      {text: '1', onClick:()=>{handleBtnNum('1')}},
      {text: '2', onClick:()=>{handleBtnNum('2')}},
      {text: '3', onClick:()=>{handleBtnNum('3')}},
      {text: '4', onClick:()=>{handleBtnNum('4')}},
      {text: '5', onClick:()=>{handleBtnNum('5')}},
      {text: '6', onClick:()=>{handleBtnNum('6')}},
      {text: '7', onClick:()=>{handleBtnNum('7')}},
      {text: '8', onClick:()=>{handleBtnNum('8')}},
      {text: '9', onClick:()=>{handleBtnNum('9')}},
      {text: '0', onClick:()=>{handleBtnNum('0')}},
      {text: '.', onClick:()=>{handleBtnNum('.')}},
      {text: '删除', onClick:()=>{handleBtnNum('.')}},
      {text: '提交', onClick:()=>{handleBtnNum('.')}},
      {text: 'AC', onClick:()=>{refAmount.value=''}},
   ]
</script>
<style scoped lang='scss'>
.numberPad{
  .msgRow{
    display: flex;
    align-items: center;
    padding: 8px 16px;
    border: 1px solid red;
    .dateBox{
      display: inline-flex;
      align-items: center;
      svg{
        height: 28px;
        width: 28px;
        color: var(--numPad-important-button-bg);
        margin-right: 4px;
      }
    }
    .amountBox{
      flex:1;
      width: 100px;
      color: var(--amount-text-color);
      font-size: 20px;
      text-align: right;
    }
  }
  .numPad{
    display: grid;
    grid-template-areas:'n1 n2 n3 d'
                        'n4 n5 n6 d'
                        'n7 n8 n9 s'
                        'ac n0 nd s';
    grid-auto-rows: 48px;
    grid-auto-columns: 1fr;
    background-color: var(--numPad-bg);
    gap: 4px;
    >button{
      border: none;
      background-color: var(--numPad-common-button-bg);
      border-radius: 4px;
      &:nth-child(1){
        grid-area: n1;
      }
      &:nth-child(2){
        grid-area: n2;
      }
      &:nth-child(3){
        grid-area: n3;
      }
      &:nth-child(4){
        grid-area: n4;
      }
      &:nth-child(5){
        grid-area: n5;
      }
      &:nth-child(6){
        grid-area: n6;
      }
      &:nth-child(7){
        grid-area: n7;
      }
      &:nth-child(8){
        grid-area: n8;
      }
      &:nth-child(9){
        grid-area: n9;
      }
      &:nth-child(10){
        grid-area: n0;
      }
      &:nth-child(11){
        grid-area: nd;
      }
      &:nth-child(12){
        grid-area: d;
      }
      &:nth-child(13){
        grid-area: s;
        background-color: var(--numPad-important-button-bg);
        color: var(--numPad-important-button-color);
      }
      &:nth-child(14){
        grid-area: ac;
      }
    }
  }
}
</style>
