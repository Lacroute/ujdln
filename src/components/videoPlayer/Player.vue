<template>
  <div class="player">
    <video ref="video" controls @click="playPause">
      <source ref="sourceMp4" :src="requireVideo(mp4)" type="video/mp4"/>
      <source ref="sourceWebm" :src="requireVideo(webm)" type="video/webm"/>
      <p v-html="noSupport"></p>
    </video>
    <progress-bar :progressEvent="progress"></progress-bar>
    <div class="controls">
      <button v-if="isPaused" @click="playPause" type="button" name="play">PLAY</button>
      <button v-else @click="playPause" type="button" name="pause">PAUSE</button>
    </div>
    <annotation v-for="a in currentEpisode.annotations" :params="a" :progressEvent="progress" :key="a.key"></annotation>
  </div>
</template>

<script>
import ProgressBar from './ProgressBar'
import Annotation from './Annotation'
import bus from '@/bus'
import { VIDEO_ENDED, START_VIDEO, VIDEO_CAN_PLAY_THROUGH } from '@/bus/bus-events'
import { mapGetters } from 'vuex'

export default {
  name: 'Player',
  components: {ProgressBar, Annotation},

  props: {
    sequence: String
  },

  data () {
    return {
      noSupport: 'Votre navigateur ne prend pas en charge la balise video.',
      isPaused: true,
      progress: {
        max: 1,
        value: 0
      }
    }
  },


  computed: {
    ...mapGetters([
      'currentEpisode'
    ]),
    // Helpers to build video filenames.
    mp4 () { return `${this.sequence}.mp4` },
    webm () { return `${this.sequence}.webm` }
  },


  watch: {
    sequence (newVideoFile) {
      console.log('watch', newVideoFile)
      this.$refs.video.load()
    }
  },


  mounted () {
    let v = this.$refs.video
    v.controls = false
    v.onended = this.onEnd

    this.setSources()
    this.initProgress()
    this.setupListener()
    v.load()

    v.addEventListener('canplaythrough', this.canPlayThrough)
    // If the video is in the cache of the browser,
    // the 'canplaythrough' event might have been triggered
    // before we registered the event handler.
    if (v.readyState > 3) {
      console.error('readyState')
      this.canPlayThrough()
    }
  },


  beforeDestroy () {
    this.removeListener()
  },


  methods: {
    // Require the video file on the fly.
    requireVideo (file) { return require(`@/assets/video/${file}`) },


    setupListener () {
      bus.$on(START_VIDEO, this.playPause)
    },


    removeListener () {
      bus.$off(START_VIDEO, this.playPause)
    },


    setSources () {
      this.$refs.sourceMp4.src = this.requireVideo(this.mp4)
      this.$refs.sourceWebm.src = this.requireVideo(this.webm)
      this.$refs.video.load()
    },


    canPlayThrough () {
      bus.$emit(VIDEO_CAN_PLAY_THROUGH)
    },

    // Handle play/pause event.
    playPause () {
      let v = this.$refs.video
      if (v.paused || v.ended) v.play()
      else v.pause()
      this.isPaused = v.paused
    },

    // Dispatch the currentTime of the video to the progress component.
    initProgress () {
      let v = this.$refs.video
      v.addEventListener('loadedmetadata', _ => {
        console.log('loadedmetadata')
        this.progress.max = v.duration
      })
      v.addEventListener('timeupdate', _ => {
        this.progress.value = v.currentTime
      })
    },

    // Fired when the video end.
    onEnd () {
      console.log('VIDEO_ENDED')
      this.isPaused = true
      bus.$emit(VIDEO_ENDED)
    }
  }
}
</script>

<style scoped lang="scss">
.player{
  position: relative;
}
video{
  max-width: 100%;
  display: block;
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
