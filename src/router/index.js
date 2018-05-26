import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import Homepage from '@/page/homepage'
import Shopinfo from '@/page/shopinfo'
import Register from '@/page/register'
import Usermanage from '@/page/usermanage'
import Mygoods from '@/page/mygoods'
import Addgoods from '@/page/addgoods'
import Shopcart from '@/page/shopcart'
import Buynow from '@/page/buynow'
import Salenow from '@/page/salenow'
import Buyhistory from '@/page/buyhistory'
import Salehistory from '@/page/salehistory'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base:'/flea-market',
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/homepage',
      component: Homepage
    },
    {
      path: '/shopinfo',
      component: Shopinfo
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/usermanage',
      component: Usermanage
    },
    {
      path: '/mygoods',
      component: Mygoods
    },
    {
      path: '/addgoods',
      component: Addgoods
    },
    {
      path: '/shopcart',
      component: Shopcart
    },
    {
      path: '/buynow',
      component: Buynow
    },
    {
      path: '/salenow',
      component: Salenow
    },
    {
      path: '/buyhistory',
      component: Buyhistory
    },
    {
      path: '/salehistory',
      component: Salehistory
    }
  ]
})
