import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).use(router).use(router).mount('#app')

/* ou, peut probable

import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

/*/