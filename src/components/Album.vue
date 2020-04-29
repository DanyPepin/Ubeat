<template>
  <div>
    <AlbumTemplate v-bind:album="album" v-bind:collectionId="albumId" />
  </div>
</template>

<script>
import AlbumTemplate from "./AlbumTemplate";
import * as apiAlbum from "../api/apiAlbum";

export default {
  components: {
    AlbumTemplate
  },
  data: () => ({
    albumId: 1499149935,
    album: {}
  }),
  created() {
    this.albumId = this.$route.params.collectionId;
    apiAlbum
      .getAlbum(this.albumId)
      .then(results => (this.album = results[0]))
      .catch(() => this.$router.push("/login"));
  }
};
</script>
