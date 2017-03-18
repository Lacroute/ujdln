<template>
  <div id="black-screen">
    <p>{{ content }}</p>
  </div>
</template>

<script>
import bus from '@/bus'
import { FADE_BLACKSCREEN } from '@/bus/bus-events'
export default {
  name: 'BlackScreen',

  props: {
    content: String
  },

  data () {
    return {}
  },

  computed: {
    lifeTime () {
      return this.content.split(' ').length * 100
    }
  },

  created () {
    setTimeout(_ => {
      bus.$emit(FADE_BLACKSCREEN)
    }, this.lifeTime)
  }
}
</script>

<style lang="scss">
#black-screen{
  background: black;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    color: white;
  }
}
</style>
