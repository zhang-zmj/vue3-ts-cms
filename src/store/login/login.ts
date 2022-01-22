import { Module } from "vuex"
import { ILoginState } from "./type"
import { IRootState } from "../type"
import {
  accountLoginRequeest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from "@/network/login/login"
import { IAccount } from "@/network/login/type"
import localCache from "@/utils/cache"
import router from "@/router"
import { mapMenusToRoutes, mapMenusToPermissions } from "@/utils/map-menus"

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      usreInfo: {},
      usreMenus: [],
      permissions: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },

    changeUserInfo(state, usreInfo: any) {
      state.usreInfo = usreInfo
    },
    changeUserMenu(state, usreMenus: any) {
      state.usreMenus = usreMenus

      // usreMenus => routes
      const routes = mapMenusToRoutes(usreMenus)
      console.log(routes)

      // 将routes => router.main.children
      routes.forEach((route) => {
        router.addRoute("main", route)
      })

      // 获取用户按钮的权限
      const permissions = mapMenusToPermissions(usreMenus)
      state.permissions = permissions
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 1、实现登录逻辑：这个地方要配置跨域访问
      const loginResult = await accountLoginRequeest(payload)
      const { id, token } = loginResult.data
      commit("changeToken", token)
      localCache.setCache("token", token)

      //发送初始化的请求(完整的role/department)
      dispatch("getInitialDataAction", null, { root: true })

      // 2、请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit("changeUserInfo", userInfo)
      localCache.setCache("userInfo", userInfo)

      // 3、请求用户菜单
      const usreInfoMenu = await requestUserMenusByRoleId(userInfo.role.id)
      const usreMenus = usreInfoMenu.data
      commit("changeUserMenu", usreMenus)
      localCache.setCache("usreMenus", usreMenus)

      //  4、push到main
      router.push("/main")
    },

    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache("token")
      if (token) {
        commit("changeToken", token)

        //发送初始化的请求(完整的role/department)
        dispatch("getInitialDataAction", null, { root: true })
      }

      const userInfo = localCache.getCache("userInfo")
      if (userInfo) {
        commit("changeUserInfo", userInfo)
      }

      const usreMenus = localCache.getCache("usreMenus")
      if (usreMenus) {
        commit("changeUserMenu", usreMenus)
      }
    }

    // phoneLoginAction({ commit }, payload: any) {
    //   console.log("phoneLoginAction", payload)
    // }
  }
}

export default loginModule
