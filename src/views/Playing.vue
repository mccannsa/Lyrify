<template>
  <div>
    <p>{{ this.$store.state.displayName }}</p>
    <p v-if="this.track"><a :href="this.lyricPage" target="_blank">{{ this.track.name }} by {{ this.track.artists[0].name }}</a></p>
    <p v-else>Not playing</p>
  </div>
</template>
<script>
import axios from "axios"

export default {
  data() {
    return {
      track: {
        artists: [{
          name: null
        }],
        name: null,
        duration_ms: -1
      },
      lyricPage: null,
      timer: -1
    }
  },
  async created() {
    this.$store.subscribe((mutation) => {
      if (mutation.type === "setCurrentlyPlaying") {
        this.track = this.$store.state.spotify.currentlyPlaying;
        this.getSongLyrics();
      }
    })
    await this.getCurrentlyPlaying();
    await this.getSongLyrics();
    this.timer = setInterval(() => {
      this.getCurrentlyPlaying();
    }, 5000);
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    async getCurrentlyPlaying() {
      await this.$store.dispatch("getCurrentlyPlaying");
    },
    async getSongLyrics() {
      if (this.track.name) {
        await axios.get(`https://api.genius.com/search?q=${this.track.artists[0].name}%20${this.track.name}&access_token=${this.$store.state.genius.token}`,
        {
          // headers: {
          //   Authorization: `Bearer ${this.$store.state.genius.token}`
          // }
        })
        .then((res) => {
          console.log(res)
          this.lyricPage = res.data.response.hits[0].result.url;

        })
        .catch((err) => {
          console.error(err);
        })
      }
    }
  }
}
</script>