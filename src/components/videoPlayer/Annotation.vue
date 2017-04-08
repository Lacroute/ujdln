<template>
  <div :class="['annotation', positionClass, openClass, visibleClass]">
    <div class="wrapper">
      <article v-if="isOpen">
        <p>{{$t(`annotations.${params.key}`)}}</p>
      </article>
      <a class="opener" href="#" @click.prevent="toggleOpen">
        <span v-if="isOpen">X</span>
        <span v-else>?</span>
      </a>
    </div>
  </div>
</template>

<script>
import { ANNOTATION_DURATION } from '@/config'
import { START_VIDEO } from '@/bus/bus-events'
import bus from '@/bus'

export default {
  name: 'Annotation',

  props: {
    params: {
      type: Object
    },
    progressEvent: {
      type: Object
    }
  },


  data () {
    return {
      isOpen: false
    }
  },


  computed: {
    positionClass () {
      return Object.keys(this.params.position)
    },

    openClass () {
      return {opened: this.isOpen}
    },

    visibleClass () {
      return {
        visible: this.params.start <= this.progressEvent.value && this.progressEvent.value <= this.params.start + ANNOTATION_DURATION
      }
    }
  },


  methods: {
    toggleOpen () {
      this.isOpen = !this.isOpen
      bus.$emit(START_VIDEO)
    }
  }
}
</script>

<style lang="scss">
$padding_annotation: 20px;
  .annotation{
    position: absolute;
    border-radius: 2px;
    max-width: 40%;
    opacity: 0;
    transition: all ease 750ms;

    .wrapper{
      position: relative;
      display: flex;
      align-items: stretch;
    }

    a.opener{

      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, .6);
      border: 1px solid rgba(0, 0, 0, .3);
      opacity: .8;
      min-width: 40px;
      min-height: 40px;
      border-radius: 2px;
    }

    a.opener:hover{
      background: rgba(255, 255, 255, .7);
      border: 1px solid rgba(0, 0, 0, .4);
      opacity: 1;
      cursor: pointer;
    }

    article{
      padding: $padding_annotation
    }
  }
  .annotation.visible{
    opacity: 1;
  }
  .annotation.opened{
    background: rgba(255, 255, 255, .90);

    a.opener{
      border-radius: 2px;
      border: none;
      border-left: 1px solid rgba(0, 0, 0, .15);;
    }
  }
  $position_unit: 2em;
  .top{top: $position_unit;}
  .right{right: $position_unit;}
  .bottom{bottom: $position_unit;}
  .left{
    left: $position_unit;
    a.opener{order: -1;}
  }
</style>
