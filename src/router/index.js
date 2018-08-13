import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/compare',
      component: () => System.import('@/components/compare/compare.vue'),
    },
    {
      path:'/search',
      component:() =>System.import('@/components/search/search.vue')
    },
    {
      path:'/menu',
      component:() =>System.import('@/components/test/testMap.vue')
    }
  ]
})
