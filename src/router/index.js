import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Category from '../views/Category.vue'
import Login from '../views/Login.vue'
import ProductList from '../views/ProductList.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Cart from '../views/Cart.vue'

import UserRoute from './modules/user';


const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        index: 1
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        index: 1
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About, 
      meta: {
        index: 2
      }
    },
    {
      path: '/category',
      name: 'category',
      component: Category,
      meta: {
        index: 1
      }
    },
    {
      path: '/product-list',
      name: 'product-list',
      meta: {
        index: 2
      },
      component: ProductList
    },
    {
      path: '/product/:id',
      name: 'product',
      meta: {
        index: 3
      },
      component: ProductDetail
    },
    {
      path: '/cart',
      name: 'cart',
      meta: {
        index: 1
      },
      component: Cart
    },
    ...UserRoute
  ]
})

export default router