import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Intro from './components/Intro'
import Home from './components/Home'

Vue.use(VueRouter)

Vue.transition('fade', {
  enterClass: 'fadeIn',
  leaveClass: 'fadeOut'
})
// Transition Lifecycle
//
// Vue.transition('fade', {
//   beforeEnter: function (el) {
//     console.log('beforeEnter')
//   },
//   enter: function (el) {
//     console.log('enter')
//     el.className += ' fadeIn'
//   },
//   afterEnter: function (el) {
//     console.log('afterEnter')
//   },
//   enterCancelled: function (el) {
//     // handle cancellation
//   },
//   beforeLeave: function (el) {
//     console.log('beforeLeave')
//   },
//   leave: function (el) {
//     console.log('leave')
//     el.className += ' fadeOut'
//     console.log(el)
//   },
//   afterLeave: function (el) {
//     console.log('afterLeave')
//   },
//   leaveCancelled: function (el) {
//     // handle cancellation
//   }
// })

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
    component: Home
  }
})

router.start(App, '#app')
