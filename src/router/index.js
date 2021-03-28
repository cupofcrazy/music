import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/discover',
    name: 'Discover',
    component: () => import(/* webpackChunkName: "discover" */ '../views/Discover.vue'),
    meta: {
      requiresAuth: true,
      hideNavigation: true
    },
    children: [
      { path: 'top-tracks', name: 'TopTracks',  component: () => import(/* webpackChunkName: "top-tracks" */ '../views/TopTracks.vue') },
      { path: 'top-albums', name: 'TopAlbums',  component: () => import(/* webpackChunkName: "top-albums" */ '../views/TopAlbums.vue') },
      { path: 'top-artists', name: 'TopArtists',  component: () => import(/* webpackChunkName: "top-artists" */ '../views/TopArtists.vue') },
      { path: 'recently-played', name: 'RecentTracks',  component: () => import(/* webpackChunkName: "top-artists" */ '../views/RecentTracks.vue') }
    ],
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.isLoggedIn) {
      next({ name: 'Home' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
