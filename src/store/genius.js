import axios from "axios"

export default {
  state: {
    client_id: "3JFbmFrOg74WjfEiMb9M1AyX3kHdflkkLpP-Oq7MBHNCyGufES0nneV3HbM-MMlZ",
    client_secret: "8i4wObOXeD_5hPJ1IJvt6wQhte0qmxY5eiDI9MBn9JZ0uO0xQzLlEFH90oV-c4UE6GleJUrWc-fvUXJwS8QmIQ",
    redirect_uri: "http://localhost:8080/genius",
    token: "wAWL85FfPN-SIBZ8IgGk51Gr6iAhgSrp9yFcpfcBzJnxvD9h4gZCpMrBq4gzyP5r",
    lyricsPage: ""
  },
  mutations: {
    setLyricsPage(state, page) {
      state.lyricsPage = page;
    }
  },
  getters: {
    getLyricsPage(state) {
      return state.lyricsPage;
    }
  },
  actions: {
    async getLyrics(context, played) {
      for await (let t of played) {
        await axios.get(`https://api.genius.com/search?q=${t.track.artists[0].name}%20${t.track.name}&access_token=${context.state.token}`)
        .then((res) => {
          for (var hit of res.data.response.hits) {
            if (hit.result.primary_artist.name === t.track.artists[0].name) {
              t.lyrics = hit.result.url;
              break;
            }
          }
          context.commit("setRecentlyPlayed", played);
        })
        .catch((err) => {
          console.error(err);
        });
      }
    },
    async getSongLyrics(context, payload) {
      console.log(payload.track + " by " + payload.artist);
      await axios.get(`https://api.genius.com/search?q=${payload.artist}%20${payload.track}&access_token=${context.state.token}`)
      .then(res => {
        let url = null;
        for (let hit of res.data.response.hits) {
          if (hit.result.primary_artist.name === payload.artist) {
            url = hit.result.url;
            break;
          }
        }
        context.commit("setLyricsPage", url);
      })
      .catch(err => {
        console.error(err);
      });
    }
  }
}