<template>
  <div class="choice-wrapper" :style="{minHeight: minHeightPlayer}">
    <div class="choices">
      <question
      v-for="(choice, index) in choices"
      :key="index" :index="index" :cover="choice.cover" :question="choice.question" :videoFile="choice.video_file"
      >
      </question>
    </div>
    <button type="button" name="skip" @click="nextSequence">{{ $t('interface.nextSequence') }}</button>
    <div v-if="sequence" class="player-wrapper">
      <player :sequence="sequence"></player>
    </div>
  </div>
</template>

<script>
import Question from '@/components/choice/Question'
import Player from '@/components/videoPlayer/Player'
import bus from '@/bus'
import { VIDEO_ENDED, CHOOSE_VIDEO, SEQUENCE_ENDED } from '@/bus/bus-events'

import { mapGetters } from 'vuex'
export default {
  name: 'Choice',

  components: {Player, Question},

  data () {
    return {
      sequence: null
    }
  },

  created () {
    this.setupListener()
  },

  beforeDestroy () {
    this.removeListener()
  },

  computed: {
    ...mapGetters({
      minHeightPlayer: 'minHeightPlayer',
      choices: 'currentChoices'
    })
  },

  methods: {
    setupListener () {
      bus.$on(CHOOSE_VIDEO, this.choose)
      bus.$on(VIDEO_ENDED, this.choose)
    },

    removeListener () {
      bus.$off(CHOOSE_VIDEO, this.choose)
      bus.$off(VIDEO_ENDED, this.choose)
    },

    choose (sequence) {
      this.sequence = sequence || null
      if (document.getElementsByClassName('choosed').length === this.choices.length) {
        this.nextSequence()
      }
    },

    nextSequence () {
      bus.$emit(SEQUENCE_ENDED)
    }
  }
}
</script>

<style lang="scss">
.choice-wrapper {
  height: 1px;
  position: relative;
}
.player-wrapper {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
