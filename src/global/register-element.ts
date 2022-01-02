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
  ElMenuItemGroup
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
  ElMenuItemGroup
]

import { Iphone, Avatar, Expand, Fold } from "@element-plus/icons-vue"

const Icons = [Iphone, Avatar, Expand, Fold]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }

  for (const icon of Icons) {
    app.component(icon.name, icon)
  }
}
