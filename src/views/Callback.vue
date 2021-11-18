<template>
  <div>
    <p>{{ this.$store.state.authorization }}</p>
    <p>{{ this.goodState }}</p>
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
      return this.$store.state.authState === this.state;
    }
  },
  created() {
    console.log(this.$store.state.authState);
    console.log(this.state);
    if (this.goodState) {
      this.$store.commit("setAuthorization", this.code)
    }
    console.log(this.$store.state.authorization);
    console.log(this.code);
  }
}
</script>