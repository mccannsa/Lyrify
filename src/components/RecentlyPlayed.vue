<template>
  <div>
    <h3>20 most recently played tracks</h3>
    <span v-if="this.recentlyPlayed.length > 0">
      <ul>
        <li v-for="t in recentlyPlayed" :key="t.played_at">
          <span><a :href="t.lyrics" target="_blank">{{ t.track.name }} by {{ t.track.artists[0].name }}</a></span>
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
  async beforeCreate() {
    this.$store.subscribe(async (mutation) => {
      if (mutation.type === "setRecentlyPlayed") {
        this.recentlyPlayed = this.$store.getters.getRecentlyPlayed;
      };
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