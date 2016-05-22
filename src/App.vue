<template>
  <div>
    <router-view>
    </router-view>
    <div class="loader">
      <h1>{{ progress }}%</h1>
    </div>
  </div>
</template>

<script>
var loaderMixin = require('vue-loader-mixin');

export default {
  data () {
    return {
      progress: 0
    }
  },
  mixins: [loaderMixin],
  events: {
        'load:progress': 'onLoadProgress',
        'load:complete': 'onLoadComplete'
    },

    // Static manifest
    manifest: [
      './static/img/test.jpg',
      './static/video/bg.mp4',
      './static/video/bg.webm',
      './static/video/scroll.mp4',
      './static/video/scroll.webm',
      './static/video/test.webm',
      './static/sound/sanik.mp3',
    ],

    ready: function() {
        // Explicit call
        this.load();
    },

    methods: {
        onLoadProgress: function(event) {
            this.progress = Math.round(event.progress);
            console.log('progress', this.progress);
        },

        onLoadComplete: function(event) {
            this.progress = 100;
            // You can use the load:complete event with the `wait-for` directive
        }
    }
}
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  color: #2c3e50;
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
  display: block;
}
</style>
