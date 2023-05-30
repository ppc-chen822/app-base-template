import App from './App'
import store from './store'
import {
  getDictName, getFirstName, isOlder,
  getDictList, getDateTime, getDateFrom,
  getLastName, getContent
} from '@/utils.js'
Vue.prototype.$store = store

// #ifndef VUE3
import Vue from 'vue'
import uView from "uview-ui";
Vue.prototype.imgUrl = 'http://101.200.163.169:9527/digital/app/xixian-user'

Vue.prototype.$getDictName = getDictName
Vue.prototype.$getFirstName = getFirstName
Vue.prototype.$getLastName = getLastName
Vue.prototype.$isOlder = isOlder
Vue.prototype.$getDictList = getDictList
Vue.prototype.$getDateTime = getDateTime
Vue.prototype.$getDateFrom = getDateFrom
Vue.prototype.$getContent = getContent
Vue.prototype.$mainColor = '#227aff'

Vue.use(uView);
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  store,
  ...App
})

require('./config/request.js')(app)
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif