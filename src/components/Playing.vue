<template>
  <div>
    <p>{{ this.$store.state.displayName }}</p>
    <p v-if="this.track">
      Currently playing:
      <span id="playing" @click="link(track.name, track.artists[0].name)">{{ this.desc }}</span>
    </p>
    <p v-else>Not playing</p>
  </div>
</template>
<script>
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
      }
    })
    await this.getCurrentlyPlaying();
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
    link(track, artist) {
      this.$router.push({ name: "lyrics", params: { track: track, artist: artist }});
    }
  }
}
</script>
<style>
#playing {
  text-decoration: underline;
}

#playing:hover {
  color: forestgreen;
  background-color: rgba(153, 255, 153, 0.25);
  cursor: pointer;
}
</style>