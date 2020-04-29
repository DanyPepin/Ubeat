<template>
  <div>
    <b-field>
      <b-input placeholder="Enter a track name" v-model="term"> </b-input>
      <b-button type="search" v-on:click="search" class="button is-primary"
        >Search</b-button
      >
    </b-field>
    <div>
      <div v-for="(result, index) in paginatedResults" :key="index">
        <div class="aResult">
          <h3>{{ result.trackName }}</h3>
          <h4>{{ result.artistName }}</h4>
          <img :src="result.artworkUrl100" class="center" />
          <br clear="left" />
          <b-button
            @click="$emit('addTrack', result)"
            size="is-small"
            icon-left="plus-circle"
            class="button is-primary center"
          >
            Add to playlist
          </b-button>
        </div>
      </div>

      <div v-if="noResults">
        Sorry, but no results were found. I blame Apple.
      </div>

      <div v-if="searching">
        <i>Searching...</i>
      </div>
    </div>
    <b-pagination :total="total" :current.sync="current" :per-page="perPage">
    </b-pagination>
  </div>
</template>

<script>
import * as apiPlaylist from "../api/apiPlaylist";

export default {
  props: ["addTrack"],
  data: () => ({
    term: "",
    results: [],
    noResults: false,
    searching: false,
    trackName: "",
    tracksList: [],

    current: 1,
    perPage: 5
  }),
  computed: {
    total() {
      return this.results.length;
    },

    paginatedResults() {
      let page_number = this.current - 1;

      return this.results.slice(
        page_number * this.perPage,
        (page_number + 1) * this.perPage
      );
    }
  },
  methods: {
    search() {
      if (this.term !== "") {
        this.results = [];
        this.searching = true;
        apiPlaylist
          .searchTrack(this.term)
          .then(res => {
            if (res.status != 401) {
              this.searching = false;
              this.results = res;
              this.noResults = this.results.length === 0;
            }
          })
          .catch(() => {
            this.$router.push("/login");
          });
      }
    }
  },
  addTrack(result) {
    this.$emit("addTrack", result);
  }
};
</script>
<style scoped>
.aResult {
  margin: 1em;
}
h3 {
  font-weight: bold;
  text-align: center;
}
h4 {
  text-align: center;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 10%;
}
</style>
