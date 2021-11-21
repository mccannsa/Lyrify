<template>
  <div>
    <Playing />
    <RecentlyPlayed />
  </div>
</template>
<script>
import Playing from "../components/Playing.vue"
import RecentlyPlayed from "../components/RecentlyPlayed.vue"
export default {
  name: "Overview",
  components: {
    Playing,
    RecentlyPlayed
  }
}
</script>