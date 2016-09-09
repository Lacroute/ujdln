<template>
  <div class="blackscreen">
    <p>
      {{ blackscreen.text }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Blackscreen',

  data: function () {
    return {
      timerId: null,
      start: 0,
      remaining: 0,
      delay: 0
    }
  },

  props: [
    'blackscreen'
  ],

  computed: {
    wordTime: function(){
      return 400
    }
  },

  ready: function(){
    this.delay = this.blackscreen.text.split(' ').length * this.wordTime
    this.remaining = this.delay

    this.$root.$on('toggle-modal', (isActive) => {
      if(isActive) this.pause()
      else this.resume()
    })

    this.resume()
  },

  methods: {
    pause: function() {
      window.clearTimeout(this.timerId);
      this.remaining -= new Date() - this.start;
    },

    resume: function() {
      this.start = new Date()
      window.clearTimeout(this.timerId)

      this.timerId = window.setTimeout(() => {
        this.$dispatch('end-blackscreen', this.blackscreen)
      }, this.remaining);
    }
  }
}
</script>

<style>

</style>
