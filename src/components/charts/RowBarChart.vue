<template>
 <div class='rowBarChartWrap'>
    <ul>
      <li v-for="(row,rIndex) in props.data" :key="rIndex">
        <div class="tag">{{row.tag.sign}}</div>
        <section class="msgBar">
          <div class="topMsg">
            <span class="tagName">{{row.tag.name}}<span class="percent">{{row.percent}}%</span></span>
            <span>¥{{getMoney(row.amount)}}</span>
          </div>
          <div class="barWrap">
            <div class="barInner" :style="{width: `${row.percent}%`}"></div>
          </div>
        </section>
      </li>
    </ul>
 </div>
</template>
<script lang='ts' setup name='RowBarChart'>
import {PropType} from 'vue'
import { getMoney } from '@/utils/money'
const props = defineProps({
  data: {
    type: Array as PropType<{tag: Tag,amount: number,percent: number}[]>,
    default: () => []
  }
})
</script>
<style scoped lang='scss'>
.rowBarChartWrap{
  padding: 0 16px;
  // margin-top: 16px; 
  ul{
    li{
      margin-bottom: 16px;
      display: flex;
      column-gap: 10px;
      align-items: center;
      .tag{
        @include tag;
      }
      .msgBar{
        flex: 1;
        width: 100px;
        .topMsg{
          display: flex;
          justify-content: space-between;
          .tagName{
            .percent{
              font-size: 12px;
              margin-left: 4px;
            }
          }
        }
        .barWrap{
          height: 8px;
          border-radius: 4px;
          background: var(--bar-bg);
          position: relative;
          overflow: hidden;
          margin-top: 4px;
          .barInner{
            height: 100%;
            background-color: #53a867;
            // border-radius: 4px;
          }
        }
      }
    }
  }
}
</style>
