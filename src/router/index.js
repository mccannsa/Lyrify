import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue"
import Spotify from "../views/Spotify.vue"
import Overview from "../views/Overview.vue"
import Lyrics from "../views/Lyrics.vue"
import store from "../store"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/spotify",
    name: "spotify",
    component: Spotify
  },
  {
    path: "/overview",
    name: "overview",
    component: Overview,
    beforeEnter: async (to, from, next) => {
      await store.dispatch("requestRecentlyPlayed");
      next();
    }
  },
  {
    path: "/lyrics/:artist/:track",
    name: "lyrics",
    component: Lyrics,
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
