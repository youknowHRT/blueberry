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
export const mockItemIndex: Mock = (config) => {
  console.log(config,'🍋🍋🍋')
  const {page} = config.params
  const per_page = 25
  const count = 26
  const createPager = (page=1) => ({
      page,
      per_page,
      count
  })
  const createTag = (attrs?:any)=>({
    id: createId(),
    name: faker.lorem.word(4),
    sign: faker.internet.emoji(),
    kind: 'expenses',
    ...attrs
  })
  const createItem = (n=1)=>
    Array.from({length: n}).map(()=>({
      id: createId(),
      user_id: createId(),
      amount: faker.finance.account(5),
      tag_ids: [createId()],
      tags: [createTag()],
      happen_at: faker.date.past().toISOString(),
      // kind: config.params.kind
    }))
  const createBody=(n=1)=>({
    resources: createItem(n),
    pager: createPager(page),
    summary: {
      income:9900,
      expenses: 9900,
      balance: 0
    }
  })
  if(page===1 || !page){
    return [200,createBody(25)]
  }else if(page===2){
    return [200,createBody(1)]
  }
  return [200,{}]
}
