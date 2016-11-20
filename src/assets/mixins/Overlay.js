
export default {

  data () {
    return {
      time: {
        start: 0,
        duration: 0
      },
      position: {
        left: true,
        top: true,
        right: false,
        bottom: false
      },
    }
  },

  computed: {
    wordTime () {
      return 400
    },

    end () {
      return this.time.start + this.time.duration
    }
  },

  created () {
    // this.init(
    //   {
    //     start: 0,
    //     duration: 0
    //   },
    //   {
    //     left: true,
    //     top: true,
    //     right: false,
    //     bottom: false
    //   },
    // )
  }
}
