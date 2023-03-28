<template>
 <div class='mainLayout'>
  <header>
    <IconLayoutMenu/> 蓝莓记账
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <van-tabbar v-model="active">
      <van-tabbar-item name="bill">
        <span>账单</span>
        <template #icon="props">
          <IconLayoutBill/>
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="edit">
        <span>账单</span>
        <template #icon="props">
          <IconLayoutEdit/>
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="chart">
        <span>账单</span>
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
    header{
      height: 88px;
      padding: 40px 16px 12px;
      svg{
        margin-bottom: -0.2em;
      }
    }
    main{
      height: 100px;
      flex: 1;
    }
  }
</style>

