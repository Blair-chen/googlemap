import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/compareView',
      name:'compareView',
      component: () => System.import('@/components/compare/compare.vue'),
    },


    {
      path:'/searchView',
      name:'searchView',
      component:() =>System.import('@/components/search/search.vue')
    },
    {
      path:'/menu',
      component:() =>System.import('@/components/test/testMap.vue')
    }
  ]
})
