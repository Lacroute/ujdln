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

  data () {
    return {
      ended: false
    }
  },

  computed: {
    file_path: function () {
      return this.$root.vid_cache[this.$route.name].src
    }
  },

  ready: function () {
    this.$els.video.onended = () => {
      this.ended = true
      bus.$emit('end-sequence')
    }

    // this.$els.video.addEventListener('timeupdate', () => {
      // this.$dispatch('global-progress', this.$els.video.currentTime)
    // })

    // Handle modal events
    bus.$on('toggle-modal', (isActive) => {
      if(this.ended) return

      if(isActive) this.$els.video.pause()
      else this.$els.video.play()
    })
  }
}
</script>

<style scoped>
  .fullscreen{
    max-width: 100%;
  }
</style>
