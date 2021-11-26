<template>
  <div>
    <div class="flex-container">
      <RecentlyPlayed id="rp-comp"/>
      <TopTracks id="tt-comp"/>
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

#rp-comp {
  max-width: 50%;
  width: fit-content;
  margin: 0 auto;
}

#tt-comp {
  max-width: 50%;
  width: fit-content;
  margin: 0 auto;
}
</style>