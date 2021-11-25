<template>
  <div>
    <Playing />
    <RecentlyPlayed />
    <TopTracks />
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
  }
}
</script>