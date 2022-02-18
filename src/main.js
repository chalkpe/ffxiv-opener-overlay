import { createApp } from 'vue'
import Storage from 'vue-ls'
import App from './App.vue'

createApp(App)
  .use(Storage, { storage: 'local', namespace: 'opener-' })
  .mount('#app')
