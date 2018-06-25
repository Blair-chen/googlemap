import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/helloworld',
      component: () => System.import('@/components/HelloWorld'),
    },
    {
      path: '/googleMapTest',
      component: () => System.import('@/components/google-map/GoogleMap.vue'),
    },
    {
      path : '/polyline',
      component: () => System.import('@/components/google-map/Polyline.vue'),
    },{
      path: '/ploygon',
      component: () => System.import('@/components/google-map/ploygon.vue'),
    },{
      path: '/circle',
      component: () => System.import('@/components/google-map/cIrcle.vue'),
    },{
      path: '/infoWindow',
      component: () => System.import('@/components/google-map/infoWindowTest.vue'),
    },{
      path: '/maptest',
      component: () => System.import('@/components/google-map/testMap.vue'),
    },{
      path: '/search',
      component: () => System.import('@/components/google-map/searchTest.vue'),
    },{
      path: '/geolocation',
      component: () => System.import('@/components/google-map/geolocation.vue'),
    },{
      path: '/ploylineInfoWindow',
      component: () => System.import('@/components/google-map/ploylineInfoWindow.vue'),
    },{
      path:'/infoWindowTest',
      component: () => System.import('@/components/google-map/lastInfoWindow.vue'),
    }

  ]
})
