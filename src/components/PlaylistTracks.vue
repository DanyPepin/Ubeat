<template>
  <div>
    <h2 v-if="Object.entries(playlistSelected).length === 0">
      Please select a playlist
    </h2>
    <div v-else>
      <div v-if="Object.entries(selectedTrack).length != 0">
        <b-button
          type="is-warning"
          rounded
          @click="selectedTrack = {}"
          :disabled="Object.entries(selectedTrack).length === 0"
        >
          Clear selected
        </b-button>

        <div class="tile is-ancestor">
          <div class="tile  is-parent">
            <div class="tile is-child box">
              <div class="level">
                <div class="level-left">
                  <div class="level-item">
                    <p class="h2">
                      <b-icon icon="music-note" size="is-small"> </b-icon>
                      Selected track : {{ selectedTrack.trackName }}
                    </p>
                  </div>
                </div>
                <div class="level-right">
                  <div class="level-item">
                    <b-button
                      type="is-danger"
                      v-on:click="$emit('deleteTrack', selectedTrack.trackId)"
                      @click="selectedTrack = {}"
                    >
                      <b-icon icon="delete" size="is-small"> </b-icon
                    ></b-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <b-table
        :data="isEmpty ? [] : tracksList"
        mobile-cards
        :selected.sync="selectedTrack"
      >
        <template slot-scope="props">
          <b-table-column field="trackName" label="Track Name">
            {{ props.row.trackName }}
          </b-table-column>

          <b-table-column field="artistName" label="Artist Name">
            {{ props.row.artistName }}
          </b-table-column>

          <b-table-column field="collectionName" label="Album Name">
            {{ props.row.collectionName }}
          </b-table-column>

          <b-table-column field="trackTimeMillis" label="Time">
            <span>
              {{
                Math.round((props.row.trackTimeMillis / 1000 / 60) * 100) / 100
              }}
              min
            </span>
          </b-table-column>
        </template>

        <template slot="empty">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p>There is no track in this playlist</p>
            </div>
          </section>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  props: ["playlistSelected", "tracksList", "trackSelected", "deleteTrack"],

  data: () => ({
    isEmpty: false,
    listTracks: [],
    playlist: {},
    selectedTrack: {}
  }),
  //Permet d'aller chercher le data d'un props et de l'utiliser dans les méthodes!
  watch: {
    playlistSelected: {
      immediate: true,
      handler() {
        this.playlist = this.playlistSelected;
        this.listTracks = this.tracksList;
        this.selectedTrack = this.trackSelected;
      }
    }
  }
};
</script>
