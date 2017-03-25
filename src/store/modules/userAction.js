import * as types from '../mutation-types'

const state = {
  minHeightPlayer: '0px'
}

// getters
const getters = {
  minHeightPlayer: (state) => state.minHeightPlayer
}

// actions
const actions = {

}

// mutations
const mutations = {
  [types.UPDATE_MIN_HEIGHT] (state, aspectRatio) {
    state.minHeightPlayer = `${aspectRatio}px`
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
