<template>
  <div>
    <!-- <p>{{ this.$store.state.displayName }}</p> -->
    <p v-if="this.track">{{ this.track.name }} by {{ this.track.artists[0].name }}</p>
    <p v-else>Not playing</p>
  </div>
</template>
<script>
import axios from "axios"

export default {
  created() {
    this.getCurrentlyPlaying()
    
  },
  methods: {
    getCurrentlyPlaying() {
      axios.get("https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.$store.state.token}`
          }
        }
      )
      .then((res) => {
        console.log(res.data.item);
        this.track = res.data.item;
      })
      .catch((err) => {console.error(err)})
    }
  },
  data() {
    return {
      track: {}
    }
  }
}
</script>