<template>
  <div class="theater">
    <header>
      <global-progress></global-progress>
      <h1>{{title}}</h1>
    </header>

    <section class="scene" :style="{minHeight: minHeightPlayer}">
      <black-screen v-if="showBS || !playerIsReady" :content="bSContent"></black-screen>
      <player :sequence="sequence"></player>
    </section>
  </div>
</template>

<script>
import GlobalProgress from '@/components/GlobalProgress'
import Player from '@/components/videoPlayer/Player'
import BlackScreen from '@/components/videoPlayer/BlackScreen'

import bus from '@/bus'
import { VIDEO_ENDED, START_VIDEO, FADE_BLACKSCREEN, VIDEO_CAN_PLAY_THROUGH } from '@/bus/bus-events'
import { mapGetters, mapMutations } from 'vuex'
import * as types from '@/store/mutation-types'

export default {
  name: 'Theater',
  components: {GlobalProgress, Player, BlackScreen},

  props: {
    routeEpisodeId: {
      type: String,
      default: '0'
    }
  },

  data () {
    return {
      playerIsReady: false,
      showBS: true,
      aspectRatio: 0
    }
  },


  computed: {
    ...mapGetters({
      progress: 'globalProgress',
      episodeType: 'currentEpisodeType',
      title: 'currentTitle',
      sequence: 'currentSequence',
      bSContent: 'currentBSContent'
    }),

    minHeightPlayer () {
      return `${this.aspectRatio}px`
    }
  },


  created () {
    this.setupListener()
    this.setupEpisode(this.routeEpisodeId)
  },

  mounted () {
    this.aspectRatio = document.documentElement.clientWidth * 9 / 16
  },

  beforeDestroy () {
    this.removeListener()
  },


  methods: {
    ...mapMutations({
      setupEpisode: types.SETUP_EPISODE,
      nextEpisode: types.NEXT_EPISODE
    }),


    setupListener () {
      bus.$on(VIDEO_CAN_PLAY_THROUGH, this.begin)
      // bus.$on(START_SEQUENCE, this.fadeInBlackScreen)
      bus.$on(FADE_BLACKSCREEN, this.fadeOutBlackScreen)
      bus.$on(VIDEO_ENDED, this.nextSequence)
    },


    removeListener () {
      bus.$off(VIDEO_CAN_PLAY_THROUGH, this.begin)
      // bus.$off(START_SEQUENCE, this.fadeInBlackScreen)
      bus.$off(FADE_BLACKSCREEN, this.fadeOutBlackScreen)
      bus.$off(VIDEO_ENDED, this.nextSequence)
    },


    begin () {
      console.log(VIDEO_CAN_PLAY_THROUGH)
      if (!this.playerIsReady) {
        this.playerIsReady = true
        if (!this.showBS) bus.$emit(START_VIDEO)
      }
    },


    fadeInBlackScreen () {
      this.showBS = true
      this.playerIsReady = false
    },


    fadeOutBlackScreen () {
      this.showBS = false
      if (this.playerIsReady) bus.$emit(START_VIDEO)
    },

    nextSequence () {
      if (this.episodeType === 'sequence') {
        this.nextEpisode()
        this.fadeInBlackScreen()
      }
      if (this.episodeType === 'crossroad') {

      }
    }
  }
}
</script>

<style lang="scss">
.scene {
  position: relative;

}
</style>
