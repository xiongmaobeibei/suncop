// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import router from './router'
// 引入flexible
import 'lib-flexible'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

Vue.use(VueResource)
<<<<<<< HEAD
Vue.use(VueAxios, axios)
=======
// Vue.use(VueAxios, axios)
>>>>>>> cb9b66779057d4ea62a995a49a4390a348fc23a4

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
