<template>
  <div id="app">
    <b-field>
      <b-input placeholder="Enter a track name" v-model="term"> </b-input>
      <b-button type="search" v-on:click="search" class="button is-primary"
        >Search</b-button
      >
    </b-field>
    <div v-for="result in results" :key="result.trackId" class="result">
      <img :src="result.artworkUrl100" />
      <b>Track:</b> {{ result.trackName }}<br />
      <br clear="left" />
      <b-button
        @click="$emit('addTrack', result)"
        size="is-small"
        icon-left="plus-circle"
      >
        Add to playlist
      </b-button>
    </div>

    <div v-if="noResults">
      Sorry, but no results were found. I blame Apple.
    </div>

    <div v-if="searching">
      <i>Searching...</i>
    </div>
  </div>
</template>

<script>
//import * as apiPlaylist from "../api/apiPlaylist";
export default {
  props: ["addTrack"],
  data: () => ({
    term: "",
    results: [],
    noResults: false,
    searching: false,
    trackName: "",
    tracksList: []
  }),
  methods: {
    search() {
      this.results = [];
      this.searching = true;
      fetch(
        `http://ubeat.herokuapp.com/unsecure/search/tracks?q=${encodeURIComponent(
          this.term
        )}&limit=10&media=music`
      )
        .then(res => res.json())
        .then(res => {
          this.searching = false;
          this.results = res.results;
          this.noResults = this.results.length === 0;
        });
    }
  },
  addTrack(result) {
    this.$emit("addTrack", result);
  },
  updateCart(e) {
    this.tracksList.push(e);
  }
};
</script>

<style></style>
