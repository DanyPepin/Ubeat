import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Album from "@/components/Album";
import Artist from "@/components/Artist";
import PlayList from "@/components/PlayList";
import User from "@/components/User";
import SearchResult from "@/components/SearchResult";
import SignUp from "@/components/SignUp";
import Login from "@/components/Login";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/artist/:artistId",
      name: "Artist",
      component: Artist
    },
    {
      path: "/album/:collectionId",
      name: "Album",
      component: Album
    },
    {
      path: "/playList",
      name: "PlayList",
      component: PlayList
    },
    {
      path: "/search/:type/:query",
      name: "Search",
      component: SearchResult
    },
    {
      path: "/user/:userId",
      name: "User",
      component: User
    },
    {
      path: "/signup",
      name: "SignUp",
      component: SignUp
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    }
  ]
});
