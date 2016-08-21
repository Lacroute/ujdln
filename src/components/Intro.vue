<template>
  <h1><strong>Un jour</strong>dans la nuit</h1>
  <div class="presentation">
    <p>Un webdocumentaire d'Amandine Sanial et Clément Procureur</p>
  </div>
  <continue msg="Commencer l'expérience" target="/home"></continue>
</template>

<script>
import Continue from './Continue.vue'

export default {
  name: 'Intro',
  components: {Continue},

  data () {
    return {
    }
  },

  ready: function(){
  }
}
</script>

<style scoped>
h1{
  text-transform: uppercase;
  font-size: 7em;
}
h1 strong{
  font-size: 1.6em;
  display: block;
}
</style>
