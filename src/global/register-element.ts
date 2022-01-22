import { App } from "vue"
import "element-plus/dist/index.css"
import {
  ElButton,
  ElCheckbox,
  ElForm,
  ElFormItem,
  ElInput,
  ElLink,
  ElRadio,
  ElTabPane,
  ElTabs,
  ElIcon,
  ElAside,
  ElHeader,
  ElMain,
  ElContainer,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElDropdown,
  ElDropdownItem,
  ElDescriptionsItem,
  ElAvatar,
  ElRow,
  ElCol,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElDropdownMenu,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElImage,
  ElDialog,
  ElTree
} from "element-plus/lib/components"

const components = [
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
  ElTabs,
  ElTabPane,
  ElCheckbox,
  ElLink,
  ElIcon,
  ElAside,
  ElHeader,
  ElMain,
  ElContainer,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElDropdown,
  ElDropdownItem,
  ElDescriptionsItem,
  ElAvatar,
  ElRow,
  ElCol,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElDropdownMenu,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElImage,
  ElDialog,
  ElTree
]

import {
  Iphone,
  Avatar,
  Expand,
  Fold,
  ArrowDown,
  Close,
  Refresh,
  Search,
  Edit,
  Delete
} from "@element-plus/icons-vue"
import { ElConfigProvider } from "element-plus"

// const Icons = [
//   Iphone,
//   Avatar,
//   Expand,
//   Fold,
//   ArrowDown,
//   Close,
//   Refresh,
//   Search,
//   Edit,
//   Delete
// ]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }

  // for (const icon of Icons) {
  //   app.component(icon.name, icon)
  // }
}

export {
  Iphone,
  Avatar,
  Expand,
  Fold,
  ArrowDown,
  Close,
  Refresh,
  Search,
  Edit,
  Delete
}
