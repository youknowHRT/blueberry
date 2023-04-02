<template>
 <div class='mainLayout'>
  <header>
    <slot name="header">
      <div class="titleRow">
        <h3>蓝莓记账</h3>
      </div>
    </slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer v-if="props.showTabbar">
    <van-tabbar v-model="active" route>
      <van-tabbar-item name="bill" to="/home/billPage">
        <span>账单</span>
        <template #icon="props">
          <IconLayoutBill/>
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="edit" to="/home/editPage">
        <span>记账</span>
        <template #icon="props">
          <IconLayoutEdit/>
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="chart" to="/home/chartPage">
        <span>图表</span>
        <template #icon="props">
          <IconLayoutChart/>
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="user" to="/home/userPage">
        <span>用户</span>
        <template #icon="props">
          <IconLayoutUser/>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </footer>
  <!-- <van-overlay :show="showSidebar" @click="showSidebar = false">
    <div class="sidebar" @click.stop>
      wo-shi-sidebar
    </div>
  </van-overlay> -->
 </div>
</template>

<script lang='ts' setup name='MainLayout'>
  import { ref, reactive} from 'vue'
  const active = ref<string>('bill')
  const props = defineProps({
    showTabbar: {
      type: Boolean,
      default: true
    }
  })
  // const showSidebar = ref<boolean>(false)
  // const handleMenu=()=>{
  //   console.log('menu')
  //   showSidebar.value = true
  // }
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
        h3{
          width: 100%;
          text-align: center;
        }
      }
    }
    main{
      height: 100px;
      flex: 1;
    }
    footer{
      height: 50px;
    }
    .sidebar{
      width: 80vw;
      height: 100vh;
      background: #fff
    }
  }
</style>

