// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import router from './router'
// 引入flexible
import 'lib-flexible'
import axios from 'axios'
import qs from 'qs'
// 引入vuex
import store from './store/store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

import VModal from 'vue-js-modal'

import {List, Avatar, Icon, Table, Tag, Divider, Input, Button, Modal, Tabs, Card, DatePicker} from 'ant-design-vue'
[List, Avatar, Icon, Table, Tag, Divider, Input, Button, Modal, Tabs, Card, DatePicker].forEach(item => Vue.use(item))

Vue.use(VueAwesomeSwiper)

// 用户手动刷新页面，这是路由会被重设，要重新新增
// if (sessionStorage.getItem('user')) {
//   let routes = JSON.parse(sessionStorage.getItem('menuData'))
//   store.dispatch('add_Routes', routes)
// }

Vue.prototype.baseURL = 'http://localhost:8080/api'

axios.defaults.withCredentials = true

Vue.prototype.qs = qs

Vue.prototype.$ajax = axios

Vue.config.productionTip = false
// Vue.http.options.emulateJSON = true

Vue.use(VueResource)
// Vue.use(VueAxios, axios)
// Vue.use(VModal)
Vue.use(VModal, { dialog: true })
// 登录状态判断
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin)) {
    if (sessionStorage.getItem('user')) {
      next()
    } else {
      next({
        path: '/'
      })
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
