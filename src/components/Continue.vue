<template>
  <a v-link="target">
    {{msg}}
  </a>
</template>

<script>
  export default {
    name: 'Continue',

    data: function () {
      return {
        timeoutID: null,
        color_end: 'rgb(17, 17, 17)'
      }
    },

    props: ['msg', 'target'],

    ready: function () {
      let link = this.$el
      let transitions = ['transitionend', 'webkitTransitionEnd', 'oTransitionEnd', 'MSTransitionEnd']

      transitions.forEach( (anim) => {
        link.addEventListener(anim, () => {
          // hack to test if it's realy completed
          if (link.currentStyle && link.currentStyle['color'] === this.color_end)
            link.click()
          else if (document.defaultView.getComputedStyle(link, null)['color'] === this.color_end)
            link.click()
        }, false)
      })
    }
  }
</script>

<style scoped>
  a{
    color: #FF4136;
    text-decoration: none;
    display: inline-block;
    padding: 10px;
    border: 1px solid #dddddd;
    border-radius: 1em/3em;
    transition: color 1.5s;
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translate(-50%, 0);
  }

  a:before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: #FF4136;
    z-index: -1;
    border-radius: 1em/3em;
    -webkit-transform:scaleX(0);
        -ms-transform:scaleX(0);
            transform:scaleX(0);
            transition: transform 1.5s cubic-bezier(0, 0.3, 0.15, 1)
  }

  a:hover{
    color: #111111;
    transition: color 2.2s;
  }

  a:hover:before {
    -webkit-transform: scaleX(1);
        -ms-transform: scaleX(1);
            transform: scaleX(1);

            transition: transform 2s cubic-bezier(0, 0.3, 0.15, 1)
  }
</style>
