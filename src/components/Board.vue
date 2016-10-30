<template>
  <div class="board" v-show="episodeLaunched">
    <div class="container title">
      <h2>{{title_episode}}</h2>
    </div>
    <div class="container globalprogress">
      <progress value="0" max="100"></progress>
      <meta></meta>
    </div>
    <div class="container meta">
      <!-- <meta></meta> -->
    </div>
  </div>
</template>

<script>
  import Meta from './Meta.vue'

  export default {
    components: {Meta},

    data () {
      return {
        title_episode: null,
        progress_elm: null
      }
    },

    computed: {
      episodeLaunched () {
        return true
        return this.title_episode != null
      }
    },

    ready () {
      this.progress_elm = document.querySelector('.globalprogress progress')
      if (!this.progress_elm.getAttribute('max')) this.progress_elm.setAttribute('max', 100);


      bus.$on('begin-episode', (title) => {
        this.title_episode = this.formatTitle(title)
      })

      bus.$on('end-episode', () => {
        this.title_episode = null
      })

      bus.$on('global-progress', (val) => {
        this.updateProgress(val)
      })
    },

    methods : {
      updateProgress (val) {
        this.progress_elm.value = val
      },

      formatTitle (title) {
        title = title.replace(/-/g, ' ')
        console.log(title);
        return title.charAt(0).toUpperCase() + title.slice(1);
      }
    },

  }
</script>

<style scoped>
.board{
  position: relative;
  height: 50px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
}
h2{
  font-size: 1.3em;
}
.container.title{
  width: 50%;
  justify-content: flex-start;
}
.container{
  /*background: gold;*/
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
}
.container.globalprogress{
  width: 50%;
  justify-content: flex-end;
}
progress[value]{
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 3px;
}
progress[value]::-webkit-progress-bar {
  background: rgba(255, 255, 255, 0.1);
  height: 3px;
}
progress[value]::-webkit-progress-value {
  transition : width 1s ease;
  background: #FF4136;
}
</style>
