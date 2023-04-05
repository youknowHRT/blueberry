<template>
  <div class="login">
    <MainLayout :showTabbar="false">
      <template #header>
        <div class="loginTitle">
          <IconLayoutLeft />
          <h3>登录</h3>
        </div>
      </template>
      <section class="logoSec">
        <IconSvgMangosteen />
        <h3>蓝莓记账</h3>
      </section>
      <section class="loginForm">
        <van-form @submit="onSubmit" @failed="onFailed" ref="refForm">
          <van-field
            v-model="formData.email"
            name="email"
            label="邮箱地址"
            placeholder="邮箱地址"
            :rules="[{ required: true, message: '请填写邮箱地址' }, { pattern: /.+@.+/, message: '请填写正确的邮箱地址' }]"
          />
          <van-field
            v-model="formData.password"
            name="password"
            label="验证码"
            placeholder="请填写验证码"
            :rules="[{ required: true, message: '请填写验证码' }]"
          >
            <template #button>
              <van-button size="small" color="#5c33be" @click="getValidateCode">发送验证码</van-button>
            </template>
          </van-field>
          <div class="submitBtnRow">
            <van-button block native-type="submit" color="#5c33be"> 提交 </van-button>
          </div>
        </van-form>
      </section>
    </MainLayout>
  </div>
</template>
<script lang="ts" setup name="Login">
import { ref, reactive } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'
import { http } from '@/shared/Http'
import { FormInstance } from 'vant';
const formData = reactive({
  email: '',
  password: ''
})
const refForm = ref<FormInstance>()
const onSubmit = () => {
  console.log('login')
}
const onFailed = () => {
  console.log('failed')
}
const getValidateCode = () => {
  refForm.value!.validate('email').then(_=>{
    http.post('/validation_codes', { email: formData.email }, {_autoLoading: true})
  }).catch(err=>{
    throw err
  })
}
</script>
<style scoped lang="scss">
.login {
  .loginTitle {
    color: #fff;
    display: flex;
    column-gap: 12px;
    align-items: center;
    font-size: 24px;
  }
  .logoSec {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 42px;
    gap: 12px;
    svg {
      height: 68px;
      width: 64px;
    }
    h3 {
      font-size: 32px;
      font-weight: bold;
      color: var(--app-name-color);
    }
  }
  .loginForm {
    padding-top: 32px;
    .submitBtnRow {
      margin: 48px 16px 0 16px;
    }
  }
}
</style>
