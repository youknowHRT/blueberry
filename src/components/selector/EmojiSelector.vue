<template>
  <div class="emojiSelector van-cell">
  <!-- <div class="emojiSelector van-cell"> -->
    <!-- <div class="topShowBar">
      <div class="van-cell__title van-field__label">符号</div>
      <div class="van-cell__value van-field__value">
        <div class="van-field__body">
          <input type="text" id="van-field-8-input" name="name" class="van-field__control"
            :value="sign" disabled placeholder="请选择符号" aria-labelledby="van-field-8-label">
        </div>
      </div>
    </div> -->
    <section class="emojiTable">
      <nav>
        <span @click="handleChooseTag(sIndex)" v-for="(sItem,sIndex) in table">{{sItem[0]}}</span>
      </nav>
      <ol>
        <li v-for="eItem in boardEmojis" @click="chooseItem(eItem!)">{{ eItem }}</li>
      </ol>
    </section>
  </div>
</template>
<script lang="ts" setup name="">
import { ref, reactive, computed } from 'vue'
import {emojiList} from '@/shared/emojiList'
const table: [string, string[]][] = [
  [ '表情', [ 'face-smiling', 'face-affection', 'face-tongue', 'face-hand', 'face-neutral-skeptical', 'face-sleepy', 'face-unwell', 'face-hat', 'face-glasses', 'face-concerned', 'face-negative', 'face-costume' ] ],
  [ '手势', [ 'hand-fingers-open', 'hand-fingers-partial', 'hand-single-finger', 'hand-fingers-closed', 'hands', 'hand-prop', 'body-parts' ] ],
  [ '人物', ['person', 'person-gesture', 'person-role', 'person-fantasy', 'person-activity', 'person-sport', 'person-resting'] ],
  ['衣服', ['clothing']],
  [ '动物', [ 'cat-face', 'monkey-face', 'animal-mammal', 'animal-bird', 'animal-amphibian', 'animal-reptile', 'animal-marine', 'animal-bug' ] ],
  ['植物', ['plant-flower', 'plant-other']],
  ['自然', ['sky & weather', 'science']],
  ['食物', ['food-fruit', 'food-vegetable', 'food-prepared', 'food-asian', 'food-marine', 'food-sweet']],
  ['运动', ['sport', 'game']]
]
const sign = ref('')
const curTab = ref(0)
const boardEmojis = computed(() => {
  const selectedItems = table[curTab.value][1]
  return selectedItems.map(ele=>{
    return emojiList.find(ceb=>ceb[0]===ele)?.[1].map(a=>a.replace(/\s/g, ''))
  }).flat()
})
const handleChooseTag = (index: number) => {
  curTab.value = index
}
const emit=defineEmits(['update:sign'])
const chooseItem=(item: string)=>{
  sign.value = item
  emit('update:sign',item)
}
</script>

<style scoped lang="scss">
.emojiSelector{
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  padding: 0 16px 10px 16px;
  line-height: 24px;
  flex: 1;
  height: 100px;
  .topShowBar{
    display: flex;
    .van-field__control{
      font-size: 22px;
      &::-webkit-input-placeholder{
        font-size: 14px;
      }
    }
  }
  .emojiTable{
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100px;
    nav{
      display: flex;
      flex-wrap: nowrap;
      overflow-x: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      span{
        display: inline-flex;
        flex-shrink:0;
        padding: 8px;
      }
    }
    ol{
      padding: 0 4px;
      font-size: 22px;
      line-height: 32px;
      flex: 1;
      height: 100px;
      overflow-y: auto;
      li{
        display: inline-block;
        width: 10%;
        text-align: center
      }
    }
  }
}
</style>