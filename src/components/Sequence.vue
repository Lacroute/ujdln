<template>
  <div class="sequence">
    <black-screen v-if="showBS || !playerIsReady" :content="bSContent"></black-screen>
    <player :sequence="sequence"></player>
  </div>
</template>

<script>
import Player from '@/components/videoPlayer/Player'
import BlackScreen from '@/components/videoPlayer/BlackScreen'

import bus from '@/bus'
import { VIDEO_ENDED, START_VIDEO, FADE_BLACKSCREEN, VIDEO_CAN_PLAY_THROUGH, SEQUENCE_ENDED } from '@/bus/bus-events'
import { mapGetters } from 'vuex'

export default {
  name: 'Sequence',
  components: {Player, BlackScreen},

  data () {
    return {
      playerIsReady: false,
      showBS: true
    }
  },


  computed: {
    ...mapGetters({
      sequence: 'currentSequence',
      bSContent: 'currentBSContent'
    })
  },

  created () {
    this.setupListener()
  },

  beforeDestroy () {
    this.removeListener()
  },

  methods: {
    setupListener () {
      bus.$on(VIDEO_CAN_PLAY_THROUGH, this.begin)
      bus.$on(FADE_BLACKSCREEN, this.fadeOutBlackScreen)
      bus.$on(VIDEO_ENDED, this.nextSequence)
    },


    removeListener () {
      bus.$off(VIDEO_CAN_PLAY_THROUGH, this.begin)
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
      bus.$emit(SEQUENCE_ENDED)
    }
  }
}
</script>

<style lang="scss">
</style>
