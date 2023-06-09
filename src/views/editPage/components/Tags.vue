<template>
  <div class="tagsWrap">
    <ul @touchmove="handleTouchmove">
      <li @click="addNewTag">
        <span class="emojiWrap addIcon"><IconSvgAdd /></span>
        <span class="emojiName">新增</span>
      </li>
      <li v-for="tag in tags" :key="tag.id" @touchstart="startTouchTag($event, tag)" @touchend="endTouchTag" @click="onSelectTag(tag)">
        <span class="emojiWrap" :class="{'active': chosenTag && chosenTag.id === tag.id}">{{ tag.sign }}</span>
        <span class="emojiName">{{ tag.name.slice(0, 4) }}</span>
      </li>
      <p class="bottomFuncRow">
        <span v-if="hasMore" v-scroll-load="fetchTags">显示更多</span>
        <span v-else>没有更多</span>
      </p>
    </ul>
  </div>
</template>
<script lang="ts" setup name="Tags">
import { ref } from 'vue'
import { http } from '@/shared/Http'
import { AxiosResponse } from 'axios'
import { onMounted } from 'vue'
import vScrollLoad from '@/directives/scrollLoad'
import { useRouter } from 'vue-router'
const props = defineProps({
  kind: {
    type: String,
    default: 'expenses'
  }
})
const tags = ref<Tag[]>([])
const page = ref(0)
const hasMore = ref(false)

type Fetcher = () => Promise<AxiosResponse<Resources<Tag>>>
const fetcher: Fetcher = () => {
  return http.get<Resources<Tag>>(
    '/tags',
    {
      kind: props.kind,
      page: page.value + 1
    },
    {
      _mock: 'tagIndex',
      _autoLoading: true
    }
  )
}
const fetchTags = async () => {
  const response = await fetcher()
  const { resources, pager } = response.data
  tags.value.push(...resources)
  hasMore.value = (pager.page - 1) * pager.per_page + resources.length < pager.count
  page.value += 1
}
onMounted(() => {
  fetchTags()
})
const router = useRouter()
const addNewTag = () => {
  console.log('addNewTag')
  router.push({ path: '/tagPage/create', query: { kind: props.kind } })
}

const currentTag = ref<HTMLDivElement>()
const timer = ref<ReturnType<typeof setTimeout>>()
const startTouchTag = (e: TouchEvent, tag: Tag) => {
  currentTag.value = e.target as HTMLDivElement
  timer.value = setTimeout(() => {
    router.push(`/tagPage/${tag.id}/edit?kind=${tag.kind}`)
  }, 500)
}
const endTouchTag = () => {
  clearTimeout(timer.value)
}
const handleTouchmove = (e: TouchEvent) => {
  const touchEle = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
  if (currentTag.value !== touchEle && currentTag.value?.contains(touchEle) === false) {
    clearTimeout(timer.value)
  }
}
const chosenTag = ref<Tag>()
const emit= defineEmits(['update:modelValue'])
const onSelectTag =(tag:Tag)=>{
  chosenTag.value = tag
  emit('update:modelValue',tag.id)
}
</script>
<style scoped lang="scss">
.tagsWrap {
  height: 100%;
  padding: 12px 0 4px;
  ul {
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    li {
      width: 20%;
      height: 20vw * 1.14;
      display: flex;
      flex-direction: column;
      align-items: center;
      .emojiWrap {
        height: 12vw;
        width: 12vw;
        background-color: var(--tag-bg);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 6vw;
        &.active{
          background-color: var(--tag-active-bg);
        }
        &.addIcon svg {
          height: 1.2em;
          width: 1.2em;
        }
      }
      .emojiName {
        margin-top: 4px;
        font-size: 12px;
      }
    }
  }
}
</style>
