<template>
  <div>
    <h1>Artist Page</h1>
    <div class="tile is-ancestor">
      <div class="tile is-parent" id="tileArtistName">
        <div class="tile is-child box">
          <div class="level">
            <div class="level-left">
              <div class="level-item">
                <div>
                  <p class="title is-2">{{ artist.artistName }}</p>
                  <p class="subtitle is-4">{{ artist.primaryGenreName }}</p>
                </div>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <a
                  class="level-right"
                  id="itunesLogoArtist"
                  :href="artist.artistLinkUrl"
                >
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["artist"]
};
</script>
