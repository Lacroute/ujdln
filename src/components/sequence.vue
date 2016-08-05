<template>
  <video class="fullscreen" autoplay loop>
    <source v-bind:src="file_path" type="video/webm"/>
  </video>
</template>

<script>
export default {
  name: 'Sequence',

  computed: {
    file_path: function(){
      return "./static/" + this.$route.name + "/video/sequence.webm"
    }
  },

  ready: function(){
    console.log(this.$route.name)
  }
}
</script>

<style scoped>

</style>
