<template>
  <div class="wrapper">
    <div class="customTimeCard" @click.stop>
      <header>请选择时间</header>
      <main>
        <van-form ref="refForm">
          <van-field
            v-model="formData.happened_after"
            name="happened_after"
            label="开始时间"
            placeholder="请选择开始时间"
            readonly
            :rules="[{ required: true, message: '请选择开始时间' }]"
            @click="showStartSelector = true"
          />
          <van-popup v-model:show="showStartSelector" position="bottom">
            <van-date-picker
              title="选择日期"
              v-model="defaultStartDate"
              @confirm="handleStartConfirm"
              @cancel="showStartSelector = false"
            />
          </van-popup>

          <van-field
            v-model="formData.happened_before"
            name="happened_before"
            label="结束时间"
            placeholder="请选择结束时间"
            readonly
            :rules="[{ required: true, message: '请选择结束时间' }]"
            @click="showEndSelector = true"
          />
          <van-popup v-model:show="showEndSelector" position="bottom">
            <van-date-picker
              title="选择日期"
              v-model="defaultEndDate"
              @confirm="handleEndConfirm"
              @cancel="showEndSelector = false"
            />
          </van-popup>
          <footer>
            <button @click="handleCancel">取消</button>
            <button @click="onSubmit">确定</button>
          </footer>
        </van-form>
      </main>
    </div>
  </div>
</template>
<script lang="ts" setup name="CustomTimeCard">
import { ref, reactive } from 'vue'
import { FormInstance } from 'vant'
import dayjs from 'dayjs'
const defaultDate = dayjs().format('YYYY,MM,DD').split(',')
const defaultStartDate = defaultDate
const defaultEndDate = defaultDate
const formData = reactive({
  happened_after: defaultDate.join('-'),
  happened_before: defaultDate.join('-')
})

const showStartSelector = ref<boolean>(false)
const showEndSelector = ref<boolean>(false)
const handleStartConfirm = ({ selectedValues }: Record<string, any[]>) => {
  formData.happened_after = selectedValues.join('-')
  showStartSelector.value = false
}
const handleEndConfirm = ({ selectedValues }: Record<string, any[]>) => {
  formData.happened_before = selectedValues.join('-')
  showEndSelector.value = false
}

const emit = defineEmits(['cancel', 'success'])
const refForm = ref<FormInstance>()
const onSubmit = () => {
  const happenedAfterRef = ref(new Date(formData.happened_after).getTime())
  const happenedBeforeRef = ref(new Date(formData.happened_before).getTime())

  if (happenedAfterRef.value > happenedBeforeRef.value) {
    [formData.happened_before, formData.happened_after] = [formData.happened_after, formData.happened_before]
  }
  emit('success', formData)
}
const handleCancel = () => {
  refForm.value?.resetValidation()
  emit('cancel')
}
</script>
<style scoped lang="scss">
.wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.customTimeCard {
  header {
    padding: 12px 16px;
    background: var(--common-theme-bg);
    color: var(--dialog-header-color);
  }
  main {
    background-color: var(--common-block-bg);
    padding: 4px 0;
    footer {
      display: flex;
      justify-content: end;
      margin-top: 16px;
      button {
        padding: 8px 16px;
        border: unset;
        background-color: transparent;
      }
    }
  }
}
</style>
