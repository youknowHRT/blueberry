<template>
  <div class="billListWrap">
    <van-empty v-if="list.length === 0" description="暂无数据" />
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
                <span>{{item.tags.map(t=>t.name).join('&')}}</span>
                <span class="sub">{{convertDate(item.happen_at)}}</span>
              </div>
              <div class="amount">
                ¥<span>{{ item.amount }}</span>
              </div>
            </div>
          </li>
          <li class="bottomFuncRow">
            <span v-if="hasMore" v-scroll-load="getMoreData">显示更多</span>
            <span v-else>没有更多</span>
          </li>
        </ul>
      </main>
    </section>
  </div>
</template>
<script lang="ts" setup name="BillList">
import {PropType,computed} from 'vue'
import { UseItemStore } from '@/store/useItemStore'
import dayjs from 'dayjs';
import vScrollLoad from '@/directives/scrollLoad'
const props = defineProps({
  storeDate: {
    type: Object as PropType<UseItemStore>,
      required: true
  },
  balance: {
    type: Object,
    default: {}
  },
  dateParam: {
    type: Object as PropType<ItemListDateParam>,
    default: {}
  }
})
const list = computed(() => props.storeDate.items)
const hasMore = computed(() => props.storeDate.hasMore)
const convertDate = (date: string) => {
  return dayjs(date).format('YYYY-MM-DD');
}
const getMoreData = () => {
  console.log('getMoreData🍉')
  props.storeDate.fetchMore(props.dateParam.happened_after, props.dateParam.happened_before)
}
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
        padding-bottom: 16px;
        li{
          display: flex;
          padding: 12px 16px;
          column-gap: 6px;
          &+li{
            border-top: 1px solid var(--list-border-color);
          }
          .icon{
            border-radius: 50%;
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.6em;
            background-color: var(--tag-bg);
          }
          .detail{
            flex: 1;
            width: 100px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 4px;
            .message{
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              height: 100%;
              .sub{
                color:var(--list-sub-text-color)
              }
              span{
                font-size: 16px;
              }
            }
            .amount{
              color: var(--amount-text-color);
            }
          }
        }
      }
      .bottomFuncRow{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        color: var(--list-sub-text-color);
      }
    }
  }
  
}
</style>
