<template>
  <div class="playing-flex-container">
    <p id="user">Hello, <span id="displayName" @click="overview()">{{ this.displayName }}</span>.</p>
    <p v-if="this.track">
      You're currently listening to:
      <span id="playing" @click="link(track.name, track.artists[0].name, track.uri)">{{ this.desc }}</span>
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
  async beforeCreate() {
    this.$store.dispatch("requestDisplayName");
  },
  computed: {
    desc() {
      return `${this.track.name} by ${this.track.artists[0].name}`;
    },
    displayName() {
      return this.$store.getters.getDisplayName;
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
    link(track, artist, uri) {
      this.$router.push({ name: "lyrics", params: { track: track, artist: artist, uri: uri }});
    },
    overview() {
      this.$router.push("/overview");
    }
  }
}
</script>
<style>
#displayName {
  font-weight: bold;
}

#displayName:hover {
  color: forestgreen;
  background-color: rgba(153, 255, 153, 0.25);
  cursor: pointer;
}

#user {
  margin-right: 0.25em;
}

#playing {
  text-decoration: underline;
}

#playing:hover {
  color: forestgreen;
  background-color: rgba(153, 255, 153, 0.25);
  cursor: pointer;
}

.playing-flex-container {
  border: 2px solid;
  border-radius: 1em;
  display: flex;
  flex-direction: row;
  width: 70%;
  margin: 0 auto;
  padding-left: 1em;
  padding-right: 1em;
  background-color: honeydew;
}
</style>