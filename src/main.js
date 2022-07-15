import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import waterfall from 'vue-waterfall2'
import 'reset-css'
import "@/plugins/vant";
import "@/config/rem";
import store from './store/store'
import "./icons";
Vue.config.productionTip = false
Vue.use(waterfall)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

