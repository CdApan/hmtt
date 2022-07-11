import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'

import Vant from 'vant'
import 'vant/lib/index.css'
import 'vant/lib/index.less'

Vue.use(Vant)

Vue.config.productionTip = false
Vue.directive('fofo', {
  inserted (el) {
    if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
      el.focus()
    } else {
      const theInput = el.querySelector('input')
      const theTextArea = el.querySelector('textarea')
      if (theInput) theInput.focus()
      if (theTextArea) theTextArea.focus()
    }
  },
  update (el) {
    if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
      el.focus()
    } else {
      const theInput = el.querySelector('input')
      const theTextArea = el.querySelector('textarea')
      if (theInput) theInput.focus()
      if (theTextArea) theTextArea.focus()
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
