import MJRequest from "../../index"

export function getPageListData(url: string, queryInfo: any) {
  return MJRequest.post({
    url: url,
    data: queryInfo
  })
}
