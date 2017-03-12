<template>
  <div class="theater">
    <h1>{{title}}</h1>
    <player :sequence="sequence"></player>
  </div>
</template>

<script>
import Player from '@/components/Player'
import { mapGetters } from 'vuex'

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
  }
}
</script>

<style style="scss">

</style>
