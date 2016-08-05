<template>
  <video class="fullscreen" autoplay>
    <source v-bind:src="file_path" type="video/webm"/>
  </video>
</template>

<script>
export default {
  name: 'Sequence',

  computed: {
    file_path: function(){
      return this.$root.vid_cache[this.$route.name].src
    }
  },

  ready: function(){
    let that = this

    this.$el.addEventListener('ended', function(){
      that.$dispatch('end-sequence')
    }, false)
  }
}
</script>

<style scoped>

</style>
