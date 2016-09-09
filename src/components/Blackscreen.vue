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
    let that = this
    this.delay = this.blackscreen.text.split(' ').length * this.wordTime
    this.remaining = this.delay
    
    this.$root.$on('toggle-modal', function (isActive) {
      if(isActive) that.pause()
      else that.resume()
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

      let that = this
      this.timerId = window.setTimeout(function(){
        that.$dispatch('end-blackscreen', that.blackscreen)
      }, this.remaining);
    }
  }
}
</script>

<style>

</style>
