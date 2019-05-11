// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import router from './router'
// 引入flexible
import 'lib-flexible'
import axios from 'axios'
// 引入vuex
import store from './store/store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
<<<<<<< HEAD
import { List, Avatar, Icon } from 'ant-design-vue'
[List, Avatar, Icon].forEach(item => Vue.use(item))
=======

import VModal from 'vue-js-modal'

import { List, Avatar, Icon, Table, Tag, Divider, Input, Button, Modal } from 'ant-design-vue'
[List, Avatar, Icon, Table, Tag, Divider, Input, Button, Modal].forEach(item => Vue.use(item))
>>>>>>> 63eaeb47706c64f67e46311df5350a96df10fa6d

Vue.use(VueAwesomeSwiper)

// 用户手动刷新页面，这是路由会被重设，要重新新增
// if (sessionStorage.getItem('user')) {
//   let routes = JSON.parse(sessionStorage.getItem('menuData'))
//   store.dispatch('add_Routes', routes)
// }
// 登录状态判断
// router.beforeEach((to, from, next) => {
//   if (!sessionStorage.getItem('user') && to.path !== '/login') {
//     next({
//       path: '/index',
//       query: {redirect: to.fullPath}
//     })
//   } else {
//     next()
//   }
// })

Vue.prototype.$ajax = axios

Vue.config.productionTip = false

Vue.use(VueResource)
// Vue.use(VueAxios, axios)
// Vue.use(VModal)
Vue.use(VModal, { dialog: true })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
