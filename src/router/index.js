import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)


const ifNotAuthenticated = (to, from, next) => {
  if(!localStorage.getItem("user")) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if(localStorage.getItem("user")) {
    next()
    return
  }
  next('/login')
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/detail/:id',
    name: 'DetailProduct',
    component: () => import('../views/DetailProduct.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue'),
    beforeEnter: ifAuthenticated,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
