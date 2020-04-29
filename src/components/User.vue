<template>
  <div id="container">
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <div class="tile is-child box">
          <p class="title">
            <b-icon icon="account" size="is-medium"> </b-icon> {{ user.name }}'s
            profile
          </p>
          <p class="subtitle is-5">email: {{ user.email }}</p>
          <b-button
            v-if="isCurrentUser === false"
            type="is-success"
            @click="followUser(userId)"
          >
            <b-icon icon="account-plus"></b-icon>
            <span>Follow </span>
          </b-button>
          <b-button
            v-if="isCurrentUser === false"
            type="is-danger"
            @click="unfollowUser(userId)"
          >
            <b-icon icon="account-minus"></b-icon>
            <span>Unfollow</span>
          </b-button>
        </div>
      </div>
    </div>

    <b-tabs type="is-boxed">
      <b-tab-item label="Playlists" icon="library-music">
        <div v-if="playlists.length > 0">
          <b-table :data="playlists" :columns="columnsPlaylists" focusable>
          </b-table>
        </div>
        <div v-else>
          <h3>This user has no playlist</h3>
        </div>
      </b-tab-item>

      <b-tab-item label="Friends" icon="account-group">
        <div v-if="friends.length > 0">
          <b-table :data="friends" :columns="columnsFriends" focusable>
          </b-table>
        </div>
        <div v-else>
          <h3>This user has no friends. Please do not judge him/her/it.</h3>
        </div>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import * as apiUser from "../api/apiUser";
import * as apiPlaylist from "../api/apiPlaylist";
import Cookies from "js-cookie";
export default {
  data: () => ({
    isCurrentUser: false,
    userId: "",
    user: {},

    playlists: [],
    columnsPlaylists: [
      {
        field: "name",
        label: "Playlist Name"
      }
    ],

    friends: [],
    columnsFriends: [
      {
        field: "name",
        label: "Name"
      },
      {
        field: "email",
        label: "Email"
      }
    ]
  }),
  methods: {
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
    },

    unfollowUser(userId) {
      apiUser
        .unfollowUser(userId)
        .then(res => {
          if (res === false) {
            this.$buefy.toast.open({
              duration: 5000,
              message: `You are not following this user`,
              position: "is-top",
              type: "is-danger"
            });
          } else {
            this.$buefy.toast.open({
              duration: 5000,
              message: `User is now being un-followed`,
              position: "is-top",
              type: "is-success"
            });
          }
        })
        .catch(() => {
          this.$router.push("/login");
        });
    },

    setUpPage() {
      apiUser
        .getUser(this.userId)
        .then(res => {
          this.user = res;
          this.friends = res.following;
        })
        .catch(() => this.$router.push("/login"));

      apiPlaylist
        .getPlaylists(this.userId)
        .then(playlists => (this.playlists = playlists))
        .catch(() => this.$router.push("/login"));

      apiUser.getTokenInfos(Cookies.get("token")).then(res => {
        if (res["id"] == this.userId) {
          this.isCurrentUser = true;
        }
      });
    }
  },
  created() {
    if (this.$route.params.userId === "MyProfile") {
      apiUser
        .getTokenInfos(Cookies.get("token"))
        .then(res => {
          this.userId = res["id"];
          this.setUpPage();
        })
        .catch(() => {
          this.$router.push("/login");
        });
    } else {
      this.userId = this.$route.params.userId;
      this.setUpPage();
    }
  }
};
</script>
