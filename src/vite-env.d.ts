/// <reference types="vite/client" />

import { ButtonType } from 'vant'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
export {};

declare global {
  type PadBtn = {
    text: string
    onClick: () => void
    type: ButtonType
  }
  type JSONValue = string | number | boolean | null | Record<string, JSONValue> | JSONValue[]
}
