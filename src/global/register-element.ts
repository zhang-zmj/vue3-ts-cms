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
  ElTree,
  ElCard,
  ElDescriptions,
  ElTooltip
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
  ElTree,
  ElCard,
  ElDescriptions,
  ElTooltip
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

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
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
