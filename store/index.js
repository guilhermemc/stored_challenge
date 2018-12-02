import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {

  return new Vuex.Store({
    state: () => ({
      playlists: [],
    }),

    mutations: {
      SET_ACCESS_TOKEN (state, payload) {
        localStorage.setItem('accessToken', payload);
      },
      SET_REFRESH_TOKEN (state, payload) {
        localStorage.setItem('refreshToken', payload);
      },
      SET_PLAYLISTS (state, payload) {
        state.playlists = payload
      }
    },
    
    actions: {
      displayFeedback({commit}, req) {
        let list_codes = {
            "200":	"OK",
            "201":	"OK",
            "202":	"Accepted - The request has been accepted for processing, but the processing has not been completed.",
            "204":	"No Content - The request has succeeded but returns no message body.",
            "304":	"Not Modified. See Conditional requests.",
            "400":	"Bad Request - The request could not be understood by the server due to malformed syntax. The message body will contain more information; see Response Schema.",
            "401":	"Unauthorized - The request requires user authentication or, if the request included authorization credentials, authorization has been refused for those credentials.",
            "403":	"Forbidden - The server understood the request, but is refusing to fulfill it.",
            "404":	"Not Found - The requested resource could not be found. This error can be due to a temporary or permanent condition.",
            "429":	"Too Many Requests - Rate limiting has been applied.",
            "500":	"Internal Server Error. You should never receive this error because our clever coders catch them all … but if you are unlucky enough to get one, please report it to us through a comment at the bottom of this page.",
            "502":	"Bad Gateway - The server was acting as a gateway or proxy and received an invalid response from the upstream server.",
            "503":	"Service Unavailable - The server is currently unable to handle the request due to a temporary condition which will be alleviated after some delay. You can choose to resend the request again.",
        }

        let type = 'error';
        let message = '';

        if (req.status == '200' || req.status == '201') {
          type = 'success'
        }

        if (list_codes[req.status]) {
          message = `${list_codes[req.status]}`
        } else {
          message = `Ops, somenthing went wrong! Please, contact support.`
        }

        let resp = req.response? JSON.parse(req.response): true;
        
        if (resp.error && resp.error.message) {
          message = resp.error.message
        }

        $nuxt.$emit('SHOW_ALERT', {type: type, text: message});
      }
    },

    getters:{
      playlists: state => state.playlists,
    }
  })
}

export default createStore