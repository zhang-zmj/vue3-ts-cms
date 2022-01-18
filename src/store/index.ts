import { createStore, Store, useStore as useVuexStore } from "vuex"
import login from "./login/login"
import { IRootState, IStoreType } from "./type"
import system from "./main/system/system"
import { getPageListData } from "@/network/main/system/system"

const store = createStore<IRootState>({
  state: () => {
    return {
      name: "zhangmingjun",
      age: 18,
      entireDepartment: [],
      entireRole: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    }
  },
  getters: {},
  actions: {
    async getInitialDataAction({ commit }) {
      // 请求部门和角色数据
      const departmentReuslt = await getPageListData("/department/list", {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentReuslt.data
      const roleReuslt = await getPageListData("/role/list", {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleReuslt.data
      commit("changeEntireDepartment", departmentList)
      commit("changeEntireRole", roleList)
    }
  },
  modules: {
    login,
    system
  }
})

export function setupStore() {
  store.dispatch("login/loadLocalLogin")
  store.dispatch("getInitialDataAction")
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
