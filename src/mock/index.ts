import { faker } from '@faker-js/faker'
import { AxiosRequestConfig } from 'axios'

type Mock = (config: AxiosRequestConfig) => [number, any]

let id = 0
const createId = () => {
  id += 1
  return id
}
export const mockItemIndexBalance: Mock = (config) => {
  return [
    200,
    {
      expenses: 9900,
      income: 9900,
      balance: 0
    }
  ]
}
