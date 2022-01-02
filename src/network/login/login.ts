import MJRequest from "../index"
import { IAccount, IDataType, ILoginResult } from "./type"

enum LoginAPI {
  AccountLogin = "./login",
  LoginUserInfo = "/users/",
  UserMenus = "/role/"
}

export function accountLoginRequeest(account: IAccount) {
  return MJRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return MJRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id
  })
}

export function requestUserMenusByRoleId(id: number) {
  return MJRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + "/menu"
  })
}
