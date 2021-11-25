<template>
  <div>
    <div class="flex-container">
      <p id="user">Hello, <span id="displayName" @click="overview()">{{ this.displayName }}</span>.</p>
      <Playing />
    </div>
    <div class="flex-container">
      <RecentlyPlayed />
      <TopTracks />
    </div>
  </div>
</template>
<script>
import Playing from "../components/Playing.vue"
import RecentlyPlayed from "../components/RecentlyPlayed.vue"
import TopTracks from "../components/TopTracks.vue"
export default {
  name: "Overview",
  components: {
    Playing,
    RecentlyPlayed,
    TopTracks
  },
  computed: {
    displayName() {
      return this.$store.getters.getDisplayName;
    }
  },
  methods: {
    overview() {
      this.$router.push("/overview");
    }
  },
  async beforeCreate() {
    this.$store.dispatch("requestDisplayName");
  }
}
</script>
<style>
.flex-container {
  display: flex;
  flex-direction: row;
  width: 70%;
  margin: 0 auto;
}

#user {
  margin-right: 5px;
}

#playing {
  text-align: right;
}

#displayName {
  font-weight: bold;
}

#displayName:hover {
  color: forestgreen;
  background-color: rgba(153, 255, 153, 0.25);
  cursor: pointer;
}
</style>