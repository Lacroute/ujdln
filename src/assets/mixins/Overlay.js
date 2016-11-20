
const Overlay = {
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

  computed: {
    end () {
      return start + duration
    }
  }
}

export default Overlay
