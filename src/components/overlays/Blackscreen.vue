<template>
  <div class="blackscreen">
    <p>
      {{ blackscreen.text }}
    </p>
  </div>
</template>

<script>
import Overlay from 'assets/mixins/Overlay.js'

export default {
  name: 'Blackscreen',

  data: function () {
    return {
      timerId: null,
      remaining: 0,
    }
  },

  props: [
    'blackscreen'
  ],

  mixins: [Overlay],

  ready: function () {
    this.time.duration = this.blackscreen.text.split(' ').length * this.wordTime
    this.remaining = this.time.duration

    bus.$on('toggle-modal', (isActive) => {
      if(isActive) this.pause()
      else this.resume()
    })

    this.resume()
  },

  methods: {

    pause: function () {
      window.clearTimeout(this.timerId)
      this.remaining -= new Date() - this.time.start
    },

    resume: function () {
      this.time.start = new Date()
      window.clearTimeout(this.timerId)

      this.timerId = window.setTimeout(
        () => this.$dispatch('end-blackscreen', this.blackscreen),
        this.remaining
      )
    }
  }
}
</script>

<style>

</style>
