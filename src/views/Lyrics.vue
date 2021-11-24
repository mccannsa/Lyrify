<template>
  <div>
    <p>{{ this.track }} by {{ this.artist }}</p>
    <p v-if="this.url" ><i>Redirecting to lyric page...</i></p>
    <p v-else><i>Lyric page not found</i></p>
    <button @click="goBack()">Back</button>
  </div>
</template>
<script>
export default {
  props: {
    track: null,
    artist: null
  },
  data() {
    return {
      url: null
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  async beforeMount() {
    await this.$store.dispatch("getSongLyrics", { track: this.track, artist: this.artist });
    this.url = this.$store.getters.getLyricsPage;
    if (this.url) {
      window.open(this.url, "_blank");
    }
  }
}
</script>