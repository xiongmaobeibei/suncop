// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import router from './router'
// 引入flexible
import 'lib-flexible'
import axios from 'axios'
// import VueAxios from 'vue-axios'
// Swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

import VModal from 'vue-js-modal'

import { List, Avatar, Icon, Table, Tag, Divider, Input, Button, Modal, Tabs } from 'ant-design-vue'
[List, Avatar, Icon, Table, Tag, Divider, Input, Button, Modal, Tabs].forEach(item => Vue.use(item))

Vue.use(VueAwesomeSwiper)

Vue.prototype.$ajax = axios

Vue.config.productionTip = false
require('./mock')

Vue.use(VueResource)
// Vue.use(VueAxios, axios)
// Vue.use(VModal)
Vue.use(VModal, { dialog: true })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
