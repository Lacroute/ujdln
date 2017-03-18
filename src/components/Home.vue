<template>
  <div class="home">
    <h1>Un jour dans la nuit</h1>
    <router-link :to="{ name: 'story'}">Commencer</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',

  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
.home{
  height: 100vh;
  width: 100%;
  background: black;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: white;
}
</style>
