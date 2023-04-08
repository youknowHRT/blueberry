import { defineStore } from 'pinia'
import { http } from '@/shared/Http'
type State = {
  items: Item[]
  hasMore: boolean
  page: number
}
type Actions = {}
export const useItemStore = (id: string) => {
  defineStore<string, State, {}, Actions>(id, {
    state: () => ({
      items: [],
      hasMore: false,
      page: 1,
    }),
    actions: {
      
    }
  })
}
