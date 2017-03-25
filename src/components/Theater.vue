<template>
  <div class="theater">
    <header>
      <global-progress></global-progress>
      <h1>{{title}}</h1>
    </header>

    <section class="scene" :style="{minHeight: minHeightPlayer}">
      <router-view :key="routeEpisodeId"></router-view>
      <!-- <black-screen v-if="showBS || !playerIsReady" :content="bSContent"></black-screen>
      <player :sequence="sequence"></player> -->
    </section>
  </div>
</template>

<script>
import GlobalProgress from '@/components/GlobalProgress'
import Player from '@/components/videoPlayer/Player'
import BlackScreen from '@/components/videoPlayer/BlackScreen'

import bus from '@/bus'
import { SEQUENCE_ENDED } from '@/bus/bus-events'
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
    this.updateMinHeight(document.documentElement.clientWidth * 9 / 16)
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
.scene {
  position: relative;

}
</style>
