<template>
  <div id="container">
    <h1>Album page</h1>
    <div class="tile is-ancestor">
      <div class="tile is-parent" id="tileAlbumName">
        <div class="tile is-child box">
          <div class="level">
            <div class="level-left">
              <div class="level-item">
                <div>
                  <p class="title is-2">{{ album.collectionName }}</p>
                  <p class="subtitle is-4">{{ album.artistName }}</p>
                </div>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <a
                  class="level-right"
                  id="itunesLogoArtist"
                  :href="album.collectionViewUrl"
                >
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-one-third">
        <div class="card" id="coverAlbum">
          <div class="card-image">
            <figure class="image is-4by3">
              <img :src="album.artworkUrl100" alt="Placeholder image" />
            </figure>
          </div>
          <div class="content">
            <div class="level">
              <div class="level-item has-text-centered">
                <div class="level-item">
                  <p class="title is-4">
                    {{ year }}
                  </p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div class="level-item">
                  <p class="title is-4">{{ album.primaryGenreName }}</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div class="level-item">
                  <p class="title is-4">{{ album.trackCount }} Songs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <AlbumTracks v-bind:tracks="tracks" />
      </div>
    </div>
  </div>
</template>

<script>
import AlbumTracks from "./AlbumTracks";
import * as apiAlbum from "../api/apiAlbum";

export default {
  components: {
    AlbumTracks
  },

  props: ["album", "collectionId"],
  data: () => ({
    tracks: []
  }),
  computed: {
    year: function() {
      if (this.album["releaseDate"] !== undefined) {
        return this.album["releaseDate"].substring(0, 4);
      }
      return "";
    }
  },
  created() {
    apiAlbum
      .getAlbumTracks(this.collectionId)
      .then(results => (this.tracks = results));
  }
};
</script>

<style>
#coverAlbum {
  width: 100%;
  display: inline-block;
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

@media only screen and (min-width: 760px) and (-webkit-min-device-pixel-ratio: 1.5) {
  #tileAlbumName {
    width: 760px;
  }
}
</style>
