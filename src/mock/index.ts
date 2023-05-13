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
      kind: config.params.kind
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

//标签管理
export const mockTagIndex: Mock = (config) => {
  const { kind, page } = config.params
  const per_page = 25
  const count = 26
  const createPager = (page = 1) => ({
    page,
    per_page,
    count
  })
  const createTag = (n = 1, attrs?: any) =>
    Array.from({ length: n }).map(() => ({
      id: createId(),
      name: faker.lorem.word(),
      sign: faker.internet.emoji(),
      kind: config.params.kind,
      ...attrs
    }))
  const createBody = (n = 1) => ({
    resources: createTag(n),
    pager: createPager(page)
  })

  if (kind === 'expenses' && (!page || page === 1)) {
    return [200, createBody(25)]
  } else if (kind === 'expenses' && page === 2) {
    return [200, createBody(1)]
  } else if (kind === 'income' && (!page || page === 1)) {
    return [200, createBody(25)]
  } else {
    return [200, createBody(1)]
  }
}

//标签数据
export const mockTagShow: Mock = (config)=>{
  const createTag = (attrs?: any) => ({
    id: createId(),
    name: faker.lorem.word().slice(0,4),
    sign: faker.internet.emoji(),
    kind: 'expenses',
    ...attrs
  })
  return [
    200,{resource: createTag()}
  ]
}

export const mockItemSummary:Mock = (config)=>{
  const { group_by} = config.params
  if(group_by==='happen_at'){
    return [
      200,
      {
        groups: [
          { happen_at: '2022-07-18T00:00:00.000+0800', amount: 100 },
          { happen_at: '2022-07-22T00:00:00.000+0800', amount: 300 },
          { happen_at: '2022-07-29T00:00:00.000+0800', amount: 200 }
        ],
        summary: 600
      }
    ]
  }else{
    return [
      200,
      {
        groups: [
          { tag_id: 1, tag: { id: 1, name: '交通', sign: faker.internet.emoji() }, amount: 100 },
          { tag_id: 2, tag: { id: 2, name: '吃饭', sign: faker.internet.emoji() }, amount: 300 },
          { tag_id: 3, tag: { id: 3, name: '购物', sign: faker.internet.emoji() }, amount: 200 }
        ],
        summary: 600
      }
    ]
  }
}