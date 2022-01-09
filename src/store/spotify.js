import axios from "axios";
import qs from "qs";

export default {
  state: {
    client_id: "808c22385559498baedf01658e162588",
    client_secret: "3583e043798944ac9055ac6fd747e8c0",
    redirect_uri: "http://tender-noether-2faae6.netlify.app/spotify",
    authorization: "",
    authState: "",
    token: "",
    refreshToken: "",
    currentlyPlaying: {
      artists: [{
        name: ""
      }],
      name: "",
      duration_ms: 0
    },
    displayName: "",
    recentlyPlayed: [],
    topTracks: [],
    searchResults: []
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
    setCurrentlyPlaying: (state, track) => {
      state.currentlyPlaying = track;
    },
    setDisplayName: (state, n) => {
      state.displayName = n;
    },
    setRecentlyPlayed: (state, r) => {
      state.recentlyPlayed = r
    },
    setTopTracks: (state, t) => {
      state.topTracks = t;
    },
    setSearchResults: (state, r) => {
      state.searchResults = r;
    }
  },
  getters: {
    getDisplayName(state) {
      return state.displayName;
    },
    getRecentlyPlayed(state) {
      return state.recentlyPlayed;
    },
    getTopTracks(state) {
      return state.topTracks;
    },
    getAuthorization(state) {
      return state.authorization;
    },
    getSearchResults(state) {
      return state.searchResults;
    }
  },
  actions: {
    requestAuthorization(context, authState) {
      context.commit("setAuthState", authState);
      let scope = "user-read-private user-read-currently-playing user-read-recently-played user-top-read user-modify-playback-state";
      window.location.href = "https://accounts.spotify.com/authorize?" +
        `response_type=code&` +
        `client_id=${context.state.client_id}&` +
        `scope=${scope}&` +
        `redirect_uri=${context.state.redirect_uri}&` +
        `state=${authState}`;
    },
    async requestToken(context) {
      var form = {
          code: context.state.authorization,
          redirect_uri: context.state.redirect_uri,
          grant_type: 'authorization_code'
      };
      const data = qs.stringify(form)

      var authOptions = {
        headers: {
          'Authorization': 'Basic ' + Buffer.from(`${context.state.client_id}:${context.state.client_secret}`, "utf-8").toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        json: true
      };

      await axios.post('https://accounts.spotify.com/api/token', data, authOptions)
      .then((res) => {
        context.commit("setToken", res.data.access_token);
        context.commit("setRefreshToken", res.data.refresh_token);
      })
      .catch((error) => {
        console.error(error);
      })
    },
    async requestRefreshToken (context) {
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
    async getCurrentlyPlaying(context) {
      await axios.get("https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${context.state.token}`
          }
        }
      )
      .then((res) => {
        context.commit("setCurrentlyPlaying", res.data.item);
      })
      .catch((err) => {console.error(err)})
    },
    requestDisplayName: async (context) => {
      await axios.get("https://api.spotify.com/v1/me",
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + `${context.state.token}`
        }
      })
      .then((res) => {
        context.commit("setDisplayName", res.data.display_name);
      })
      .catch((err) => {
        console.error(err)
      })
    },
    async requestRecentlyPlayed(context) {
      await axios.get("https://api.spotify.com/v1/me/player/recently-played",
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + `${context.state.token}`
        },
        json: true
      })
      .then((res) => {
        context.dispatch("getLyrics", { tracks: res.data.items, type: "recent" });
      })
      .catch((err) => {
        console.error(err)
      })
    },
    async requestTopTracks(context) {
      await axios.get("https://api.spotify.com/v1/me/top/tracks?time_range=short_term",
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + `${context.state.token}`
        },
        json: true
      })
      .then((res) => {
        context.dispatch("getLyrics", { tracks: res.data.items, type: "top" });
      })
      .catch((err) => {
        console.error(err);
      })
    },
    async playTrack(context, payload) {
      await axios.put("https://api.spotify.com/v1/me/player/play", { uris: [payload.uri] },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + `${context.state.token}`
        },
        json: true
      })
      .catch((err) => {
        console.error(err)
      })
    },
    async searchForTrack(context, payload) {
      await axios.get(`https://api.spotify.com/v1/search?type=track&query=${payload.search}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + `${context.state.token}`
        },
        json: true
      })
      .then(res => {
        context.commit("setSearchResults", res.data.tracks.items);
      })
      .catch(err => {
        console.error(err);
      });
    }
  }
}
