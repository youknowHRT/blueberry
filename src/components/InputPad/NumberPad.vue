<template>
  <div class="numberPad">
    <div class="msgRow">
      <span class="dateBox">
        <IconSvgCalendar />
        <span>
          <span @click="showCalendar = true">{{ padForm.date }}</span>
          <van-popup v-model:show="showCalendar" position="bottom">
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
      <span class="amountBox">{{ refAmount }}</span>
    </div>
    <div class="numPad">
      <span class="btn" v-for="btn in buttons" :key="btn.text" @click="btn.onClick">
        <van-button block :type="btn.type">
          {{ btn.text }}
        </van-button>
      </span>
    </div>
  </div>
</template>
<script lang="ts" setup name="NumberPad">
import { ref, reactive, onMounted } from 'vue'
import dayjs from 'dayjs'
import { showDialog } from 'vant'

const padForm = reactive({
  amount: '',
  date: ''
})
const refDate = ref<string[]>([])
onMounted(() => {
  padForm.date = dayjs().format('YYYY-MM-DD')
  refDate.value = padForm.date.split('-')
})
const handleDateChange = (value: Record<string, any>) => {
  console.log(value, '🍎')
  padForm.date = value.selectedValues.join('-')
}
const showCalendar = ref<boolean>(false)
const handleDateConfirm = () => {
  showCalendar.value = false
  padForm.date = refDate.value.join('-')
}

const refAmount = ref<string>('0')
const handleBtnNum = (value: string) => {
  const aLen = refAmount.value.length
  if (aLen >= 10) return
  const dotIndex = refAmount.value.indexOf('.')
  if (dotIndex >= 0 && aLen - dotIndex > 2) return
  if (value === '.' && dotIndex >= 0) return
  if (value === '0' && refAmount.value === '0') return
  if (value !== '0' && value !== '.' && refAmount.value === '0') refAmount.value = ''
  refAmount.value += value
}
const handleBtnDel = () => {
  const aLen = refAmount.value.length
  if (aLen === 1) {
    refAmount.value = '0'
  } else {
    refAmount.value = refAmount.value.slice(0, aLen - 1)
  }
}
const handleSubmit = () => {
  console.log('submit')
  const amount = refAmount.value.split('').filter((item: string) => item !== '.')
  const isZero = amount.every((item: string) => item === '0')
  if (isZero) {
    showDialog({
      title: '出错',
      message: '金额不能为零',
      width: '80%',
      confirmButtonColor: '#ee0a24'
    })
    return
  }
}
const buttons: PadBtn[]= [
  {text: '1', onClick:()=>{handleBtnNum('1')}, type: 'default'},
  {text: '2', onClick:()=>{handleBtnNum('2')}, type: 'default'},
  {text: '3', onClick:()=>{handleBtnNum('3')}, type: 'default'},
  {text: '4', onClick:()=>{handleBtnNum('4')}, type: 'default'},
  {text: '5', onClick:()=>{handleBtnNum('5')}, type: 'default'},
  {text: '6', onClick:()=>{handleBtnNum('6')}, type: 'default'},
  {text: '7', onClick:()=>{handleBtnNum('7')}, type: 'default'},
  {text: '8', onClick:()=>{handleBtnNum('8')}, type: 'default'},
  {text: '9', onClick:()=>{handleBtnNum('9')}, type: 'default'},
  {text: '0', onClick:()=>{handleBtnNum('0')}, type: 'default'},
  {text: '.', onClick:()=>{handleBtnNum('.')}, type: 'default'},
  {text: '删除', onClick:()=>{handleBtnDel()}, type: 'default'},
  {text: '提交', onClick:()=>{handleSubmit()}, type: 'primary'},
  {text: 'AC', onClick:()=>{refAmount.value='0'}, type: 'default'},
]
</script>
<style scoped lang="scss">
.numberPad {
  padding-top: 2px;
  background-color: var(--numPad-bg);
  .msgRow {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    background-color: var(--numPad-msgRow-bg);
    // border: 1px solid red;
    .dateBox {
      display: inline-flex;
      align-items: center;
      svg {
        height: 28px;
        width: 28px;
        color: var(--amount-text-color);
        margin-right: 4px;
      }
    }
    .amountBox {
      flex: 1;
      width: 100px;
      color: var(--amount-text-color);
      font-size: 20px;
      text-align: right;
    }
  }
  .numPad {
    display: grid;
    grid-template-areas:
      'n1 n2 n3 d'
      'n4 n5 n6 d'
      'n7 n8 n9 s'
      'ac n0 nd s';
    grid-auto-rows: 48px;
    grid-auto-columns: 1fr;
    padding: 2px;
    gap: 4px;
    > .btn {
      border: none;
      border-radius: 4px;
      &:nth-child(1) {
        grid-area: n1;
      }
      &:nth-child(2) {
        grid-area: n2;
      }
      &:nth-child(3) {
        grid-area: n3;
      }
      &:nth-child(4) {
        grid-area: n4;
      }
      &:nth-child(5) {
        grid-area: n5;
      }
      &:nth-child(6) {
        grid-area: n6;
      }
      &:nth-child(7) {
        grid-area: n7;
      }
      &:nth-child(8) {
        grid-area: n8;
      }
      &:nth-child(9) {
        grid-area: n9;
      }
      &:nth-child(10) {
        grid-area: n0;
      }
      &:nth-child(11) {
        grid-area: nd;
      }
      &:nth-child(12) {
        grid-area: d;
      }
      &:nth-child(13) {
        grid-area: s;
      }
      &:nth-child(14) {
        grid-area: ac;
      }
      .van-button--block {
        height: 100%;
        border: none;
      }
    }
  }
}
</style>
