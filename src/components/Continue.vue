<template>
  <a v-link="target" @mouseover="continue" @mouseleave="abort">
    {{msg}}
  </a>
</template>

<script>
  export default {
    name: 'Continue',

    data: function () {
      return {
        timeoutID : null
      }
    },

    props: ['msg', 'target'],

    ready: function () {
      let that = this
      let link = this.$el
      let transitions = ['transitionend', 'webkitTransitionEnd', 'oTransitionEnd', 'MSTransitionEnd']

      transitions.forEach(function(anim) {
          link.addEventListener(anim, function(){
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
    transition: color 2s;
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
  }

  a:hover:before {
    -webkit-transform: scaleX(1);
        -ms-transform: scaleX(1);
            transform: scaleX(1);

            transition: transform 2s cubic-bezier(0, 0.3, 0.15, 1)
  }
</style>
