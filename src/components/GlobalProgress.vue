<template>
  <div class="progress">
    <svg>
      <g class="line">
        <rect id="baseline" x="0" y="50%" width="100%"></rect>
        <rect id="progress" x="0" y="50%" :width="w"></rect>
      </g>
      <g class="bullet" v-for="(episode, index) in episodes">
        <circle :class="bulletClass(index)" :cx="`${linearScale(index)}%`" cy="50%" r="5"></circle>
        <circle :cx="`${linearScale(index)}%`" cy="50%" r="12" class="invisible" @click="jumpSequence(episode)"></circle>
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

    }
  },

  computed: {
    ...mapGetters({
      progress: 'globalProgress',
      episodes: 'episodesKeys'
    }),


    w () {
      return `${Math.floor((this.progress.value / this.progress.max) * 100)}%`
    }

  },

  methods: {
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
  width: 100%;
  height: 30px;

  $transition-time: 1000ms;
  $line_size: 2px;
  $bullet_size: 5px;
  $fill_color: rgba(0, 0, 0, .2);
  $fill_active_color: #111111;
  $fill_activated_color: #FF4136;
  svg {
    height: 30px;
    width: 100%;
    .line{
      transform: translateY(-$line_size/2);
    }
    .bullet{
      transform: translateX($bullet_size);
    }
    .bullet:last-child{
      transform: translateX(-$bullet_size);
    }
    rect{
      height: $line_size;
      fill: $fill_color;
      transition: all $transition-time ease;
    }
    rect#progress{fill: $fill_activated_color}
    circle{fill: $fill_color;z-index: 1;}
    circle.invisible{fill: transparent}
    circle.invisible:hover{cursor: pointer}
    circle.active{
      fill: $fill_active_color;
      transition: all $transition-time ease $transition-time;
    }
    circle.activated{
      fill: $fill_activated_color;
      transition: all $transition-time ease;
    }
  }
}
</style>
