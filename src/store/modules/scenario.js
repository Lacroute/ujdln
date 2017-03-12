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

  nextEpisode ({ commit, getters }) {
    commit(types.NEXT_EPISODE, getters.currentEpisode.next_episode_id)
  }
}

// mutations
const mutations = {
  [types.NEXT_EPISODE] (state, nextEpisodeId) {
    state.episodeId = nextEpisodeId
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
