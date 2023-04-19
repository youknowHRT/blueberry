import { defineStore } from 'pinia'
import { http } from '@/shared/Http'
type State = {
  items: Item[]
  hasMore: boolean
  page: number
}
type Actions = {
  _fetch: (firstPage: boolean, startDate?: string, endDate?: string) => void
  fetchMore: (startDate?: string, endDate?: string) => void
  fetchFirstPage: (startDate?: string, endDate?: string) => void
}
export const useItemStore = (id: string | string[]) => {
  return defineStore<string, State, {}, Actions>(typeof id === 'string' ? id : id.join('-'), {
    state: () => ({
      items: [],
      hasMore: false,
      page: 1
    }),
    actions: {
      async _fetch(firstPage, startDate, endDate) {
        if (!startDate || !endDate) return
        const response = await http.get<Resources<Item>>(
          '/items',
          {
            happened_after: startDate,
            happened_before: endDate,
            page: this.page
          },
          {
            _mock: 'itemIndex',
            _autoLoading: true
          }
        )
        const { pager, resources } = response.data
        if (firstPage) {
          this.items = resources
        } else {
          this.items = this.items.concat(resources)
        }
        this.hasMore = (pager.page - 1) * pager.per_page + resources.length < pager.count
        this.page += 1
        return response
      },
      async fetchMore(startDate, endDate) {
        return this._fetch(false, startDate, endDate)
      },
      async fetchFirstPage(startDate, endDate) {
        this.page=1
        return this._fetch(true, startDate, endDate)
      }
    }
  })()
}
export type UseItemStore = ReturnType<typeof useItemStore>;
