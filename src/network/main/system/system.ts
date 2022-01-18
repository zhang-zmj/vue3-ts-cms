import { IDataType } from "@/network/login/type"
import MJRequest from "../../index"

export function getPageListData(url: string, queryInfo: any) {
  return MJRequest.post({
    url: url,
    data: queryInfo
  })
}

// url: /users/id
export function deletePageData(url: string) {
  return MJRequest.delete<IDataType>({
    url: url
  })
}

export function createPageData(url: string, newData: any) {
  return MJRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, newData: any) {
  return MJRequest.patch<IDataType>({
    url: url,
    data: newData
  })
}
