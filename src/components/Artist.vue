<template>
  <div id="container">
    <ArtistCard v-bind:artist="artist" />
    <b-collapse
      class="card"
      animation="slide"
      aria-id="contentIdForA11y3"
      :open="false"
    >
      <div
        slot="trigger"
        slot-scope="props"
        class="card-header"
        role="button"
        aria-controls="contentIdForA11y3"
      >
        <p class="card-header-title">
          Biography
        </p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
        </a>
      </div>
      <div class="card-content">
        <div class="content">
          {{ biography }}
        </div>
      </div>
    </b-collapse>
    <br />

    <h2>Albums</h2>
    <b-carousel progress progress-type="is-info">
      <b-carousel-item v-for="(album, i) in listAlbums" :key="i">
        <section :class="`is-medium`">
          <div class="center">
            <img
              :src="album.artworkUrl100"
              alt="Placeholder image"
              class="album"
            />
            <div class="hero-body has-text-centered">
              <h1 class="title">{{ album.collectionName }}</h1>
            </div>
          </div>
        </section>
      </b-carousel-item>
    </b-carousel>
    <br />
    <br />
    <p class="title is-5">Similar to this artist...</p>
    <b-taglist>
      <b-tag
        v-for="(similar, i) in similarArtists"
        :key="i"
        type="is-info"
        size="is-large"
      >
        <b-button
          type="is-info"
          tag="router-link"
          :to="{
            name: 'Search',
            params: { type: 'Artists', query: similar.name }
          }"
          ><b-icon icon="magnify"></b-icon></b-button
        >{{ similar.name }}</b-tag
      >
    </b-taglist>
  </div>
</template>

<script>
import ArtistCard from "./ArtistCard";
import * as apiArtist from "../api/apiArtist";

export default {
  components: {
    ArtistCard
  },
  data: () => ({
    listAlbums: [],
    artistId: 0,
    artist: {},
    test: 0,
    artistName: "",
    //pour api externe
    similarArtists: [],
    biography: {}
  }),
  async created() {
    this.artistId = this.$route.params.artistId;
    try {
      this.listAlbums = await apiArtist.getArtistAlbums(this.artistId);
      var results = await apiArtist.getArtist(this.artistId);
      this.artist = results[0];
      this.artistName = results[0].artistName;
      var artistInfo = await apiArtist.getInfoArtist(this.artist.artistName);
      this.biography = artistInfo.artist.bio.content;
      this.similarArtists = artistInfo.artist.similar.artist;
    } catch (e) {
      this.$router.push("/login");
    }
  },
  methods: {
    info(value) {
      this.test = value;
    }
  }
};
</script>

<style>
.center {
  display: block;
  text-align: center;
}
.album {
  width: 250px !important;
}
p.subtitle {
  margin-top: 0 !important;
}

@media screen and (max-width: 800px) {
  #itunesLogoArtist {
    display: block;
  }
  p.title {
    text-align: center;
  }
  p.subtitle {
    text-align: center;
  }
}
</style>
