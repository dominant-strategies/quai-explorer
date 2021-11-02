import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _fc7e77de = () => interopDefault(import('../pages/blocks.vue' /* webpackChunkName: "pages/blocks" */))
const _8da81b46 = () => interopDefault(import('../pages/chains.vue' /* webpackChunkName: "pages/chains" */))
const _49caa59a = () => interopDefault(import('../pages/network.vue' /* webpackChunkName: "pages/network" */))
const _2b7cfdd2 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/blocks",
    component: _fc7e77de,
    name: "blocks"
  }, {
    path: "/chains",
    component: _8da81b46,
    name: "chains"
  }, {
    path: "/network",
    component: _49caa59a,
    name: "network"
  }, {
    path: "/",
    component: _2b7cfdd2,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
