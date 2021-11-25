<template>
  <div>
    <div>
      <p>{{ this.track }} by {{ this.artist }} <button @click="playTrack()">Play</button> <button @click="openLyrics()" :disabled="!this.url">Open Lyrics</button></p>
    </div>
    <p v-if="!this.url"><i>Lyric page not found</i></p>
    <button @click="goBack()">Back</button>
  </div>
</template>
<script>
export default {
  props: {
    track: null,
    artist: null,
    uri: null
  },
  data() {
    return {
      url: null
    }
  },
  methods: {
    goBack() {
      this.$router.push("/overview");
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