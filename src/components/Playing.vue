<template>
  <div class="playing-flex-container">
    <div class="playing">
      <p id="user">Hello, <span id="displayName" @click="overview()">{{ this.displayName }}</span>.</p>
      <p v-if="this.track">
        You're listening to:
        <span id="playing" @click="link(track.name, track.artists[0].name, track.uri, track.album.images[0].url)">{{ this.desc | ellipsis }}</span>
      </p>
      <p v-else>Not playing</p>
    </div>
    <div class="search">
      <input type="text" cols="5" v-model="search" />
      <button @click="doSearch()">Search</button>
    </div>
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
      timer: -1,
      search: null
    }
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
    link(track, artist, uri, img) {
      this.$router.push({ name: "lyrics", params: { track: track, artist: artist, uri: uri, img: img }});
    },
    overview() {
      this.$router.push("/overview");
    },
    doSearch() {
      this.$store.dispatch("searchForTrack", { search: this.search });
      this.$router.push({ name: "search", params: { search: this.search }});
      this.search = null;
    }
  },
  filters: {
    ellipsis: (value) => {
      if (value.length > 70) {
        return value.slice(0,67) + "...";
      } else {
        return value;
      }
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
  border-radius: 0.5em;
  display: flex;
  flex-direction: row;
  width: 70%;
  margin: 0 auto;
  padding-left: 1em;
  padding-right: 1em;
  background-color: honeydew;
}

.playing {
  display: flex;
  flex-direction: row;
  max-width: 50em;
  width: fit-content;
}

.search {
  width: fit-content;
  margin-right: 0;
  margin-left: auto;
  margin-top: 1em;
}
</style>