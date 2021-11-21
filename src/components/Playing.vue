<template>
  <div>
    <p>{{ this.$store.state.displayName }}</p>
    <p v-if="this.track">
      Currently playing:
      <span v-if="this.lyricPage"><a :href="this.lyricPage" target="_blank">{{ this.desc }}</a></span>
      <span v-else>{{ this.desc }} <i>(couldn't find lyrics...)</i> </span>
    </p>
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
  computed: {
    desc() {
      return `${this.track.name} by ${this.track.artists[0].name}`;
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
        await axios.get(`https://api.genius.com/search?q=${this.track.artists[0].name}%20${this.track.name}&access_token=${this.$store.state.genius.token}`)
        .then((res) => {
          for(var hit of res.data.response.hits) {
            if (hit.result.primary_artist.name === this.track.artists[0].name) {
              this.lyricPage = hit.result.url;
              break;
            } else if (this.lyricPage) {
              this.lyricPage = null;
            }
          }
        })
        .catch((err) => {
          console.error(err);
        })
      }
    }
  }
}
</script>