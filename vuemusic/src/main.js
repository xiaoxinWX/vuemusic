import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import fastclick from 'fastclick'
import 'common/stylus/index.styl'
import VueLazyLoad from 'vue-lazyload'

fastclick.attach(document.body)
Vue.use(VueLazyLoad,{
    loading:require('common/image/default.png')
})
new Vue({
    el:'#app',
    router,
    store,
    render: h=> h(App)
})