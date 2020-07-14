import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)
const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage
})

export default new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  state: {
    user: null,
    soal: null,
    jawaban: []
  },
  getters: {
    getUser: state => state.user,
    getSoal: state => state.soal,
    getJawaban: state => state.jawaban
  },
  mutations: {
    updateUser: (state,data) => {
      state.user = data
    },
    deleteUser: (state) => {
      state.user = null
    },
    updateSoal: (state,data) => {
      state.soal = data
    },
    deleteSoal: (state) => {
      state.soal = null
    },
    updateJawaban: (state,data) => {
      state.jawaban.push(data)
    },
    deleteJawaban: (state) => {
      state.jawaban = []
    }
  },
  actions: {
    saveUser: (contex,data) => {
      contex.commit("updateUser",data)
    },
    logout: (contex) => {
      contex.commit('deleteUser')
    },
    saveSoal: (contex,data) => {
      contex.commit("updateSoal",data)
    },
    clearSoal: (contex) => {
      contex.commit("deleteSoal")
    },
    jawab: (contex,idx, data) => {
      contex.commit("updateJawaban",idx,data)
    },
    clearJawaban: (contex) => {
      contex.commit("deleteJawaban")
    }
  }
})
