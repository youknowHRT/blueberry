<template>
  <MainLayout :showTabbar="false">
    <template #header>
      <div class="operateTitle">
        <IconLayoutLeft @click="handleRouteBack"/>
        <h3 v-if="id">编辑标签</h3>
        <h3 v-else>新建标签</h3>
      </div>
    </template>
    <section class="tagEditSec">
      <main class="formSec">
        <van-form @submit="onSubmit" @failed="onFailed" ref="refForm">
          <van-field
            v-model="formData.name"
            name="name"
            label="标签名"
            placeholder="请填写标签名"
            :rules="[ { required: true, message: '标签名必填' } ]"
          />
          <van-field
            v-model="formData.sign"
            name="sign"
            label="符号"
            placeholder="请选择符号"
            readonly
            :rules="[ { required: true, message: '符号必选' } ]"
            @click="showSignBD = true"
          />
          <van-popup v-model:show="showSignBD" position="bottom">
            signbg
          </van-popup>
          <div class="tagSubmitWrap">
            <van-button block native-type="submit" color="#5c33be"> 确定 </van-button>
          </div>
        </van-form>
      </main>
      <footer v-if="id">
        删除
      </footer>
    </section>
  </MainLayout>  
</template>
<script lang='ts' setup name='TagPage'>
import MainLayout from '@/layouts/MainLayout.vue'
import { ref, reactive,computed} from 'vue'
import { useRoute } from 'vue-router';
const route = useRoute()
const id = computed(()=>{
  return route.params?.id
})
const formData = reactive({
  name: '',
  sign: ''
})
const showSignBD = ref(false)
const handleRouteBack = () => {
  // console.log('back')
}
const onSubmit = () => {
  console.log('submit')
}
const onFailed = () => {
  console.log('failed')
}
</script>
<style scoped lang='scss'>
.tagEditSec{
  padding: 12px 0;
  // border: 10px solid purple;
  height: 100%;
  overflow-y: scroll;
  .formSec{
    height: 100%;
    // border: 5px solid blue;
    .tagSubmitWrap{
      margin: 28px 16px 0 16px;
    }
  }
}
</style>
