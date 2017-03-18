import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Theater from '@/components/Theater'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/story/:routeEpisodeId',
      name: 'story',
      component: Theater,
      props: true
      // children: [
      //   {path: ':name', component: Theater, props: true}
      // ]
    }
  ]
})
