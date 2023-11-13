import { asyncRoutes, constantRoutes } from '@/router'
import { getRoles } from '@/api/role'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) { 
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  async generateRoutes({ commit }, roles) {
    console.log("generateRoutes>>> ", roles)
    let ret = await getRoles()
    let all_roles = ret.data                               //角色可访问目录信息
    console.log("generateRoutes2>>> ", all_roles, asyncRoutes)
    let path_map = {}
    for (let i = 0; i < asyncRoutes.length; i++) {
      let one_route = asyncRoutes[i]
      let path = one_route.path
      if (path == '*') {
        continue
      }
      console.log("one_route>>> ",one_route)
      one_route.meta.roles = []                            //可访问的角色
      path_map[path] = {ref : one_route, child_map : {}}
      if (one_route.children) {
        for (let j = 0; j < one_route.children.length; j++) {
          let one_children = one_route.children[j]
          console.log("one_children>>> ", one_children)
          let child_path = one_children.path
          one_children.meta.roles = []                     //可访问的角色
          path_map[path].child_map[child_path] = {ref : one_children}
        }
      }
    }

    console.log("generateRoutes3>>> ", path_map)
    for (let i = 0; i < all_roles.length; i++) {
      let one_role = all_roles[i]
      let role_name = one_role.name
      let routes = one_role.routes                  //角色可访问的路由
      for (let j = 0; j < routes.length; j++) {
        let one_route = routes[j]
        console.log("generateRoutes4>>>",role_name,one_route)
        let path_routes = path_map[one_route.path]
        if (path_routes) {
          path_routes.ref.meta.roles.push(role_name) //该路由此角色可访问
          let child_routes = one_route.children
          let child_map = path_routes.child_map
          if (child_routes) {
            for (let k = 0; k < child_routes.length; k++) {
              let child_route = child_routes[k]
              let child_path_route = child_map[child_route.path]
              if (child_path_route) {
                child_path_route.ref.meta.roles.push(role_name)
              }
            }
          }
        }
      }
    }
    
    console.log("generateRoutes5>>> ", asyncRoutes)
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
