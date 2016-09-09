<template>
  <div>
    <div v-if="begin" transition="fade" class="animated" transition-mode="out-in" v-el:test>
      <blackscreen
          v-for="blackscreen in bs"
          :blackscreen="blackscreen"
          @end-blackscreen="removeBlackscreen">
      </blackscreen>
    </div>

    <div v-if="next" transition="fade" class="animated">
      <sequence @end-sequence="nextSequence"></sequence>

      <div v-if="end" transition="fade" class="animated">
        <continue msg="Go back to Intro" target="/intro"></continue>
      </div>
    </div>
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
      next: false,
      end: false,
      bs: []
    }
  },

  ready: function(){
    this.bs.push({text: "Texte d'introduction de la seconde séquence."});
  },

  methods: {
    removeBlackscreen: function(blackscreen){
      let animations = ['animationend', 'webkitAnimationEnd', 'oAnimationEnd', 'MSAnimationEnd']

      animations.forEach( (anim) => {
          this.$els.test.addEventListener(anim, () => {
            this.next = true;
          }, false)
      })

      this.begin = false;
    },

    nextSequence: function(){
      this.end = true
    }
  }
}
</script>
