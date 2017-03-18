import * as types from '../mutation-types'
import episodes from '@/assets/episodes.json'

const state = {
  episodeId: 1
}

// getters
const getters = {
  episodesCount: state => Object.keys(episodes).length,
  currentEpisode: state => episodes[state.episodeId],
  currentEpisodeType: (state, getters) => getters.currentEpisode.type,
  currentTitle: (state, getters) => getters.currentEpisode.title,
  currentSequence: (state, getters) => getters.currentEpisode.video_file,
  currentBSContent: (state, getters) => getters.currentEpisode.blackscreen_content,
  globalProgress: (state, getters) => ({value: state.episodeId - 1, max: getters.episodesCount - 1})
}

// actions
const actions = {

  nextEpisode ({ commit, getters }) {
    commit(types.NEXT_EPISODE, getters.currentEpisode.next_episode_id)
  }
}

// mutations
const mutations = {
  [types.SETUP_EPISODE] (state, episodeId) {
    if (episodes[episodeId]) state.episodeId = episodeId
    else state.episodeId = Object.keys(episodes)[0]
  },


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
