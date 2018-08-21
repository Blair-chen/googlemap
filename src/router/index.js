import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      component:()=>System.import ('@/components/menu/mainMebu.vue')
    },
    {
      path: '/compareView',
      name:'compareView',
      component: () => System.import('@/components/compare/compare.vue'),
    },
    {
      path:'/compare',
      component:()=>System.import('@/components/menu/graph/graphCompare.vue')
    },{
      path:'/search',
      component:()=>System.import ('@/components/menu/graph/graphSpeed.vue')
    },
    {
      path:'/searchView',
      name:'searchView',
      component:() =>System.import('@/components/search/search.vue')
    },
    {
      path:'/menu',
      component:() =>System.import('@/components/test/table.vue')
    }
  ]
})
