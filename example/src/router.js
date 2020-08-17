import Vue from 'vue'
import VueRouter from 'vue-router'
import { routeImport } from 'tiny-import'

Vue.use(VueRouter)

const routes = routeImport.importRoute({
  context: require.context('./views'),
  root: 'Form'
})

const router = new VueRouter({
  routes
})

export default router
