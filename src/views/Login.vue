<template>
  <div class="login">
    <button @click="requestAuthorization">Login to Spotify</button>
  </div>
</template>

<script>
export default {
  name: "Login",
  methods: {
    requestAuthorization() {
      let state = this.generateRandomString(16);
      let scope = "user-read-currently-playing user-read-recently-played";
      window.location.href = "https://accounts.spotify.com/authorize?" +
        `response_type=code&` +
        `client_id=${this.$store.state.spotify.client_id}&` +
        `scope=${scope}&` +
        `redirect_uri=${this.$store.state.spotify.redirect_uri}&` +
        `state=${state}`;
    },
    generateRandomString(length) {
      var result = "";
      var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
  }
}
</script>