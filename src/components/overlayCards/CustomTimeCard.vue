<template>
 <div class="customTimeCard" @click.stop>
      <header>请选择时间</header>
      <main>
        <section>
          <!-- <van-form @submit="onSubmit" @failed="onFailed" ref="refForm">
            <van-field
              v-model="formData.email"
              name="email"
              label="邮箱地址"
              placeholder="邮箱地址"
              :rules="[
                { required: true, message: '请填写开始时间' }
              ]"
            />
          </van-form> -->
        </section>
        <footer>
          <!-- <van-button type="primary" @click="showPop = false">确定</van-button> -->
          <van-button plain>确定</van-button>
        </footer>
      </main>
    </div>
</template>
<script lang='ts' setup name='CustomTimeCard'>
   import { ref, reactive} from 'vue'
   
</script>
<style scoped lang='scss'>
.customTimeCard {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  height: 50%;
  width: 80%;
  header {
    padding: 12px 16px;
    background: var(--common-theme-bg);
    color: var(--dialog-header-color);
  }
}
</style>