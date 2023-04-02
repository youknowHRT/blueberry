<template>
 <div class='login'>
  <MainLayout :showTabbar="false">
    <template #header>
      <div class="loginTitle">
        <IconLayoutLeft/>
        <h3>登录</h3>
      </div>
    </template>
    <section>
      <van-field
        v-model="formData.username"
        label="邮箱"
        placeholder="请输入邮箱地址"
        clearable
        required
      />
      <van-field
        v-model="formData.password"
        label="密码"
        placeholder="请输入密码"
        clearable
        required
        type="password"
      />
      <van-button type="primary" block @click="handleLogin">登录</van-button>
    </section>
  </MainLayout>
 </div>
</template>
<script lang='ts' setup name='Login'>
  import { ref, reactive} from 'vue'
  import MainLayout from '@/layouts/MainLayout.vue'
  const formData = reactive({
    username: '',
    password: ''
  })
  const handleLogin=()=>{
    console.log('login')
  }
</script>
<style scoped lang='scss'>
 .login{
  .loginTitle{
    color: #fff;
    display: flex;
    column-gap: 12px;
    align-items: center;
    font-size: 24px;
  }
 }
</style>
