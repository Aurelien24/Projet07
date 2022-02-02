import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Sign from '../views/Sign.vue'
import Param from '../views/Param.vue'
import PostId from '../views/PostId.vue'

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
  },
  {
    path: '/post/:id',
    name: 'PostId',
    component: PostId,
    //params: id
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

console.log(routes.path + ' bubu')

router.beforeEach((to, from, next) => {
  if(window.sessionStorage.token){

    if ((to.name == 'Login' || to.name == 'Sign')) next({ name: 'Home' })
    else next()

  } else {

    if ((to.name !== 'Login' && to.name !== 'Sign')) next({ name: 'Login' }) 
    else next()
  }
})

/*function postId (route) {
  postId = post.id;
}*/

export default router
