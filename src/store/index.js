import Vue from 'vue'
import Vuex from 'vuex'
import * as Auth from '@/api'
import * as utils from '@/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    isLoggedIn: false,
    credentials: {
      refreshToken: null,
      accessToken: null
    }
  },
  getters: {
    getUser(state) {
      return state.user
    }
  },
  mutations: {
    SET_ACCESS_TOKEN(state, payload) {
      state.credentials.accessToken = payload
    },
    SET_USER_LOGGED_IN(state, value) {
      state.isLoggedIn = value
    }
  },
  actions: {
    async handleLogin(state, { commit }) {

    }
  },
  modules: {
  }
})
