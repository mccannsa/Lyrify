import Vue from "vue";
import Vuex from "vuex";
// import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    spotify: {
      namespaced: true,
      state: {
        client_id : "808c22385559498baedf01658e162588",
        client_secret : "3583e043798944ac9055ac6fd747e8c0",
        redirect_uri : "http://localhost:8080/callback",
        authorization: "",
        token: ""
      },
      mutations: {
        setAuthorization(state, auth) {
          state.authorization = auth
        },
        setToken(state, t) {
          state.token = t
        }
      },
      actions: {
        async login() {

        }
      }
    }
  },
  genius: {
    state: {
      token: "EnfphtrEOtINUC_SzFP3sYhhtkR1Uxxf8w5QIaTHIFF6dMTUwjVbamr5Ny-2i-s9"
    }
  }
});
