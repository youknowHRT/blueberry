<template>
 <div class='mainLayout'>
  <header>
    <div class="titleRow">
      <IconLayoutMenu/><h3>蓝莓记账</h3>
    </div>
  </header>
  <main>
    <router-view></router-view>
  </main>
  <footer>
    <van-tabbar v-model="active" route>
      <van-tabbar-item name="bill" to="/billPage">
        <span>账单</span>
        <template #icon="props">
          <IconLayoutBill/>
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="edit" to="/editPage">
        <span>记账</span>
        <template #icon="props">
          <IconLayoutEdit/>
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="chart" to="/chartPage">
        <span>图表</span>
        <template #icon="props">
          <IconLayoutChart/>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </footer>
 </div>
</template>
<script lang='ts' setup name='MainLayout'>
 import { ref, reactive} from 'vue'
 const active = ref<string>('bill')
</script>
<style scoped lang='scss'>
  .mainLayout{
    display: flex;
    flex-direction: column;
    height: 100%;
    header{
      height: 88px;
      padding: 40px 16px 12px;
      background-image: linear-gradient(to bottom, var(--welcome-bg-start) 0%, var(--welcome-bg-end) 100%);
      .titleRow{
        display: flex;
        align-items: center;
        font-size: 20px;
        column-gap: 8px;
        color: #fff;
      }
    }
    main{
      height: 100px;
      flex: 1;
    }
    footer{
      height: 50px;
    }
  }
</style>

