<template>
  <MainLayout :showTabbar="false">
    <template #header>
      <div class="operateTitle">
        <BackIcon/>
        <h3 v-if="id">编辑标签</h3>
        <h3 v-else>新建标签</h3>
      </div>
    </template>
    <section class="tagEditSec">
      <van-form @submit="onSubmit" @failed="onFailed" ref="refForm">
        <van-field
          v-model="formData.name"
          name="name"
          label="标签名"
          placeholder="请填写标签名"
          :rules="[ { required: true, message: '标签名必填' },
          { validator: (val)=>{return /^.{1,4}$/.test(val)}, message:'只能填写1-4个字符' } ]"
        />
        <van-field
            v-model="formData.sign"
            class="specialSignField"
            name="sign"
            label="符号"
            placeholder="请选择下方符号"
            readonly
            :rules="[ { required: true, message: '请选择符号' } ]"
          />
        <EmojiSelector v-model:sign="formData.sign"/>
        <p>记账时长按标签即可进行编辑</p>
        <div class="tagSubmitWrap">
          <van-button block native-type="submit" color="#5c33be"> 确定 </van-button>
        </div>
      </van-form>
      <footer v-if="id">
        <van-button block type="danger" @click="delAllTagData"> 删除标签（对应记账也会被删除） </van-button>
      </footer>
    </section>
  </MainLayout>  
</template>
<script lang='ts' setup name='TagPage'>
import MainLayout from '@/layouts/MainLayout.vue'
import { ref, reactive,computed,onMounted} from 'vue'
import { useRoute, useRouter } from 'vue-router';
import EmojiSelector from '@/components/selector/EmojiSelector.vue'
import { http } from '@/shared/Http'
import { showConfirmDialog,showDialog } from 'vant'
const route = useRoute()
const id = computed(()=>{
  return route.params?.id
})
const formData = reactive<Partial<Tag>>({
  id: undefined,
  name: '',
  sign: '',
  kind: route.query.kind!.toString() as 'expenses' | 'income'
})
const router = useRouter()
const onSubmit = () => {
  console.log('submit')
  http.post('/tags', formData, { _autoLoading: true }).then(res=>{
    console.log(res,'tag')
    router.back()
  }).catch(err=>{
    console.log(err)
  })
}
const onFailed = () => {
  console.log('failed')
}
onMounted(async()=>{
  if(id.value){
    const response = await http.get<Resource<Tag>>(
      `/tags/${id.value}`,{ },{_mock: 'tagShow'}
    )
    Object.assign(formData,response.data.resource)
  }
})
const onError=()=>{
  showDialog({
    title: '错误',
    message: '删除失败',
    width: '320px'
  })
}
const delAllTagData = async () => {
  await showConfirmDialog({
    title: '删除标签',
    message: '删除标签将会删除该标签下的所有记账，是否继续？',
    confirmButtonColor: '#f00',
    overlay: true
  })
  await http.delete<Resource<Tag>>(
    `/tags/${id.value}`,{ with_items:'true'})
    .catch(onError)
    setTimeout(() => {
      router.back()
    }, 1000);
}
</script>
<style scoped lang='scss'>
.tagEditSec{
  height: 100%;
  overflow-y: scroll;
  .van-form{
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-top: 12px;
    .specialSignField.van-field{
      :deep(.van-field__control){
        font-size: 22px;
        &::-webkit-input-placeholder{
          font-size: 14px;
        }
      }
      &::after{
        display: none;
      }
    }
    p{
      padding: 16px 0;
      text-align: center;
    }
    .tagSubmitWrap{
      margin: 24px 16px;
    }
  }
  footer{
    padding: 16px;
  }
}
</style>
