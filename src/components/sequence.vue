<template>
  <div class="">
    <video v-el:video class="fullscreen" autoplay>
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

    // Handle modal events
    let that = this
    this.$root.$on('toggle-modal', function (isActive) {
      if(isActive) that.$els.video.pause()
      else that.$els.video.play()
    })
  }
}
</script>

<style scoped>
  .fullscreen{
    max-width: 100%;
  }
</style>
