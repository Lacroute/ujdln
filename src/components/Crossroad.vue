<template>
  <div class="crossroad" :style="{minHeight: minHeightPlayer}">
    <div class="choices">
      <div class="choice" v-for="episode in nextEpisodes" @click="choose(episode.episodeId)" :style="{background: episode.cover}">
        <p>{{ episode.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import * as types from '@/store/mutation-types'

export default {
  name: 'Crossroad',

  data () {
    return {

    }
  },

  computed: {
    ...mapGetters({
      nextEpisodes: 'nextEpisode',
      minHeightPlayer: 'minHeightPlayer'
    })
  },

  methods: {
    ...mapMutations({
      setupEpisode: types.SETUP_EPISODE
    }),

    choose (episodeId) {
      episodeId += ''
      console.log('episodeId', episodeId)
      this.$router.push({
        name: 'sequence',
        params: {routeEpisodeId: episodeId}
      })
    }
  }
}
</script>

<style lang="scss">
.crossroad{
  background: lightgrey;
  height: 1px;
}
.choices{
  display: flex;
  align-items: stretch;
  justify-content: space-around;
  height: 100%;
}
.choice{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
