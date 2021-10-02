import Vue from 'vue'
import './styles/main.css'
import './styles/vue-fullpage.css'
import store from './store/index'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import Carousel from 'vue-carousel';
import VueFullPage from 'vue-fullpage.js'
import './registerServiceWorker'

Vue.use(Carousel)
Vue.use(VueFullPage)
Vue.use(VueCookies)
Vue.config.productionTip = false
Vue.$cookies.config('7d')

let routes = {
      '/': () => import('@/views/Home'),
      '/items': () => import('@/views/Items'),
      '/item': () => import('@/views/Item'),
      '/checkout': () => import('@/views/Checkout'),
      '/login': () => import('@/views/Login'),
      '/solitaireLD': () => import('@/views/Solitaire'),
      '/wholesale': () => import('@/views/wholesale'),
      '/mycart': () => import('@/views/MyCart'),
      '/reset': () => import('@/views/Forgot'),
      '/myorders': () => import('@/views/MyOrders')
    }
new Vue({
  store,
  provide: {
    axios
  },
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || 'NotFound'
    }
  },
  render: function(h) { return h(this.ViewComponent)},
}).$mount('#app')
