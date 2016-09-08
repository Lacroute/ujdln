<template>
  <div>
    <div class="wrapper">
      <h1><strong>Un jour</strong>dans la nuit</h1>
      <div class="presentation">
        <p>Un webdocumentaire d'Amandine Sanial et Clément Procureur</p>
      </div>
      <continue msg="Commencer l'expérience" target="/home"></continue>
    </div>
  </div>
</template>

<script>
import Continue from './Continue.vue'

export default {
  name: 'Intro',
  components: {Continue}
}
</script>

<style scoped>
  .wrapper *{
    transition: color 1s;
  }
  h1{
    text-transform: uppercase;
    font-size: 7em;
  }
  h1 strong{
    font-size: 1.6em;
    display: block;
  }
  .fadeOut > .wrapper *{
    color: #FF4136;
  }
</style>
