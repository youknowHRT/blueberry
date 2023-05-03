<template>
  <div class="tagsWrap">
    <ul>
      <li v-for="tag in tags" :key="tag.id">
        <span>{{ tag.sign }}</span>
        <span>{{ tag.name }}</span>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup name="Tags">
import { ref, reactive } from 'vue'
import { http } from '@/shared/Http'
import { AxiosResponse } from 'axios'
import { onMounted } from 'vue'
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
const fetcher = () => {
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
const fetchTags = async (fn: Fetcher) => {
  const response = await fn()
  const { resources, pager } = response.data
  console.log(response.data,'aaaaaaqiche🚗🚗🚗')
  tags.value.push(...resources)
  hasMore.value = (pager.page - 1) * pager.per_page + resources.length < pager.count
  page.value += 1
}

onMounted(() => {
  fetchTags(fetcher)
})
</script>
<style scoped lang="scss">
.tagsWrap{
  border: 5px solid red;
  ul{
    display: flex;
    flex-wrap: wrap;
    li{
      width: 20vw;
      display: flex;
      flex-direction: column;
    }
  }

}
</style>
