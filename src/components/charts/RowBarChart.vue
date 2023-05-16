<template>
 <div class='rowBarChartWrap'>
    <ul>
      <li v-for="row in 5">
        <div class="tag">🦾</div>
        <section class="msgBar">
          <div class="topMsg">
            <span>ace</span>
            <span>¥12345.00</span>
          </div>
          <div class="barWrap">
            <div class="barInner" :style="{width: `${50}%`}"></div>
          </div>
        </section>
      </li>
    </ul>
 </div>
</template>
<script lang='ts' setup name='RowBarChart'>
import { ref, reactive} from 'vue'

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
        }
        .barWrap{
          height: 8px;
          // border-radius: 4px;
          // background: var(--bar-bg);
          position: relative;
          overflow: hidden;
          margin-top: 4px;
          .barInner{
            height: 100%;
            background-color: #53a867;
            border-radius: 4px;
          }
        }
      }
    }
  }
}
</style>
