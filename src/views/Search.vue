<template>
  <div>
    <h3 id="searchHeader">Search Results for: {{ this.artist }} + {{ this.track }}</h3>
    <span v-if="this.searchResults.length > 0">
      <ul class="search-list">
        <li class="item" v-for="t in searchResults" :key="t.id">
          <span class="link" @click="link(t.name, t.artists[0].name, t.uri, t.album.images[0].url)">{{ t.name }} by {{ t.artists[0].name }}</span>
        </li>
      </ul>
    </span>
    <span v-else>Loading search results...</span><br>
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
      searchResults: []
    }
  },
  methods: {
    link(track, artist, uri, img) {
      this.$router.push({ name: "lyrics", params: { track: track, artist: artist, uri: uri, img: img }});
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  async beforeCreate() {
    this.$store.subscribe(async (mutation) => {
      if (mutation.type === "setSearchResults") {
        this.searchResults = this.$store.getters.getSearchResults;
      }
    });
    this.searchResults = this.$store.getters.getSearchResults;
  }
}
</script>
<style>
.search-list {
  width: 50%;
  margin: 0 auto;
}
</style>