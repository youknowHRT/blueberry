<template>
  <div class="billListWrap">
    <van-empty v-if="props.list.length === 0" description="暂无数据" />
    <section v-else>
      <header>
        <div class="balanceBox">
          <div class="income">
            <span>收入</span>
            <span>{{props.balance.income}}</span>
          </div>
          <div class="expenses">
            <span>支出</span>
            <span>{{props.balance.expenses}}</span>
          </div>
          <div class="balance">
            <span>净收入</span>
            <span>{{props.balance.balance}}</span>
          </div>
        </div>
      </header>
      <main>
        <ul>
          <li v-for="item in list" :key="item.id">
            <div class="icon">
              {{item.tags[0].sign}}
            </div>
            <div class="detail">
              <div class="message">
                <span>标签描述</span>
                <span>日期</span>
              </div>
              <div class="amount">
                2008
              </div>
            </div>
          </li>
        </ul>
      </main>
    </section>
  </div>
</template>
<script lang="ts" setup name="BillList">
import {PropType} from 'vue'
const props = defineProps({
  list: {
    type: Array as PropType<Item[]>,
    default: []
  },
  balance: {
    type: Object,
    default: {}
  }
})
</script>
<style scoped lang="scss">
.billListWrap{
  height: 100%;
  section{
    display: flex;
    flex-direction: column;
    height: 100%;
    flex-grow: 0;
    header{
      margin: 16px;
      .balanceBox{
        display: flex;
        justify-content: space-around;
        background: #2C3333;
        border-radius: 8px;
        >div{
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 16px;
        }
        .income{
          color: #07c160;
        }
        .expenses{
          color: #ee0a24;
        }
        .balance{
          color: #fff;
        }
      }
    }
    main{
      flex: 1;
      height: 100px;
      ul{
        height: 100%;
        overflow-y: auto;
        padding: 0 16px 16px;
        li{
          display: flex;
          .icon{
            border-radius: 50%;
            border: 1px solid red;
            width: 48px;
            height: 48px;
          }
          .detail{
            flex: 1;
            width: 100px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: 1px solid blue;
            .message{
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              span{
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }
  
}
</style>
