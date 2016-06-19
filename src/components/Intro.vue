<template>
  <div v-if="begin">
    <blackscreen v-for="blackscreen in bs" :blackscreen="blackscreen" @end-blackscreen="removeBlackscreen">
  </div>
  <div v-else>
    <h1>INTRO</h1>
    <a v-link="{ path: '/home' }">Continue to Home</a>
  </div>
</template>

<script>
import Blackscreen from './Blackscreen.vue'

export default {
  name: 'Intro',
  components: {Blackscreen},

  data () {
    return {
      begin: true,
      bs: []
    }
  },

  ready: function(){
    this.bs.push({text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'});
  },

  methods: {
    removeBlackscreen: function(blackscreen){
      this.bs.$remove(blackscreen);
      this.begin = false;
    }
  }
}
</script>
