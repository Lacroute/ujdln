<template>
  <div v-if="begin">
    <blackscreen v-for="blackscreen in bs" :blackscreen="blackscreen" @end-blackscreen="removeBlackscreen">
  </div>
  <div v-else>
    <h1>HOME</h1>
    <sequence></sequence>
    <a v-link="{ path: '/intro' }">Go back to Intro</a>
  </div>
</template>

<script>
import Blackscreen from './Blackscreen.vue'
import Sequence from './Sequence.vue'

export default {
  name: 'Home',

  components: {Blackscreen, Sequence},

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
    }
  }
}
</script>
