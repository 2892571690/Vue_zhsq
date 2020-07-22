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
    Slider
} from 'element-ui'
Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Dialog)
Vue.use(Slider)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm