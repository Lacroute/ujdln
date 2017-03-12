import Vue from 'vue'
import Router from 'vue-router'
import Theater from '@/components/Theater'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Sequence',
      component: Theater
    }
  ]
})
