import MJRequest from "../../index"

enum DashboardAPI {
  amountList = "/goods/amount/list",
  categoryGoodsCount = "/goods/category/count",
  categoryGoodsSale = "/goods/category/sale",
  categoryGoodsFavor = "/goods/category/favor",
  addressGoodsSale = "/goods/address/sale",
  goodsSaleTop10 = "/goods/sale/top10"
}

export function getCategoryGoodsCount() {
  return MJRequest.get({
    url: DashboardAPI.categoryGoodsCount
  })
}

export function getCategoryGoodsSale() {
  return MJRequest.get({
    url: DashboardAPI.categoryGoodsSale
  })
}

export function getCategoryGoodsFavor() {
  return MJRequest.get({
    url: DashboardAPI.categoryGoodsFavor
  })
}

export function getAddressGoodsSale() {
  return MJRequest.get({
    url: DashboardAPI.addressGoodsSale
  })
}

export function getAmountList() {
  return MJRequest.get({
    url: DashboardAPI.amountList
  })
}

export function getGoodsSaleTop10() {
  return MJRequest.get({
    url: DashboardAPI.goodsSaleTop10
  })
}
