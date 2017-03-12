<template>
  <div class="progress">
    <span ref="bar" class="progress-bar" :style="{width: w}"></span>
  </div>
</template>

<script>

export default{
  name: 'ProgressBar',

  props: {
    progressEvent: Object
  },

  computed: {
    w () {
      return `${Math.floor((this.progressEvent.value / this.progressEvent.max) * 100)}%`
    }
  }
}

</script>

<style scoped style="scss">
.progress {
  width: 100%;
  height: 4px;
  background-color: #eee;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
}
.progress-bar {
  display: block;
  height: 100%;
  background: red;
  transition: all 250ms ease;
}
</style>
