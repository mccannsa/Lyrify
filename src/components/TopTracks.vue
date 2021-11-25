<template>
  <div>
    <h3>Top tracks this past month</h3>
    <span v-if="this.topTracks.length > 0">
      <ul>
        <li v-for="t in topTracks" :key="t.played_at">
          <span class="link" @click="link(t.name, t.artists[0].name)">{{ t.name }} by {{ t.artists[0].name }}</span>
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
    link(track, artist) {
      this.$router.push({ name: "lyrics", params: { track: track, artist: artist }});
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
.link {
  text-decoration: underline;
}

.link:hover {
  color: forestgreen;
  cursor: pointer;
}
</style>