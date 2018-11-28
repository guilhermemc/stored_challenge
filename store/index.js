import Vuex from 'vuex'
import axios from 'axios'


const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      counter: 0
    }),
    mutations: {
      increment (state) {
        state.counter++
      }
    },
    actions: {
        getAuth ({params}) {
            return axios.get(`http://localhost:3000/teste`)
            .then((res) => {
                console.log(res)
                return {
                    title: res
                }
            })
        }
    }
  })
}

export default createStore