<template>
 <div class='welcomePage'>
  <header>
    <IconSvgMangosteen/>
    <h1>蓝莓记账</h1>
  </header>
  <main>
    <section>
      <IconSvgPig/>
      <h2>会挣钱<br>还要会省钱</h2>
    </section>
  </main>
  <footer>
    <span class="fake">fake</span>
    <span>下一页</span>
    <span>跳过</span>
  </footer>
 </div>
</template>
<script lang='ts' setup name="welcome">
 import { ref, reactive} from 'vue'
//  import {Button} from 'antd-mobile'
 
</script>
<style scoped lang='scss'>
 .welcomePage{
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(to bottom, var(--welcome-bg-start) 0%, var(--welcome-bg-end) 100%);
  header{
    padding-top: 66px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #D4D4EE;
    svg{
      width: 64px;
      height: 69px;
    }
  }
  main{
    flex: 1;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    margin: 16px 16px 8px;
    border-radius: 8px;
    section{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      h2{
        text-align: center;
        margin-top: 40px;
      }
    }
    svg{
      width: 150px;
      height: 150px;
    }
  }
  footer{
    height: 65px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    padding: 0 16px;
    font-size: 24px;
    .fake{
      visibility: hidden;
    }
  }
 }
</style>
