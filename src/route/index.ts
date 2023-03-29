import {createRouter, createWebHashHistory} from 'vue-router'

const routes=[
  {
    path:'/',
    component:()=>import('@/views/welcome/index.vue')
  },
  {
    path:'/detailPage',
    component:()=>import('@/views/detailPage/index.vue')
  },
  {
    path:'/billPage',
    component:()=>import('@/views/billPage/index.vue')
  },
  {
    path:'/chartPage',
    component:()=>import('@/views/chartPage/index.vue')
  },
  {
    path:'/editPage',
    component:()=>import('@/views/editPage/index.vue')
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})