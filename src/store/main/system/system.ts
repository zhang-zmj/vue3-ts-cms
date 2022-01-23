import { Module } from "vuex"
import { IRootState } from "@/store/type"
import { ISystemState } from "./types"
import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from "@/network/main/system/system"

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
      departmentCount: 0,
      departmentList: [],
      categoryCount: 0,
      categoryList: []
    }
  },
  mutations: {
    changeUsersList(state, userList: any[]) {
      state.usersList = userList
    },
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },

    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    },
    changeDepartmentCount(state, totalCount: number) {
      state.departmentCount = totalCount
    },
    changeDepartmentList(state, departmentList: any) {
      state.departmentList = departmentList
    },
    changeCategoryCount(state, categoryCount: number) {
      state.categoryCount = categoryCount
    },
    changeCategoryList(state, categoryList: any) {
      state.categoryList = categoryList
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        console.log("上下获取的数据", (state as any)[`${pageName}List`])

        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 1.获取pageUrl
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`
      // 2.对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      // 3.将数据存储到state中
      const { list, totalCount } = pageResult.data
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)

      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
    },

    async deletePageDataAction({ dispatch }, payload: any) {
      // 1、获取路径
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`

      // 2、进行网络请求
      await deletePageData(pageUrl)

      // 3、请求最新的数据
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    async createPageDataAction({ dispatch }, payload: any) {
      //1、创建数据的请求
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      await createPageData(pageUrl, newData)

      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    async editPageDataAction({ dispatch }, payload: any) {
      //1、编辑数据的请求
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`

      await editPageData(pageUrl, editData)

      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
