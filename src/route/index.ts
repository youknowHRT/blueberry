import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[]= [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: () => import('@/views/home/index.vue'),
    children: [
      { path: '', redirect: '/home/billPage' },
      {
        path: 'billPage',
        name: 'billPage',
        components: { main: () => import('@/views/billPage/index.vue') }
      },
      {
        path: 'editPage',
        name: 'editPage',
        components: { main: () => import('@/views/editPage/index.vue') }
      },
      {
        path: 'chartPage',
        name: 'chartPage',
        components: { main: () => import('@/views/chartPage/index.vue') }
      },
      {
        path: 'userPage',
        name: 'userPage',
        components: { main: () => import('@/views/userPage/index.vue') }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/welcome',
    component: () => import('@/views/welcome/index.vue')
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})
