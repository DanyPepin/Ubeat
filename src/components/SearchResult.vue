<template>
  <div>
    <div>
      <div v-for="(result, index) in paginatedResults" :key="index">
        <div class="aResult">
          <div v-if="result.wrapperType == 'track'">
            <b-icon icon="music-note"> </b-icon>
            <h3>Track Name: {{ result.trackName }}</h3>
            <h4>By: {{ result.artistName }}</h4>
            <img :src="result.artworkUrl100" />

            <b-field>
              <b-select placeholder="Playlist" v-model="selectedPlaylist">
                <option
                  v-for="playlist in playlists"
                  :value="playlist.id"
                  :key="playlist.id"
                >
                  {{ playlist.name }}
                </option>
              </b-select>
              <b-button
                type="is-info"
                :disabled="Object.entries(selectedPlaylist).length === 0"
                @click="addTrack(result)"
                >Add Song</b-button
              >
            </b-field>
            <hr class="is-medium" />
          </div>
          <div v-else-if="result.wrapperType == 'artist'">
            <b-icon icon="artist"> </b-icon>
            <h3>{{ result.artistName }}</h3>
            <h4>Genre: {{ result.primaryGenreName }}</h4>
            <b-button
              type="is-info"
              tag="router-link"
              :to="{
                name: 'Artist',
                params: { artistId: result.artistId }
              }"
              >Go to this artist page</b-button
            >
            <hr class="is-medium" />
          </div>

          <div v-else-if="result.wrapperType == 'collection'">
            <b-icon icon="music-box"> </b-icon>
            <div>
              <img :src="result.artworkUrl100" />
              <h3>Album: {{ result.collectionName }}</h3>
              <h4>By: {{ result.artistName }}</h4>
              <h4>Genre: {{ result.primaryGenreName }}</h4>
            </div>
            <b-field>
              <b-select placeholder="Playlist" v-model="selectedPlaylist">
                <option
                  v-for="playlist in playlists"
                  :value="playlist.id"
                  :key="playlist.id"
                >
                  {{ playlist.name }}
                </option>
              </b-select>
              <b-button
                type="is-success"
                :disabled="Object.entries(selectedPlaylist).length === 0"
                @click="addAlbum(result)"
                >Add Album</b-button
              >
            </b-field>

            <b-button
              type="is-info"
              tag="router-link"
              :to="{
                name: 'Album',
                params: { collectionId: result.collectionId }
              }"
              >Go to this album page</b-button
            >
            <hr class="is-medium" />
          </div>

          <div v-else>
            <b-icon icon="account"> </b-icon>
            <h3>{{ result.name }}</h3>
            <h4>email: {{ result.email }}</h4>
            <b-button
              type="is-info"
              tag="router-link"
              :to="{
                name: 'User',
                params: { userId: result.id }
              }"
              >Go to this user page</b-button
            >
            <b-button type="is-success" @click="followUser(result.id)">
              <b-icon icon="account-plus"></b-icon>
              <span>Follow </span>
            </b-button>
            <hr class="is-medium" />
          </div>
        </div>
      </div>
      <div v-if="noResults">
        Sorry, but no results were found, try another search.
      </div>

      <div v-if="searching">
        <b-loading :active.sync="searching"></b-loading>
      </div>
    </div>
    <b-pagination :total="total" :current.sync="current" :per-page="perPage">
    </b-pagination>
  </div>
</template>

<script>
import * as apiSearch from "../api/apiSearch";
import * as apiPlaylist from "../api/apiPlaylist";
import * as apiAlbum from "../api/apiAlbum";
import * as apiUser from "../api/apiUser";
import Cookies from "js-cookie";

export default {
  data: () => ({
    type: "",
    query: "",

    //result
    results: [],
    noResults: false,
    searching: false,
    trackName: "",
    tracksList: [],

    //pagination
    current: 1,
    perPage: 5,

    //Add track to playlist
    playlists: [], //liste des playlist
    selectedPlaylist: {}, //va avoir le id de la playlist selectionnée
    userIdTemporary: "",

    tracksAlbum: []
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
  created() {
    this.type = this.$route.params.type;
    this.query = this.$route.params.query;

    apiUser
      .getTokenInfos(Cookies.get("token"))
      .then(res => {
        (this.userIdTemporary = res["id"]),
          apiPlaylist
            .getPlaylists(this.userIdTemporary)
            .then(playlists => (this.playlists = playlists));
        this.results = [];
        this.searching = true;

        if (
          this.$route.params.type === "All" &&
          this.$route.params.query !== ""
        ) {
          apiSearch.searchAll(this.$route.params.query).then(res => {
            this.manageSearch(res);
          });
        }

        if (
          this.$route.params.type === "Tracks" &&
          this.$route.params.query !== ""
        ) {
          apiSearch.searchTrack(this.$route.params.query).then(res => {
            this.manageSearch(res);
          });
        }
        if (
          this.$route.params.type === "Artists" &&
          this.$route.params.query !== ""
        ) {
          apiSearch.searchArtist(this.$route.params.query).then(res => {
            this.manageSearch(res);
          });
        }

        if (
          this.$route.params.type === "Albums" &&
          this.$route.params.query !== ""
        ) {
          apiSearch.searchAlbum(this.$route.params.query).then(res => {
            this.manageSearch(res);
          });
        }
        if (
          this.$route.params.type === "Users" &&
          this.$route.params.query !== ""
        ) {
          apiSearch.searchUser(this.$route.params.query).then(res => {
            this.manageSearch(res);
          });
        }
      })
      .catch(() => {
        this.$router.push("/login");
      });
  },

  methods: {
    manageSearch(res) {
      this.searching = false;
      this.results = res;
      this.noResults = this.results.length === 0;
    },
    addTrack(result) {
      apiPlaylist.addTrack(this.selectedPlaylist, result).then(() =>
        this.$buefy.toast.open({
          message: `'${result.trackName}' has been added to this playlist`,
          type: "is-success"
        })
      );
    },
    addAlbum(result) {
      apiAlbum
        .getAlbumTracks(result.collectionId)
        .then(results => (this.tracksAlbum = results))
        .then(() => {
          for (let i = 0; i < this.tracksAlbum.length; i++) {
            apiPlaylist.addTrack(this.selectedPlaylist, this.tracksAlbum[i]);
          }
        })
        .then(() =>
          this.$buefy.toast.open({
            message: `'${result.collectionName}' by ${result.artistName} has been added to this playlist`,
            type: "is-success"
          })
        );
    },

    followUser(userId) {
      apiUser
        .followUser(userId)
        .then(res => {
          if (res === false) {
            this.$buefy.toast.open({
              duration: 5000,
              message: `You are already following this user`,
              position: "is-top",
              type: "is-danger"
            });
          } else {
            this.$buefy.toast.open({
              duration: 5000,
              message: `User is now being followed`,
              position: "is-top",
              type: "is-success"
            });
          }
        })
        .catch(() => {
          this.$router.push("/login");
        });
    }
  }
};
</script>
<style scoped>
.aResult {
  margin: 1em;
}
h3 {
  font-weight: bold;
}
</style>
