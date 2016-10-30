import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Intro from './components/Intro'
import Episode from './components/Episode'

window.bus = new Vue()

Vue.use(VueRouter)

Vue.transition('fade', {
  enterClass: 'fadeIn',
  leaveClass: 'fadeOut'
})

/* eslint-disable no-new */
var router = new VueRouter({
  history: false,
  root: '/'
})

router.map({
  '/intro': {
    name: 'intro',
    component: Intro
  },
  '/home': {
    name: 'home',
    component: Episode
  }
})

router.start(App, '#app')
