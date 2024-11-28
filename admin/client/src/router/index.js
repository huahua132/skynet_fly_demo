import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','developer']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '数据看板'}
      },
    ]
  },

  {
    path: '/realtimelist',
    component: Layout,
    children: [
      {
        path : 'index',
        name : 'Realtimelist',
        component: () => import('@/views/realtimelist/index'),
        meta: {title: '实时列表'},
      }
    ]
  },

  {
    path: '/monitor',
    component: Layout,
    children: [
      {
        path : 'index',
        name : 'Monitor',
        component: () => import('@/views/monitor/index'),
        meta: {title: '服务监控'},
      }
    ]
  },

  {
    path: '/warnlog',
    component: Layout,
    children: [
      {
        path : 'index',
        name : 'WarnLog',
        component: () => import('@/views/warnlog/index'),
        meta: {title: '警告日志'},
      }
    ]
  },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */

export var asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: '权限管理',
      roles: ['admin', 'developer'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: '角色切换',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: '权限说明'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: '角色权限',
          roles: ['admin']
        }
      },
    ]
  },
  {
    path: '/user',
    component: Layout,
    meta: {
      roles: ['admin', 'developer'] // you can set roles in root nav
    },
    children: [
      {
        path : 'index',
        name : 'UserList',
        component: () => import('@/views/user/index'),
        meta: {
          title: '用户管理',
          roles: ['admin']
        },
      }
    ]
  },

  {
    path: '/global_email',
    component: Layout,
    meta: {
      roles: ['admin', 'developer'] // you can set roles in root nav
    },
    children: [
      {
        path : 'index',
        name : 'GlobalEmail',
        component: () => import('@/views/global_email/index'),
        meta: {
          title: '全服邮件',
          roles: ['admin']
        },
      }
    ]
  },

  {
    path: '/gm',
    component: Layout,
    meta: {
      roles: ['admin', 'developer'] // you can set roles in root nav
    },
    children: [
      {
        path : 'index',
        name : 'gm',
        component: () => import('@/views/gm/index'),
        meta: {
          title: 'GM',
          roles: ['admin']
        },
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
