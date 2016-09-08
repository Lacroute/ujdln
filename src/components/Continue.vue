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

    methods: {
      continue: function () {
        let el = this.$el
        this.timeoutID = setTimeout(function(){
          el.click()
        }, 2500)
      },

      abort: function(){
        clearTimeout(this.timeoutID)
      }
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
    transition: color 1s;
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
            transition: transform 2s cubic-bezier(0, 0.3, 0.15, 1)
  }

  a:hover{
    color: #111111;
  }

  a:hover:before {
    -webkit-transform: scaleX(1);
        -ms-transform: scaleX(1);
            transform: scaleX(1);

            transition: transform 2.5s cubic-bezier(0, 0.3, 0.15, 1)
  }
</style>
