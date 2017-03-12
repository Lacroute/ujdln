<template>
  <div class="theater">
    <h1>{{title}}</h1>
    <player :sequence="sequence"></player>
  </div>
</template>

<script>
import Player from '@/components/Player'
import { mapGetters, mapActions } from 'vuex'
import bus from '@/bus'
import { VIDEO_ENDED, START_SEQUENCE } from '@/bus/bus-events'

export default {
  name: 'Theater',
  components: {Player},

  data () {
    return {

    }
  },

  computed: {
    ...mapGetters({
      episode: 'currentEpisode',
      title: 'currentTitle',
      sequence: 'currentSequence'
    })
  },


  created () {
    this.setupListener()
    bus.$on(START_SEQUENCE, this.nextEpisode)
  },

  beforeDestroy () {
    this.removeListener()
  },


  methods: {
    ...mapActions({
      nextEpisode: 'nextEpisode'
    }),


    setupListener () {
      bus.$on(VIDEO_ENDED, this.nextEpisode)
    },


    removeListener () {
      bus.$off(VIDEO_ENDED, this.nextEpisode)
    }
  }
}
</script>

<style style="scss">

</style>
