import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Theater from '@/components/Theater'
import Sequence from '@/components/Sequence'
import Crossroad from '@/components/Crossroad'
import Choice from '@/components/Choice'
import End from '@/components/End'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/story',
      name: 'story',
      component: Theater,
      props: true,
      children: [
        {path: 'sequence/:routeEpisodeId', name: 'sequence', component: Sequence},
        {path: 'crossroad/:routeEpisodeId', name: 'crossroad', component: Crossroad},
        {path: 'choice/:routeEpisodeId', name: 'choice', component: Choice},
        {path: 'the/:routeEpisodeId', name: 'end', component: End}
      ]
    }
  ]
})
