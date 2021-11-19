<template>
  <div>
    <!-- <p>{{ this.$store.state.displayName }}</p> -->
    <p v-if="this.track"><a :href="this.lyricPage">{{ this.track.name }} by {{ this.track.artists[0].name }}</a></p>
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
          name: ""
        }],
        name: ""
      },
      lyricPage: ""
    }
  },
  created() {
    this.$store.subscribe((mutation) => {
      if (mutation.type === "setCurrentlyPlaying") {
        this.track = this.$store.state.spotify.currentlyPlaying;
      }
    })
    this.getCurrentlyPlaying();
    // this.getSongLyrics();
  },
  methods: {
    async getCurrentlyPlaying() {
      this.$store.dispatch("getCurrentlyPlaying");
    },
    async getSongLyrics() {
      await axios.get(`https://api.genius.com/search?q=${this.track.artists[0].name}%20${this.track.name}`,
      {
        headers: {
          Authorization: `Bearer ${this.$store.state.genius.token}`
        }
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
</script>