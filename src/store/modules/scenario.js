import * as types from '../mutation-types'
import episodes from '@/assets/episodes.json'

const state = {
  episodeId: 1,
  all: episodes
}

// getters
const getters = {
  currentEpisode: state => episodes[state.episodeId],
  currentTitle: (state, getters) => getters.currentEpisode.title,
  currentSequence: (state, getters) => getters.currentEpisode.video_file
}

// actions
const actions = {

}

// mutations
const mutations = {
  [types.CHECKOUT_SUCCESS] (state) {
    state.checkoutStatus = 'successful'
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
