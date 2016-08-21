<template>
  <div v-if="begin">
    <blackscreen v-for="blackscreen in bs" :blackscreen="blackscreen" @end-blackscreen="removeBlackscreen">
  </div>
  <div v-else>
    <sequence @end-sequence="nextSequence"></sequence>
    <continue msg="Go back to Intro" target="/intro"></continue>
  </div>
</template>

<script>
import Blackscreen from './Blackscreen.vue'
import Sequence from './Sequence.vue'
import Continue from './Continue.vue'

export default {
  name: 'Home',

  components: {Blackscreen, Sequence, Continue},

  data () {
    return {
      begin: true,
      bs: [],
      seq: []
    }
  },

  ready: function(){
    this.bs.push({text: "Texte d'introduction de la seconde séquence."});
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
