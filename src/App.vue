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

    // list of sequences
    sequences: [
      'intro',
      'home',
    ],

    ready: function() {
      let Loader = require('resource-loader')
      let loader = new Loader()

      let that = this

      // './static/home/video/sequence.webm',
      let sequences = that.$options.sequences;

      sequences.forEach(function(file_path) {
        loader.add(file_path, './static/' + file_path + '/video/sequence.webm')
      });

      loader.on('progress', function(event, resource){
        that.progress = Math.round(event.progress)
        console.log('progress', this.progress)
        console.log(resource)
        if(resource.url.match(/\.(jpe?g|png|gif|bmp)$/i)){
          console.log('IMG')
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
        console.log('COMPLETE')

        // that.$route.router.go('/intro')
      });

      loader.load()
    }
}
</script>

<style>
@import 'https://fonts.googleapis.com/css?family=Open+Sans|Rubik:900';

/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: #111111;
}

#app {
  color: #DDDDDD;
  text-align: center;
}

p, a{
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
}

h1{
  font-family: 'Rubik', sans-serif;
}
</style>
