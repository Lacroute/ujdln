<template>
  <div class="">

    <div class="loader" v-show="progress < 100 && progress > 0">
      <h1>{{ progress }}%</h1>
    </div>
    <router-view></router-view>

  </div>
</template>

<script>
export default {
  data () {
    return {
      progress: 0,
      img_cache: [],
      vid_cache: {}
    }
  },

    // Static manifest
    manifest: [
      // './static/img/home/test.jpg'
      // './static/video/bg.mp4',
      // './static/video/bg.webm',
      // './static/video/scroll.mp4',
      // './static/video/scroll.webm',
      // './static/video/test.webm',
      // './static/sound/sanik.mp3',
    ],

    ready: function() {
      let Loader = require('resource-loader');
      let loader = new Loader();

      let that = this;
      let manifest = that.$options.manifest;

      manifest.forEach(function(file) {
          loader.add(file, file);
      });

      loader.on('progress', function(event, resource){
        that.progress = Math.round(event.progress);
        console.log('progress', this.progress);
        // console.log(resource);
        if(resource.url.match(/\.(jpe?g|png|gif|bmp)$/i)){
          console.log('IMG');
          that.img_cache.push({
            'name': resource.name,
            'src': resource.url
          });
        }else {
          console.log('other...');
          that.vid_cache[resource.name] = {'src': resource.url}
        }
      });

      loader.on('complete', function(event, resources){
        console.log('COMPLETE');

        // that.$route.router.go('/intro');
      });

      loader.load();
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
