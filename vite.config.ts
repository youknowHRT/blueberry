import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import Components from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { VantResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [
    vue(),
    VueSetupExtend(),//给component命名
    
    Icons({
      compiler: 'vue3',
      autoInstall: true,
      customCollections:{
        svg: FileSystemIconLoader('src/assets/icons/svg', svg => svg.replace(/^<svg /, '<svg fill="currentColor" ')),
      }
    }),
    Components({
      resolvers: [
        IconsResolver({
          // alias: { //   park: 'icon-park', // },
          prefix: 'icon',
          customCollections: ['svg'],
        }),
        VantResolver(),
      ],
    }),
  ]
})

