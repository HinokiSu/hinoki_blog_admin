import { Table, Popconfirm, Modal, Form, FormItem, Input, Button, Card, Menu, MenuItem } from 'ant-design-vue'

const AntUI = [Table, Popconfirm, Modal, Form, FormItem, Input, Button, Card,Menu, MenuItem]

export const AntUIRegister = (instance: any) => AntUI.map((_) => instance.use(_))
