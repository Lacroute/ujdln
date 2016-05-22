<template>
  <h1>INTRO</h1>
  <loader></loader>
  <a v-link="{ path: '/home' }">Continue to Home</a>
</template>

<script>
import Loader from './Loader'

export default {
  name: 'Intro',
  components: {Loader}
}
</script>
