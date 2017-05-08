<template>
  <div class="theater">
    <section class="scene" :style="{maxHeight: minHeightPlayer}">
      <router-view :key="routeEpisodeId"></router-view>
    </section>

    <div class="overlay">
      <div class="wrapper-overlay">
        <h1>{{ $t(title) }}</h1>
        <global-progress></global-progress>
        <scene-controls></scene-controls>
      </div>
    </div>
  </div>
</template>

<script>
import GlobalProgress from '@/components/GlobalProgress'
import Player from '@/components/videoPlayer/Player'
import BlackScreen from '@/components/videoPlayer/BlackScreen'
import SceneControls from '@/components/SceneControls'

import bus from '@/bus'
import { SEQUENCE_ENDED } from '@/bus/bus-events'
import { mapGetters, mapMutations } from 'vuex'
import * as types from '@/store/mutation-types'

export default {
  name: 'Theater',
  components: {GlobalProgress, Player, BlackScreen, SceneControls},

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
      nextEpisode: 'nextEpisode',
      minHeightPlayer: 'minHeightPlayer',
      title: 'currentTitle'
    })
  },


  watch: {
    routeEpisodeId (id) {
      this.setupEpisode(id)
    }
  },


  created () {
    this.setupListener()
    this.setupEpisode(this.routeEpisodeId)
  },

  mounted () {
    let w = window
    let d = document
    let e = d.documentElement
    let g = d.getElementsByTagName('body')[0]
    this.updateMinHeight(w.innerHeight || e.clientHeight || g.clientHeight)
  },

  beforeDestroy () {
    this.removeListener()
  },


  methods: {
    ...mapMutations({
      setupEpisode: types.SETUP_EPISODE,
      updateMinHeight: types.UPDATE_MIN_HEIGHT
    }),


    setupListener () {
      bus.$on(SEQUENCE_ENDED, this.sequenceEnded)
    },


    removeListener () {
      bus.$off(SEQUENCE_ENDED, this.sequenceEnded)
    },


    sequenceEnded () {
      console.log('go to', this.nextEpisode.type, this.nextEpisode.episodeId)
      this.$router.push({
        name: this.nextEpisode.type,
        params: {routeEpisodeId: `${this.nextEpisode.episodeId}`}}
      )
    }
  }
}
</script>

<style lang="scss">

.theater{
  position: relative;
}
.scene {
  position: relative;
}
.overlay{
  position: absolute;
  bottom: 0;
  width: 100%;
}
.wrapper-overlay{
  background: gold;
  height: 3em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  h1 {
    font-size: 1.5em;
  }
}
</style>
