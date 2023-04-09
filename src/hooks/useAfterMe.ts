import {onMounted} from 'vue'
import {useMeStore} from '@/store/useMeStore'

export const useAfterMe = (fn: () => void) => {
  const meStore = useMeStore()
  onMounted(() => {
    meStore.mePromise!.then(fn,()=>undefined)
  })
}