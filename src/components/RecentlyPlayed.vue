<template>
  <div>
    <h3 id="recentHeader">20 most recently played tracks</h3>
    <span v-if="this.recentlyPlayed.length > 0">
      <ul class="recent-list">
        <li class="item" v-for="t in recentlyPlayed" :key="t.played_at">
          <span class="link" @click="link(t.track.name, t.track.artists[0].name, t.track.uri, t.track.album.images[0].url)">{{ t.track.name }} by {{ t.track.artists[0].name }}</span>
        </li>
      </ul>
    </span>
    <span v-else>Loading recently played tracks...</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      recentlyPlayed: [],
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
      if (mutation.type === "setRecentlyPlayed") {
        this.recentlyPlayed = this.$store.getters.getRecentlyPlayed;
      }
    });
    this.recentlyPlayed = this.$store.getters.getRecentlyPlayed;
    this.timer = setInterval(() => {
      this.$store.dispatch("requestRecentlyPlayed");
    }, 180000);
  },
  destroyed() {
    clearInterval(this.timer);
  }
}
</script>
<style>
#recentHeader {
  text-align: left;
}

.recent-list {
  text-align: left;
  width: 75%;
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