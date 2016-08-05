<template>
  <div v-if="begin">
    <blackscreen v-for="blackscreen in bs" :blackscreen="blackscreen" @end-blackscreen="removeBlackscreen">
  </div>
  <div v-else>
    <h1>INTRO</h1>
    <sequence @end-sequence="nextSequence"></sequence>
    <a v-link="{ path: '/home' }">Continue to Home</a>
  </div>
</template>

<script>
import Blackscreen from './Blackscreen.vue'
import Sequence from './Sequence.vue'

export default {
  name: 'Intro',
  components: {Blackscreen, Sequence},

  data () {
    return {
      begin: true,
      bs: [],
      seq: []
    }
  },

  ready: function(){
    this.bs.push({text: "Texte d'introduction de la première séquence."});
  },

  methods: {
    removeBlackscreen: function(blackscreen){
      this.bs.$remove(blackscreen);
      this.begin = false;
    },

    nextSequence: function(){
      console.log('end-sequence')
    }
  }
}
</script>
