<template>
  <div class="progress">
    <span ref="bar" class="progress-bar" :style="{width: w}"></span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'GlobalProgress',

  data () {
    return {

    }
  },

  computed: {
    ...mapGetters({
      progress: 'globalProgress'
    }),


    w () {
      return `${Math.floor((this.progress.value / this.progress.max) * 100)}%`
    }
  }
}
</script>

<style scoped lang="scss">
.progress {
  width: 100%;
  height: 10px;
  background-color: transparent;
}
.progress-bar {
  display: block;
  height: 100%;
  background: gold;
  transition: all 750ms ease;
}
</style>
