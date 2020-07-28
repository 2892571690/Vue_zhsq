import Vue from 'vue'
import {
    Button,
    Container,
    Header,
    Aside,
    Main,
    MessageBox,
    Message,
    Dialog,
    Slider,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Breadcrumb,
    BreadcrumbItem,
    Menu,
    MenuItem,
    MenuItemGroup,
    Submenu,
    Card,
    Input,
    Table,
    TableColumn,
    Tag,
    Pagination
} from 'element-ui'
Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Dialog)
Vue.use(Slider)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Card)
Vue.use(Input)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tag)
Vue.use(Pagination)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm