<template>
  <div class="scene-controls">
    <button @click="playPauseVideo" type="button" name="playPause">
      <span v-if="videoIsPaused">PLAY</span>
      <span v-else>PAUSE</span>
    </button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { PLAY_PAUSE_VIDEO } from '@/store/mutation-types'

export default {
  name: 'SceneControls',

  computed: {
    ...mapGetters([
      'videoIsPaused'
    ])
  },

  methods: {
    ...mapMutations({
      playPauseVideo: PLAY_PAUSE_VIDEO
    })
  }

}
</script>

<style lang="scss">
</style>
