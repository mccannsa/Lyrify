<template>
  <div>
    <h3 id="topHeader">Top tracks this past month</h3>
    <span v-if="this.topTracks.length > 0">
      <ul class="top-list">
        <li class="item" v-for="t in topTracks" :key="t.played_at">
          <span class="link" @click="link(t.name, t.artists[0].name, t.uri, t.album.images[0].url)">{{ t.name }} by {{ t.artists[0].name }}</span>
        </li>
      </ul>
    </span>
    <span v-else>Loading top tracks...</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      topTracks: [],
      timer: -1
    }
  },
  methods: {
    link(track, artist, uri, img) {
      this.$router.push({ name: "lyrics", params: { track: track, artist: artist, uri: uri, img: img }});
    }
  },
  async beforeCreate() {
    this.$store.subscribe(async (mutation) => {
      if (mutation.type === "setTopTracks") {
        this.topTracks = this.$store.getters.getTopTracks;
      }
    });
    this.topTracks = this.$store.getters.getTopTracks;
    this.timer = setInterval(() => {
      this.$store.dispatch("requestTopTracks");
    }, 180000);
  },
  destroyed() {
    clearInterval(this.timer);
  }
}
</script>
<style>
#topHeader {
  text-align: left;
}

.top-list {
  text-align: left;
}

.item {
  max-width: 75%;
}

.link {
  text-decoration: underline;
  max-width: 25%;
}

.link:hover {
  color: forestgreen;
  background-color: rgba(153, 255, 153, 0.25);
  cursor: pointer;
}
</style>