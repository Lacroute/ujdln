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
    file_path: function () {
      return this.$root.vid_cache[this.$route.name].src
    }
  },

  ready: function () {
    this.$els.video.onended = () => this.$emit('end-sequence')

    this.$els.video.addEventListener('timeupdate', () => {
      console.log(this.$els.video.currentTime);
      this.$dispatch('global-progress', this.$els.video.currentTime)
    })

    // Handle modal events
    this.$root.$on('toggle-modal', (isActive) => {
      if(isActive) this.$els.video.pause()
      else this.$els.video.play()
    })

    this.$root.$on('end-sequence', () => {
      console.log('end-sequence from sequence')
    })
  }
}
</script>

<style scoped>
  .fullscreen{
    max-width: 100%;
  }
</style>
