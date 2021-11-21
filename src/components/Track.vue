<template>
  <div>
    <span v-if="this.lyricPage"><a :href="this.lyricPage" target="_blank">{{ this.name }} by {{ this.artist }}</a></span>
    <span v-else>{{ this.name }} by {{ this.artist }}<br/></span>
  </div>
</template>
<script>
import axios from "axios"

export default {
  props: {
    track: {
      type: String,
      default: null
    },
    artist: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      lyricPage: null
    }
  },
  methods: {
    async getSongLyrics() {
      if (this.track) {
        await axios.get(`https://api.genius.com/search?q=${this.artist.name}%20${this.track}&access_token=${this.$store.state.genius.token}`)
        .then((res) => {
          for(var hit of res.data.response.hits) {
            if (hit.result.primary_artist.name === this.artist) {
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
  },
  async created() {
    await this.getSongLyrics();
  }
}
</script>