import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Intro from './components/Intro'
import Home from './components/Home'

Vue.use(VueRouter);

/* eslint-disable no-new */
var router = new VueRouter({
   history: false,
   root: '/'
});

router.map({
    '/intro': {
        component: Intro
    },
    '/home': {
        component: Home
    }
});


router.start(App, '#app')
