import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {

  return new Vuex.Store({
    state: () => ({
      token: null
    }),

    mutations: {
      SET_TOKEN (state, payload) {
        console.log(payload)
        state.token = payload
      }
    },
    
    actions: {
        
    },

    getters:{
      token: state => state.token
    }
  })
}

export default createStore