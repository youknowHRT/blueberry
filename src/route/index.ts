import {createRouter, createWebHashHistory} from 'vue-router'

const routes=[
  {
    path:'/',
    component:()=>import('@/views/welcome/index.vue')
  },
  {
    path:'/home2',
    component:()=>import('../views/Home2.vue')
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})