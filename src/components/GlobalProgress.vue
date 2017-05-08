<template>
  <div class="progress">
    <svg>
      <g class="episodes" :transform="`translate(0, ${episodeWidth/2})`">
        <rect :x="episodeX * index" y="0" :class="episodeClass(index)" v-for="(episode, index) in episodes"></rect>
        <!-- <circle :cx="`${linearScale(index)}%`" cy="50%" r="12" class="invisible" @click="jumpSequence(episode)"></circle> -->
      </g>
    </svg>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import episodes from '@/assets/episodes.json'

export default {
  name: 'GlobalProgress',

  data () {
    return {
      episodeWidth: 15,
      marginEpisode: 4
    }
  },

  computed: {
    ...mapGetters({
      progress: 'globalProgress',
      episodes: 'episodesKeys'
    }),


    episodeX () {
      return this.episodeWidth + this.marginEpisode
    },


    w () {
      return `${Math.floor((this.progress.value / this.progress.max) * 100)}%`
    }
  },

  methods: {
    episodeClass (index) {
      return {
        'viewed': index < this.progress.value,
        'on-view': index === this.progress.value
      }
    },


    linearScale (x) {
      return Math.floor((x / this.progress.max) * 100)
    },


    bulletClass (index) {
      return {
        active: this.progress.value === index,
        activated: this.progress.value > index
      }
    },


    jumpSequence (episodeId) {
      this.$router.push({
        name: episodes[episodeId].type,
        params: {routeEpisodeId: `${episodeId}`}}
      )
    }
  }
}
</script>

<style scoped lang="scss">
.progress {
  height: 30px;

  svg{
    height: 100%;
    width: 100%;

    .episodes{

      rect{
        width: 15px;
        height: 15px;
        fill: tomato;
      }

      rect.viewed{
        fill: green;
        opacity: 1;
      }

      rect.on-view{
        opacity: .4
      }
    }


  }
}
</style>
