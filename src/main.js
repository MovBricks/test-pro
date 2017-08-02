import Vue from 'vue'
import App from './App.vue'

import Radio from 'element-ui/lib/radio'
import Radiogroup from 'element-ui/lib/radio-group'
import radiobutton from 'element-ui/lib/radio-button'
import 'element-ui/lib/theme-default/index.css'

Vue.use(Radio)
Vue.use(Radiogroup)
Vue.use(radiobutton)

new Vue({
  el: '#app',
  render: h => h(App)
})
