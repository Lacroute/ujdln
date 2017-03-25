<template>
  <div :class="classObject" @click="choose(videoFile)" :style="{background: cover}">
    <p>{{ question }}</p>
  </div>
</template>
<script>
import bus from '@/bus'
import { CHOOSE_VIDEO } from '@/bus/bus-events'
export default {
  name: 'Question',

  props: {
    question: {
      type: String
    },
    cover: {
      type: String
    },
    index: {
      type: Number
    },
    videoFile: {
      type: String
    }
  },

  data () {
    return {
      viewed: false
    }
  },

  computed: {
    classObject () {
      return {
        choice: true,
        choosed: this.viewed
      }
    }
  },

  methods: {
    choose (videoFile) {
      bus.$emit(CHOOSE_VIDEO, videoFile)
      this.viewed = true
    }
  }
}
</script>
<style>
.choice{
  position: relative;
}
.choice::before{
  content: ' ';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .3) 50%, rgba(0, 0, 0, .7) 95%);
}
.choice.choosed::after{
  content: ' ';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .7);
}
</style>
