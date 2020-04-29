<template>
  <div id="app">
    <nav-menu></nav-menu>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";

export default {
  name: "app",
  components: {
    "nav-menu": Navigation
  }
};
</script>

<style>
#container {
  margin: 1em;
}

#itunesLogoArtist {
  display: inline-block;
  overflow: hidden;
  background: url(https://linkmaker.itunes.apple.com/embed/v1/app-icon.svg?hex=3083E6)
    no-repeat;
  width: 40px;
  height: 40px;
}
</style>
