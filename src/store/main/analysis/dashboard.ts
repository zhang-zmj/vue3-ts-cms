import { Module } from "vuex"
import { IDashboardState } from "./types"
import { IRootState } from "../../type"
import {
  getAmountList,
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale,
  getGoodsSaleTop10
} from "@/network/main/analysis/dashboard"

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsFavor: [],
      categoryGoodsSale: [],
      addressGoodsSale: [],
      goodsSaleTop10: [],
      topPanelDatas: []
    }
  },
  mutations: {
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list
    },
    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list
    },
    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list
    },
    changeAddressGoodsSale(state, list) {
      state.addressGoodsSale = list
    },
    changeTopPanelDatas(state, list) {
      state.topPanelDatas = list
    },
    changeGoodsSaleTop10(state, list) {
      state.goodsSaleTop10 = list
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const categoryCountResult = await getCategoryGoodsCount()
      commit("changeCategoryGoodsCount", categoryCountResult.data)
      const categorySaleResult = await getCategoryGoodsSale()
      commit("changeCategoryGoodsSale", categorySaleResult.data)
      const categoryFavorResult = await getCategoryGoodsFavor()
      commit("changeCategoryGoodsFavor", categoryFavorResult.data)
      const addressGoodsResult = await getAddressGoodsSale()
      commit("changeAddressGoodsSale", addressGoodsResult.data)
      const resultTopPanelDatas = await getAmountList()
      commit("changeTopPanelDatas", resultTopPanelDatas.data)
      const saleTop10 = await getGoodsSaleTop10()
      commit("changeGoodsSaleTop10", saleTop10.data)
    }
  }
}

export default dashboardModule
