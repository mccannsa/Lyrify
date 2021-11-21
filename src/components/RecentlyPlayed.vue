<template>
  <div>
    <h3>20 most recently played tracks</h3>
    <span v-if="this.recentlyPlayed.length > 0">
      <ul>
        <li v-for="t in recentlyPlayed" :key="t.played_at">
          <span><a :href="t.lyricPage" target="_blank">{{ t.track.name }} by {{ t.track.artists[0].name }}</a></span>
        </li>
      </ul>
    </span>
    <span v-else>Loading recently played tracks...</span>
  </div>
</template>
<script>
import axios from "axios"
export default {
  data() {
    return {
      recentlyPlayed: [],
      timer: -1,
      lyricPage: null
    }
  },
  methods: {
    async getSongLyrics(t, a) {
      if (t) {
        await axios.get(`https://api.genius.com/search?q=${a}%20${t}&access_token=${this.$store.state.genius.token}`)
        .then((res) => {
          for(var hit of res.data.response.hits) {
            if (hit.result.primary_artist.name === a) {
              this.lyricPage = hit.result.url;
            }
          }
          this.lyricPage = window.location.href;
        })
        .catch((err) => {
          console.error(err);
        })
      }
    }
  },
  async beforeCreate() {
    this.$store.subscribe((mutation) => {
      if (mutation.type === "setRecentlyPlayed") {
        this.recentlyPlayed = this.$store.state.spotify.recentlyPlayed;
        for (let t of this.recentlyPlayed) {
          t.lyricPage = this.getSongLyrics(t.track.name, t.track.artists[0])
        }
      }
    })
    await this.$store.dispatch("requestRecentlyPlayed");
    this.timer = setInterval(() => {
      this.$store.dispatch("requestRecentlyPlayed");
    }, 60000);
  },
  destroyed() {
    clearInterval(this.timer);
  }
}
</script>