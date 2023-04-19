/// <reference types="vite/client" />

import { ButtonType } from 'vant'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
export {}

declare global {
  type PadBtn = {
    text: string
    onClick: () => void
    type: ButtonType
  }
  type JSONValue = string | number | boolean | null | Record<string, JSONValue> | JSONValue[]

  type User = {
    id: number
    email: string
  }
  type Resource<T> = {
    resource: T
  }
  type Resources<T> = {
    resources: T[]
    pager: {
      page: number
      per_page: number
      count: number
    }
  }
  type Tag = {
    id: number
    user_id: number
    name: string
    sign: string
    kind: 'expenses' | 'income'
  }
  type Item = {
    id: number
    user_id: number
    amount: number
    tag_ids: number[]
    tags: Tag[]
    happen_at: string
    kind: 'expenses' | 'income'
  }
  type ItemListDateParam = {
    happened_after: string
    happened_before: string
  }
}
