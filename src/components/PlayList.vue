<template>
  <div id="container">
    <div class="tile is-ancestor">
      <div class="tile is-5 is-parent">
        <div class="tile is-child box">
          <p class="title">{{ emailOwner }}'s Playlists</p>
        </div>
      </div>
    </div>
    <h3>Create new playlist</h3>
    <b-field>
      <b-input placeholder="New Playlist" v-model="namePlayList"> </b-input>
      <b-button type="is-success" v-on:click="newPlaylist">Create</b-button>
    </b-field>
    <h3 v-if="Object.entries(this.selected).length !== 0">
      Edit name of "{{ selected.name }}"
    </h3>
    <h3 v-else>Select a playlist to do these actions</h3>
    <b-field>
      <b-input placeholder="Edit name" v-model="editedName"> </b-input>
      <b-button
        type="is-info"
        @click="editPlayListName"
        :disabled="Object.entries(this.selected).length === 0"
        >Edit</b-button
      >
      <b-button
        type="is-danger"
        @click="deletePlaylist"
        :disabled="Object.entries(this.selected).length === 0"
        >Delete playlist</b-button
      >
    </b-field>
    <b-tabs @change="onChange">
      <b-tab-item label="Playlists">
        <b-button
          type="is-warning"
          rounded
          @click="selected = {}"
          :disabled="Object.entries(this.selected).length === 0"
        >
          Clear selected
        </b-button>
        <b-table
          :data="playlists"
          :columns="columns"
          :selected.sync="selected"
          focusable
        >
        </b-table>
      </b-tab-item>

      <b-tab-item
        label="Tracks"
        :disabled="Object.entries(this.selected).length === 0"
      >
        <PlaylistTracks
          v-bind:playlistSelected="selected"
          v-bind:tracksList="tracksList"
          v-bind:trackSelected="trackSelected"
          @deleteTrack="deleteTrack"
        />
      </b-tab-item>
      <b-tab-item
        label="Add new tracks"
        :disabled="Object.entries(this.selected).length === 0"
      >
        <addTracksPlaylist @addTrack="addTrack" />
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import * as apiPlaylist from "../api/apiPlaylist";
import PlaylistTracks from "./PlaylistTracks";
import addTracksPlaylist from "./addTracksPlaylist";
import * as apiUser from "../api/apiUser";
import Cookies from "js-cookie";

export default {
  components: {
    PlaylistTracks,
    addTracksPlaylist
  },
  data: () => ({
    namePlayList: "",
    editedName: "",
    playlists: [],
    emailOwner: "",
    userId: "",
    columns: [
      {
        field: "name",
        label: "Playlist Name"
      }
    ],
    selected: {},

    tracksList: [],
    trackSelected: {}
  }),
  methods: {
    addTrack(track) {
      apiPlaylist.addTrack(this.selected.id, track);
      this.$buefy.toast.open({
        duration: 5000,
        message: `Track added to playlist`,
        type: "is-success"
      });
    },
    //en changeant de tab, si cest le 2e onglet, ca va charger les tracks de la playlist
    onChange(value) {
      if (value === 1 || value === 2) {
        this.getTracks();
      }
    },
    newPlaylist() {
      if (this.namePlayList !== "") {
        apiPlaylist
          .newPlaylist(this.namePlayList, this.emailOwner)
          .then(playlist => {
            this.playlists.push(playlist);
          })
          .then(() => {
            this.$buefy.toast.open({
              duration: 5000,
              message: `New playlist created`,
              type: "is-success"
            });
            this.namePlayList = "";
          });
      }
    },
    editPlayListName() {
      if (this.editedName !== "") {
        apiPlaylist
          .editPlaylistName(
            this.selected.id,
            this.editedName,
            this.selected.owner.email
          )
          .then(() => {
            this.selected.name = this.editedName;
            this.editedName = "";
            this.selected = {};

            this.$buefy.toast.open({
              duration: 5000,
              message: `Playlist's name has been changed`,
              type: "is-success"
            });
          });
      }
    },

    deletePlaylist() {
      apiPlaylist.deletePlaylist(this.selected.id).then(() => {
        this.playlists = this.playlists.filter(
          playlist => playlist.id !== this.selected.id
        );
        this.selected = {};
        this.$buefy.toast.open({
          duration: 5000,
          message: `Playlist deleted`,
          type: "is-success"
        });
      });
    },

    getTracks() {
      apiPlaylist
        .getTracksFromPlaylist(this.selected.id)
        .then(tracks => (this.tracksList = tracks.tracks));
    },
    deleteTrack(trackId) {
      apiPlaylist
        .deleteTrackFromPlaylist(this.selected.id, trackId)
        .then(() => {
          this.tracksList = this.tracksList.filter(
            track => track.id !== this.trackSelected.id
          );
          this.trackSelected = {};
        })
        .then(() => this.getTracks());
    }
  },
  created() {
    apiUser
      .getTokenInfos(Cookies.get("token"))
      .then(res => {
        this.emailOwner = res["email"];
        this.userId = res["id"];
        apiPlaylist.getPlaylists(this.userId).then(playlists => {
          this.playlists = playlists;
        });
      })
      .catch(() => {
        this.$router.push("/login");
      });
  }
};
</script>
