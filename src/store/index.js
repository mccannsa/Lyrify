import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ],
  state: {
    client_id: "808c22385559498baedf01658e162588",
    client_secret: "3583e043798944ac9055ac6fd747e8c0",
    redirect_uri: "http://localhost:8080/callback",
    authorization: "",
    authState: "",
    token: ""
  },
  mutations: {
    setAuthorization: (state, auth) => {
      state.authorization = auth;
    },
    setAuthState: (state, authState) => {
      state.authState = authState;
    },
    setToken: (state, t) => {
      state.token = t;
    }
  }
});
