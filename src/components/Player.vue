<template>
  <div class="player">
    <video ref="video" loop controls @click="playPause">
      <source :src="requireVideo(mp4)" type="video/mp4"/>
      <source :src="requireVideo(webm)" type="video/webm"/>
      <p v-html="noSupport"></p>
    </video>
    <progress-bar :progressEvent="progress"></progress-bar>
    <div class="controls">
      <button v-if="isPaused" @click="playPause" type="button" name="play">PLAY</button>
      <button v-else @click="playPause" type="button" name="pause">PAUSE</button>
    </div>
  </div>
</template>

<script>
import ProgressBar from '@/components/ProgressBar'

export default {
  name: 'Player',
  components: {ProgressBar},


  data () {
    return {
      filename: 'sequence',
      noSupport: 'Votre navigateur ne prend pas en charge la balise video.',
      isPaused: true,
      progress: {
        max: 1,
        value: 0
      }
    }
  },


  computed: {
    mp4 () { return `${this.filename}.mp4` },
    webm () { return `${this.filename}.webm` }
  },


  mounted () {
    this.initProgress()
    this.$refs.video.controls = false
    this.playPause()
  },


  methods: {
    requireVideo (file) { return require(`@/assets/${file}`) },


    playPause () {
      let v = this.$refs.video
      if (v.paused || v.ended) v.play()
      else v.pause()
      this.isPaused = v.paused
    },


    initProgress () {
      let v = this.$refs.video
      v.addEventListener('loadedmetadata', _ => { this.progress.max = v.duration })
      v.addEventListener('timeupdate', _ => { this.progress.value = v.currentTime })
    }
  }
}
</script>

<style scoped style="scss">
.player{
  position: relative;
}
video{
  max-width: 100%;
}

/* CONTROLS*/
video::-webkit-media-controls {
  display:none !important;
}
.controls{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
