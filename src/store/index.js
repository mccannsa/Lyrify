import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";
import qs from "qs";

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
    token: "",
    refreshToken: "",
    displayName: ""
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
    },
    setRefreshToken: (state, t) => {
      state.refreshToken = t;
    },
    setDisplayName: (state, n) => {
      state.displayName = n;
    }
  },
  actions: {
    requestRefreshToken: async (context) => {
      var form = {
        refresh_token: context.state.refreshToken,
        grant_type: "refresh_token"
      };
      const data = qs.stringify(form)

      var authOptions = {
        url: "https://accounts.spotify.com/api/token",
        headers: {
          "Authorization": "Basic " + Buffer.from(`${context.state.client_id}:${context.state.client_secret}`, "utf-8").toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded"
        },
        json: true
      };

      await axios.post("https://accounts.spotify.com/api/token", data, authOptions)
      .then((res) => {
        context.commit("setToken", res.data.access_token)
        context.commit("setRefreshToken", res.data.refresh_token);
      })
      .catch((error) => {
        console.error(error);
      })
    },
    getDisplayName: async (context) => {
      await axios.get("https://api.spotify.com/v1/me",
      {
        "Authorization": "Bearer " + `${context.state.token}`
      })
      .then((res) => {
        context.commit("setDisplayName", res.data.display_name);
      })
      .catch((err) => {
        const oldToken = context.state.refreshToken;
        context.dispatch("requestRefreshToken");
        if (context.state.refreshToken !== oldToken) {
          context.dispatch("getDisplayName");
        } else {
          console.error(err)
        }
      })
    }
  }
});
