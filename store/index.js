import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {

  return new Vuex.Store({
    state: () => ({
      accessToken: null,
      refreshToken: null,
      playlists: []
    }),

    mutations: {
      SET_ACCESS_TOKEN (state, payload) {
        state.accessToken = payload
      },
      SET_REFRESH_TOKEN (state, payload) {
        state.refreshToken = payload
      },
      SET_PLAYLISTS (state, payload) {
        state.playlists = payload
      }
    },
    
    actions: {
      
    },

    getters:{
      accessToken: state => state.accessToken,
      refreshToken: state => state.refreshToken,
      playlists: state => state.playlists
    }
  })
}

export default createStore