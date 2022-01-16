import { useStore } from "@/store"

export function usePermission(pageName: string, handleName: string) {
  const store = useStore()
  const permissions = store.state.login.permissions
  const verfyPermission = `system:${pageName}:${handleName}`
  return !!permissions.find((item) => item === verfyPermission)
}
