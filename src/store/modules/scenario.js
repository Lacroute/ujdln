import * as types from '../mutation-types'
import episodes from '@/assets/episodes.json'

const state = {
  episodeId: 1,
  globalProgress: {
    value: 0,
    max: Object.keys(episodes).length - 1
  }
}

// getters
const getters = {
  episodesCount: state => Object.keys(episodes).length,
  currentEpisode: state => episodes[state.episodeId],
  currentTitle: (state, getters) => getters.currentEpisode.title,
  currentSequence: (state, getters) => getters.currentEpisode.video_file,
  currentBSContent: (state, getters) => getters.currentEpisode.blackscreen_content,
  nextEpisode: (state, getters) => {
    if (Array.isArray(getters.currentEpisode.next_episode_id)) {
      return getters.currentEpisode.next_episode_id.map(id => episodes[id])
    } else {
      return episodes[getters.currentEpisode.next_episode_id]
    }
  },
  globalProgress: (state, getters) => state.globalProgress
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
    state.globalProgress.value = Object.keys(episodes).findIndex(id => id === episodeId)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
