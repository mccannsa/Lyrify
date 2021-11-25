<template>
  <div>
    <div class="lyric-flex-container">
      <img :src="this.img" width="150" height="150" alt="Album Art">
      <div>
        <p class="head">
          <strong>{{ this.track }}</strong><br>
          by <em>{{ this.artist }}</em>
        </p>
        <div class="buttons">
          <button @click="playTrack()">Play</button>
          <button @click="openLyrics()" :disabled="!this.url">Open Lyrics</button>
        </div>
      </div>
    </div>
    <button @click="goBack()">Back</button>
  </div>
</template>
<script>
export default {
  props: {
    track: null,
    artist: null,
    uri: null,
    img: null
  },
  data() {
    return {
      url: null
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async playTrack() {
      await this.$store.dispatch("playTrack", { uri: this.uri });
    },
    async openLyrics() {
      if (this.url) {
        window.open(this.url, "_blank");
      }
    }
  },
  async beforeMount() {
    await this.$store.dispatch("getSongLyrics", { track: this.track, artist: this.artist });
    this.url = this.$store.getters.getLyricsPage;
  }
}
</script>
<style>
.lyric-flex-container {
  display: flex;
  flex-direction: row;
  max-width: 35em;
  width: fit-content;
  margin: 2em auto;
}

.head {
  text-align: left;
  margin-left: 1em;
  margin-top: 0;
}

.buttons {
  display: flex;
  flex-direction: row;
  margin: 1em;
}

img {
  border: 2px solid black;
}
</style>