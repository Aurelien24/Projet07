import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Sign from '../views/Sign.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
    // Devras réorienter vers Login tout les non connecter
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/sign',
    name: 'Sign',
    component: Sign
  }
]

/* POUR LE ROUTES DYNAMIQUE

const router = new VueRouter({
  routes: [
      // les parties dynamiques commencent par un deux-points
      { path: '/item/:name', component: ItemDetail }
  ]
})*/

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
