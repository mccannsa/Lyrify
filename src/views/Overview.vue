<template>
  <div>
    <div class="flex-container">
      <RecentlyPlayed />
      <TopTracks />
    </div>
  </div>
</template>
<script>
import RecentlyPlayed from "../components/RecentlyPlayed.vue"
import TopTracks from "../components/TopTracks.vue"
export default {
  name: "Overview",
  components: {
    RecentlyPlayed,
    TopTracks
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
</style>