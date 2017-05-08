import { UPDATE_MIN_HEIGHT, PLAY_PAUSE_VIDEO } from '../mutation-types'

const state = {
  minHeightPlayer: '0px',
  videoIsPaused: false
}

// getters
const getters = {
  minHeightPlayer: (state) => state.minHeightPlayer,
  videoIsPaused: (state) => state.videoIsPaused
}

// actions
const actions = {

}

// mutations
const mutations = {
  [UPDATE_MIN_HEIGHT] (state, aspectRatio) {
    state.minHeightPlayer = `${aspectRatio}px`
  },

  [PLAY_PAUSE_VIDEO] (state) {
    state.videoIsPaused = !state.videoIsPaused
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
