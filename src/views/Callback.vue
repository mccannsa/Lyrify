<template>
  <div>
    <p>{{ this.$store.state.spotify.authorization }}</p>
    <p>{{ this.goodState }}</p>
  </div>
</template>
<script>
// import axios from "axios";
// import qs from "qs"

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
      this.getToken()
    } else {
      console.log("MISMATCHED STATE")
    }
  },
  methods: {
    async getToken() {
      await this.$store.dispatch("requestToken");
      this.$router.push("/playing");
    }
  }
}
</script>