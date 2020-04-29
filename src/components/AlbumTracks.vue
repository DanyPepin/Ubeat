<template>
  <div>
    <div class="level">
      <div class="level-left box">
        <div class="level-item">
          <p v-if="Object.entries(selected).length === 0" class="subtitle is-4">
            Select a song to play
          </p>
          <p v-else class="subtitle is-4">{{ this.selected.trackName }}</p>
        </div>
        <div class="level-item">
          <SongPlayer
            :key="this.selected.previewUrl"
            v-bind:previewUrl="this.selected.previewUrl"
          ></SongPlayer>
        </div>
      </div>
    </div>
    <b-table :data="tracks" hoverable striped :selected.sync="selected">
      <template slot-scope="props">
        <b-table-column field="trackNumber" label="No">
          {{ props.row.trackNumber }}
        </b-table-column>
        <b-table-column field="trackName" label="Track Name">
          {{ props.row.trackName }}
        </b-table-column>
        <b-table-column field="trackTimeMillis" label="Song Length ">
          <span>
            {{
              Math.round((props.row.trackTimeMillis / 1000 / 60) * 100) / 100
            }}
            min
          </span>
        </b-table-column>
      </template>
    </b-table>
    <div>
      <b-field label="Choose a playlist to add songs">
        <b-select placeholder="Playlist" v-model="selectedOption" expanded>
          <option
            v-for="playlist in playlists"
            :value="playlist.id"
            :key="playlist.id"
          >
            {{ playlist.name }}
          </option>
        </b-select>
      </b-field>
      <b-button
        type="is-info"
        style="margin-right: 7px"
        @click="addTrack"
        :disabled="
          Object.entries(this.selected).length === 0 ||
            Object.entries(this.selectedOption).length === 0
        "
        >Add Song</b-button
      >

      <b-button
        type="is-info"
        style="margin-right: 7px"
        @click="addAlbum"
        :disabled="Object.entries(this.selectedOption).length === 0"
        >Add Album</b-button
      >
    </div>
  </div>
</template>

<script>
import * as apiPlaylist from "../api/apiPlaylist";
import * as apiUser from "../api/apiUser";
import SongPlayer from "./SongPlayer";
import Cookies from "js-cookie";

export default {
  components: {
    SongPlayer
  },

  props: ["tracks"],

  data: () => ({
    //Data for b-table
    selected: {},

    //Data for playlist selector
    playlists: [], //liste des playlist
    selectedOption: {}, //va avoir le id de la playlist selectionnée
    userId: "5aa9dc9f297d410004d81724" //pour les requetes !!!!
  }),

  created() {
    apiUser.getTokenInfos(Cookies.get("token")).then(res => {
      this.userId = res["id"];
      apiPlaylist
        .getPlaylists(this.userId)
        .then(playlists => (this.playlists = playlists));
    });
  },

  methods: {
    addTrack() {
      apiPlaylist
        .addTrack(this.selectedOption, this.selected)
        .then(() => {
          this.$buefy.toast.open({
            duration: 5000,
            message: `song added to playlist`,
            type: "is-success"
          });
        })
        .catch(() => {
          this.$router.push("/login");
        });
    },
    addAlbum() {
      apiUser
        .getTokenInfos(Cookies.get("token"))
        .then(res => {
          if (res.status != 401) {
            for (let i = 0; i < this.tracks.length; i++) {
              apiPlaylist.addTrack(this.selectedOption, this.tracks[i]);
            }
          }
        })
        .then(() => {
          this.$buefy.toast.open({
            duration: 5000,
            message: `Album added to playlist`,
            type: "is-success"
          });
        })
        .catch(() => {
          this.$router.push("/login");
        });
    }
  }
};
</script>

<style>
.songList {
  border: thin solid #d9d9d9;
}
</style>
