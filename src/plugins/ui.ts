import {
  GridGroup,
  Grid,
  Card,
  Select,
  SelectOption,
  Modal,
  Breadcrumbs,
  BreadcrumbsItem,
  Input,
  Button,
  Dot,
  Drawer,
  Switch,
  Form,
  FormItem,
  Toast,
  Pagination,
  Tabs,
  Tab,
  Spacer,
} from '@fect-ui/vue'
// fe-image need rename,because naming collision
// Image.name = 'feImg'

import '@fect-ui/vue/lib/main.css'
import '@fect-ui/themes'

const UI = [
  GridGroup,
  Grid,
  Card,
  Select,
  SelectOption,
  Modal,
  Breadcrumbs,
  BreadcrumbsItem,
  Input,
  Button,
  Dot,
  Drawer,
  Switch,
  Form,
  FormItem,
  Toast,
  Pagination,
  Tabs,
  Tab,
  Spacer,
]

export const UIRegister = (instance: any) => UI.map((_) => instance.use(_))
