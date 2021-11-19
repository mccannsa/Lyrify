<template>
  <div class="login">
    <h2>Welcome to Lyrify!</h2>
    <p><i>Get lyrics to what you're listening to on Spotify.</i></p>
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
      let scope = "user-read-private user-read-currently-playing user-read-recently-played";
      window.location.href = "https://accounts.spotify.com/authorize?" +
        `response_type=code&` +
        `client_id=${this.$store.state.spotify.client_id}&` +
        `scope=${scope}&` +
        `redirect_uri=${this.$store.state.spotify.redirect_uri}&` +
        `state=${this.state}`;
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