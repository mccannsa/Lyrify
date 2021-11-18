<template>
  <div class="login">
    <button @click="requestAuthorization()">Login to Spotify</button>
  </div>
</template>

<script>
export default {
  name: "Login",
  computed: {
    state() {
      return this.generateRandomString(16);
    }
  },
  methods: {
    requestAuthorization() {
      this.$store.commit("setAuthState", this.state);
      let scope = "user-read-currently-playing user-read-recently-played";
      window.open("https://accounts.spotify.com/authorize?" +
        `response_type=code&` +
        `client_id=${this.$store.state.client_id}&` +
        `scope=${scope}&` +
        `redirect_uri=${this.$store.state.redirect_uri}&` +
        `state=${this.state}`, "_target");
      this.$router.push("/callback")
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