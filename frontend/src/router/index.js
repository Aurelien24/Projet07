import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Sign from '../views/Sign.vue'
import Param from '../views/Param.vue'

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
  },
  {
    path: '/param',
    name: 'Param',
    component: Param
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



//if (router.routes !== 'Login'){
//  console.log(window.location)
//}

console.log(routes.path + ' bubu')

//if(window.location == 'http://localhost:8080/#/'){ //window.location == 'http://localhost:8080/#/' router.routes == 'Home' router == 'Home' routes == 'Home'

  //console.log(router.routes.path + 'bubu')

  router.beforeEach((to, from, next) => {
    if(window.sessionStorage.token){

      if ((to.name == 'Login' || to.name == 'Sign')) next({ name: 'Home' })
      else next()

    } else {

      if ((to.name !== 'Login' && to.name !== 'Sign')) next({ name: 'Login' }) 
      else next()
    }
  })

//}

//console.log(isAuthenticated)




export default router
