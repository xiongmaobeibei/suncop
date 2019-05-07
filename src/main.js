// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import router from './router'
// 引入flexible
import 'lib-flexible'
<<<<<<< HEAD
=======
// import axios from 'axios'
// import VueAxios from 'vue-axios'
// Swiper
>>>>>>> 5293695edd1ad8b60cc8fe38141c44b8cb54b065
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

import { List, Avatar, Icon } from 'ant-design-vue'
[List, Avatar, Icon].forEach(item => Vue.use(item))

Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
