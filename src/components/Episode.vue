<template>
  <div>
    <div v-if="begin" transition="fade" class="animated" transition-mode="out-in" v-el:test>
      <blackscreen
          v-for="blackscreen in bs"
          :blackscreen="blackscreen"
          @end-blackscreen="removeBlackscreen">
      </blackscreen>
    </div>

    <div v-if="next" transition="fade" class="animated">
      <sequence></sequence>

      <div v-if="end" transition="fade" class="animated">
        <continue msg="Go back to Intro" target="/intro"></continue>
      </div>
    </div>
  </div>
</template>

<script>
import Blackscreen from './overlays/Blackscreen.vue'
import Sequence from './Sequence.vue'
import Continue from './Continue.vue'

export default {
  name: 'Episode',

  components: {Blackscreen, Sequence, Continue},

  data () {
    return {
      title_episode: null,
      next_episode_id: null,
      begin: true,
      next: false,
      end: false,
      bs: []
    }
  },

  ready () {
    bus.$emit('get-episode-infos', {
      title_required: 'monter-au-cerro-rico',
      cb: (infos) => {
        console.log('infos !', infos.title_episode);
        this.title_episode = infos.title_episode
        this.next_episode_id = infos.next_episode_id
        this.bs.push({text: infos.blackscreen_content});
      }
    })

    bus.$on('end-sequence', () => {
      this.end = true
      // bus.$emit('end-episode', this.next_episode_id)
      bus.$emit('end-episode', 50)
    })
  },

  methods: {
    removeBlackscreen () {
      let animations = ['animationend', 'webkitAnimationEnd', 'oAnimationEnd', 'MSAnimationEnd']

      animations.forEach( (anim) => {
        this.$els.test.addEventListener(anim, () => this.next = true, false)
      })

      this.begin = false
      bus.$emit('begin-episode', this.title_episode)
    }
  }
}
</script>
