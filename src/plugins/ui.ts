import {
  GridGroup,
  Grid,
  Card,
  Select,
  SelectOption,
  Modal,
  Breadcrumbs,
  BreadcrumbsItem,
  Collapse,
  Input,
  Button,
  Dot,
  Drawer,
  Switch,
  CollapseGroup,
  Form,
  FormItem,
  Toast,
  Pagination,
} from '@fect-ui/vue'
// fe-image need rename,because naming collision
// Image.name = 'feImg'

import '@fect-ui/vue/lib/main.css'

const UI = [
  GridGroup,
  Grid,
  Card,
  Select,
  SelectOption,
  Modal,
  Breadcrumbs,
  BreadcrumbsItem,
  Collapse,
  Input,
  Button,
  Dot,
  Drawer,
  Switch,
  CollapseGroup,
  Form,
  FormItem,
  Toast,
  Pagination,
]

export const UIRegister = (instance: any) => UI.map((_) => instance.use(_))
