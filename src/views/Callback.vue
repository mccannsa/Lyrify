<template>
  <div>
    <p>{{ this.$store.state.spotify.authorization }}</p>
    <p>{{ this.goodState }}</p>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs"

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
      var form = {
          code: this.$store.state.spotify.authorization,
          redirect_uri: this.$store.state.spotify.redirect_uri,
          grant_type: 'authorization_code'
      };
      const data = qs.stringify(form)

      var authOptions = {
        headers: {
          'Authorization': 'Basic ' + Buffer.from(`${this.$store.state.spotify.client_id}:${this.$store.state.spotify.client_secret}`, "utf-8").toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        json: true
      };

      await axios.post('https://accounts.spotify.com/api/token', data, authOptions)
      .then((res) => {
        this.$store.commit("setToken", res.data.access_token);
        this.$store.commit("setRefreshToken", res.data.refresh_token);
        this.$router.push("/playing");
      })
      .catch((error) => {
        console.error(error);
      })
    }
  }
}
</script>