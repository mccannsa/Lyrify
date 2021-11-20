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
  methods: {
    requestAuthorization() {
      this.$store.dispatch("requestAuthorization", this.generateRandomString(16));
      this.$router.push("/spotify")
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
  },
  beforeCreate() {
    if (this.$store.state.spotify.token !== "") {
      this.$router.push("/playing");
    }
  }
}
</script>