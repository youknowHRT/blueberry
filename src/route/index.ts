import {createRouter, createWebHashHistory} from 'vue-router'

const routes=[
  {
    path:'/',
    component:()=>import('@/views/welcome/index.vue')
  },
  {
    path:'/home',
    component:()=>import('@/views/home/index.vue'),
    children:[
      { path: '', redirect: '/home/billPage' },
      {
        path:'billPage',
        name:'billPage',
        components:{main:()=>import('@/views/billPage/index.vue')}
      },
      {
        path:'chartPage',
        name:'chartPage',
        components:{main:()=>import('@/views/chartPage/index.vue')}
      },
      {
        path:'editPage',
        name:'editPage',
        components:{main:()=>import('@/views/editPage/index.vue')}
      },
    ]
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