<template>
  <div>
    <span v-if="this.goodState">Logged in to Spotify. Redirecting to Lyrify...</span>
    <span v-else>Error retrieving Spotify authorization.</span>
  </div>
</template>
<script>
export default {
  computed: {
    params() {
      return new URLSearchParams(window.location.search);
    },
    code() {
      return this.params.get("code");
    },
    state() {
      return this.params.get("state");
    },
    goodState() {
      return this.$store.state.spotify.authState === this.state;
    }
  },
  created() {
    if (this.goodState) {
      this.$store.commit("setAuthorization", this.code);
      this.getToken();
      this.$router.push("/playing");
    } else {
      console.log("MISMATCHED STATE")
    }
  },
  methods: {
    async getToken() {
      await this.$store.dispatch("requestToken");
      await this.$store.dispatch("requestRefreshToken");
    },
    generateRandomString(length) {
      var result = "";
      var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
  }
}
</script>