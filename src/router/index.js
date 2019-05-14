import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const constantRoutes = [
  {
    path: '/log',
    component: () => import('../pages/log/log'),
    children: [
      {
        path: '/log/login',
        component: () => import('../pages/log/login')
      },
      {
        path: '/log/regist',
        component: () => import('../pages/log/regist')
      },
      {
        path: '/log/updateCode',
        component: () => import('../pages/log/updateCode')
      }
    ]
  },
  {
    path: '/index',
    component: () => import('../pages/index/index')
  },
  {
    path: '/add',
    component: () => import('../pages/users/addWorknews')
  },
  {
    path: '/interact',
    component: () => import('../pages/interactBox/index'),
    children: [
      {
        path: '/interact/vote',
        component: () => import('../pages/interactBox/components/vote')
      },
      {
        path: '/interact/public',
        component: () => import('../pages/interactBox/components/public')
      },
      {
        path: '/interact/policy',
        component: () => import('../pages/interactBox/components/policy')
      },
      {
        path: '/interact/readLetters',
        component: () => import('../pages/interactBox/components/read')
      },
      {
        path: '/interact/writeLetters',
        component: () => import('../pages/interactBox/components/write')
      }
    ]
  },
  {
    path: '/updateCode',
    component: () => import('../pages/log/updateCode')
  },
  {
    path: '/message/resident',
    component: () => import('../pages/messageBox/resident')
  },
  {
    path: '/message/admin',
    component: () => import('../pages/messageBox/admin')
  },
  {
    path: '/message/areaAdmin',
    component: () => import('../pages/messageBox/areaAdmin')
  },
  {
    path: '/test',
    component: () => import('../pages/test')
  },
  {
    path: '/user',
    component: () => import('../pages/users/master'),
    children: [
      {
        path: '/user/personality',
        component: () => import('../pages/users/personality')
      },
      {
        path: '/user/systemManage',
        component: () => import('../pages/users/systemManage')
      },
      {
        path: '/user/addWorknews',
        component: () => import('../pages/users/addWorknews')
      },
      {
        path: '/user/area_letterManage',
        component: () => import('../pages/users/area_letterManage')
      },
      {
        path: '/user/letterReturn',
        component: () => import('../pages/users/letterReturn')
      },
      {
        path: '/user/myletter',
        component: () => import('../pages/users/myletter')
      },
      {
        path: '/user/systemManage',
        component: () => import('../pages/users/systemManage')
      },
      {
        path: '/user/userinfoManage',
        component: () => import('../pages/users/userinfoManage')
      },
      {
        path: '/user/userPermitManage',
        component: () => import('../pages/users/userPermitManage')
      },
      {
        path: '/user/voteManage',
        component: () => import('../pages/users/voteManage')
      }
    ]
  }
  // {
  //   path: '*',
  //   name: '404',
  //   component: () => import('@/pages/404')
  // }
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
