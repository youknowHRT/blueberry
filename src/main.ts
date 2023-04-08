import { createApp } from 'vue'
import App from './App.vue'
import { router } from './route/index'
import 'vant/lib/index.css'
import { createPinia,storeToRefs } from 'pinia'
import { useMeStore } from './store/useMeStore'
import { whiteList } from './shared/WhiteList'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')

const meStore = useMeStore()
const {mePromise}= storeToRefs(meStore)
meStore.fetchMe()

router.beforeEach((to, from) => {
  for( const key in whiteList){
    if(whiteList[key] === 'exact' && to.path === key){
      return true
    }
    if(whiteList[key] === 'startsWith' && to.path.startsWith(key)){
      return true
    }
  }
  return mePromise!.value!.then(
    () => true,
    () => '/sign_in?return_to=' + from.path
  )
})