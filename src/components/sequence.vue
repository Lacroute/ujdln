<template>
  <div class="">
    <video v-el:video class="fullscreen" autoplay controls>
      <source v-bind:src="file_path" type="video/webm"/>
    </video>
  </div>
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
    this.$els.video.onended = () => {
      this.$emit('end-sequence')
    }
  }
}
</script>

<style scoped>
  .fullscreen{
    max-width: 100%;
  }
</style>
