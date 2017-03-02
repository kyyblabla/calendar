// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueTouch from 'vue-touch'
Vue.config.productionTip = false
/* eslint-disable no-new */

Vue.use(VueTouch, {name: 'v-touch'})
new Vue({
  el: '#app',
  template: '<App/>',
  components: {App}
})
