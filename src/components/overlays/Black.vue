<template>
  <div class="black">
    <p>
      {{ black.text }}
    </p>
  </div>
</template>

<script>
import Overlay from '~assets/mixins/Overlay.js'

export default {
  name: 'Black',

  data: function () {
    return {
      timerId: null,
      start: 0,
      remaining: 0,
      delay: 0
    }
  },

  props: [
    'black'
  ],

   mixins: [Overlay]

  computed: {
    wordTime: function () {
      return 400
    }
  },

  ready: function () {
    console.log('this.time', this.time);
    console.log('this.end', this.end);

    this.delay = this.black.text.split(' ').length * this.wordTime
    this.remaining = this.delay

    bus.$on('toggle-modal', (isActive) => {
      if(isActive) this.pause()
      else this.resume()
    })

    this.resume()
  },

  methods: {
    pause: function () {
      window.clearTimeout(this.timerId)
      this.remaining -= new Date() - this.start
    },

    resume: function () {
      this.start = new Date()
      window.clearTimeout(this.timerId)

      this.timerId = window.setTimeout(
        () => this.$dispatch('end-black', this.black),
        this.remaining
      )
    }
  }
}
</script>

<style>

</style>
