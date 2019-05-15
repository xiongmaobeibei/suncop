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
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: () => import('../pages/index/index')
  },
  {
    path: '/add',
    component: () => import('../pages/users/addWorknews'),
    meta: {
      requireLogin: true // 当前路由需要校验，不需要就不用写
    }
  },
  {
    path: '/interact',
    component: () => import('../pages/interactBox/index'),
    meta: {
      requireLogin: true // 当前路由需要校验，不需要就不用写
    },
    children: [
      {
        path: '/interact/vote',
        component: () => import('../pages/interactBox/components/vote'),
        meta: {
          requireLogin: true // 当前路由需要校验，不需要就不用写
        }
      },
      {
        path: '/interact/public',
        component: () => import('../pages/interactBox/components/public'),
        meta: {
          requireLogin: true // 当前路由需要校验，不需要就不用写
        }
      },
      {
        path: '/interact/policy',
        component: () => import('../pages/interactBox/components/policy'),
        meta: {
          requireLogin: true // 当前路由需要校验，不需要就不用写
        }
      },
      {
        path: '/interact/readLetters',
        component: () => import('../pages/interactBox/components/read'),
        meta: {
          requireLogin: true // 当前路由需要校验，不需要就不用写
        }
      },
      {
        path: '/interact/writeLetters',
        component: () => import('../pages/interactBox/components/write'),
        meta: {
          requireLogin: true // 当前路由需要校验，不需要就不用写
        }
      }
    ]
  },
  {
    path: '/updateCode',
    component: () => import('../pages/log/updateCode')
  },
  {
    path: '/message/resident',
    component: () => import('../pages/messageBox/resident'),
    meta: {
      requireLogin: true // 当前路由需要校验，不需要就不用写
    }
  },
  {
    path: '/message/admin',
    component: () => import('../pages/messageBox/admin'),
    meta: {
      requireLogin: true // 当前路由需要校验，不需要就不用写
    }
  },
  {
    path: '/message/areaAdmin',
    component: () => import('../pages/messageBox/areaAdmin'),
    meta: {
      requireLogin: true // 当前路由需要校验，不需要就不用写
    }
  },
  {
    path: '/vote',
    component: () => import('../pages/vote/vote')
  },
  {
    path: '/user',
    component: () => import('../pages/users/master'),
    meta: {
      requireLogin: true // 当前路由需要校验，不需要就不用写
    },
    children: [
      {
        path: '/user/personality',
        component: () => import('../pages/users/personality'),
        meta: {
          requireLogin: true // 当前路由需要校验，不需要就不用写
        }
      },
      {
        path: '/user/systemManage',
        component: () => import('../pages/users/systemManage'),
        meta: {
          requireLogin: true // 当前路由需要校验，不需要就不用写
        }
      },
      {
        path: '/user/addWorknews',
        component: () => import('../pages/users/addWorknews'),
        meta: {
          requireLogin: true // 当前路由需要校验，不需要就不用写
        }
      },
      {
        path: '/user/area_letterManage',
        component: () => import('../pages/users/area_letterManage'),
        meta: {
          requireLogin: true // 当前路由需要校验，不需要就不用写
        }
      },
      {
        path: '/user/letterReturn',
        component: () => import('../pages/users/letterReturn'),
        meta: {
          requireLogin: true // 当前路由需要校验，不需要就不用写
        }
      },
      {
        path: '/user/myletter',
        component: () => import('../pages/users/myletter'),
        meta: {
          requireLogin: true // 当前路由需要校验，不需要就不用写
        }
      },
      {
        path: '/user/systemManage',
        component: () => import('../pages/users/systemManage'),
        meta: {
          requireLogin: true // 当前路由需要校验，不需要就不用写
        }
      },
      {
        path: '/user/userinfoManage',
        component: () => import('../pages/users/userinfoManage'),
        meta: {
          requireLogin: true // 当前路由需要校验，不需要就不用写
        }
      },
      {
        path: '/user/userPermitManage',
        component: () => import('../pages/users/userPermitManage'),
        meta: {
          requireLogin: true // 当前路由需要校验，不需要就不用写
        }
      },
      {
        path: '/user/voteManage',
        component: () => import('../pages/users/voteManage'),
        meta: {
          requireLogin: true // 当前路由需要校验，不需要就不用写
        }
      }
    ]
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
