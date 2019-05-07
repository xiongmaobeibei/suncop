import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const constantRoutes = [
  {
    path: 'log',
    component: () => import('../pages/log/log')
  },
  {
    path: '/login',
    component: () => import('../pages/log/login')
  },
  {
    path: '/regist',
    component: () => import('../pages/log/regist')
  },
  {
    path: '/index',
    component: () => import('../pages/index/index')
  },
  {
    path: '/updateCode',
    component: () => import('../pages/log/updateCode')
<<<<<<< HEAD
=======
  },
  {
    path: '/master',
    component: () => import('../pages/users/master/master')
  },
  {
    path: '/test',
    component: () => import('../pages/test')
>>>>>>> 5293695edd1ad8b60cc8fe38141c44b8cb54b065
  }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
