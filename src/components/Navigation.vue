<template>
  <b-navbar :shadow="true" class="is-dark" id="navbar">
    <template slot="brand">
      <b-navbar-item tag="router-link" to="/" id="brand">
        UBEAT
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-field class="searchbox">
        <b-input
          v-model="query"
          placeholder="Search..."
          type="search"
          icon="magnify"
        ></b-input>
      </b-field>
      <b-select
        class="searchbox"
        v-model="optionSearchSelected"
        placeholder="Select a name"
      >
        <option
          v-for="option in typeSearch"
          :value="option.type"
          :key="option.id"
        >
          {{ option.type }}
        </option>
      </b-select>
      <p class="searchbox">
        <b-button
          :disabled="Object.entries(optionSearchSelected).length === 0"
          class="button is-primary"
          tag="router-link"
          :to="{
            name: 'Search',
            params: { type: optionSearchSelected, query: query }
          }"
        >
          Search
        </b-button>
      </p>
    </template>
    <template slot="end">
      <b-navbar-item class="link" tag="router-link" to="/">Home</b-navbar-item>
      <b-navbar-item class="link" tag="router-link" to="/playList"
        >Playlists</b-navbar-item
      >
      <b-navbar-item class="link" tag="router-link" to="/user/MyProfile"
        >My profile</b-navbar-item
      >
      <b-navbar-item class="link" tag="router-link" to="/signup"
        >Sign up
      </b-navbar-item>
      <b-navbar-item class="link" tag="router-link" to="/login"
        >Login
      </b-navbar-item>
      <b-navbar-item @click="logout">Logout</b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import * as apiUser from "../api/apiUser";

export default {
  data: () => ({
    query: "",
    optionSearchSelected: {},
    typeSearch: [
      { id: 1, type: "All" },
      { id: 2, type: "Artists" },
      { id: 3, type: "Albums" },
      { id: 4, type: "Tracks" },
      { id: 5, type: "Users" }
    ]
  }),
  methods: {
    logout() {
      apiUser.logout().then(() => {
        this.$buefy.toast.open({
          duration: 5000,
          message: `Disconnected`,
          position: "is-top",
          type: "is-success"
        });
        if (this.$route.path != "/login") {
          this.$router.push("/login");
        }
      });
    }
  }
};
</script>

<style>
.searchbox {
  display: inline-block;
  padding-top: 3%;
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (-webkit-min-device-pixel-ratio: 1.5) {
  #navbar {
    min-height: 20px !important;
    height: 40px;
  }

  .navbar-burger {
    min-height: 35px !important;
    height: 35px !important;
  }
}
</style>
