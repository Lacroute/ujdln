<template>
  <div class="blackscreen">
    <p>
      {{ blackscreen.text }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Blackscreen',

  props: [
    'blackscreen'
  ],

  ready: function(){
    let that = this
    let delay = this.blackscreen.text.split(' ').length * 450

    // remove the blackscreen after a certain amount of time
    setTimeout(function(){
      // that.$dispatch('end-blackscreen', that.blackscreen)
    }, delay)
  }
}
</script>

<style>
.blackscreen {
  background: black;
  color: white;

}
</style>
