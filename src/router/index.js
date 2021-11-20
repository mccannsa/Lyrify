import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue"
import Spotify from "../views/Spotify.vue"
import Overview from "../views/Overview.vue"

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
    component: Overview
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
