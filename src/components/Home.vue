<template>
  <div>
    <div class="tile is-ancestor" id="tile">
      <div class="tile is-12 is-parent" id="parentTitle">
        <div class="tile is-child box" id="textPlacementTitle">
          <p class="title is-1">UBEAT</p>
          <p class="title is-3">The new generation of online music</p>
          <b-button tag="router-link" to="/Artist/262836961" type="is-link">
            Artist
          </b-button>
          <b-button tag="router-link" to="/Album/1051394208" type="is-link">
            Album
          </b-button>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-image">
        <figure class="image is-1280x960">
          <img
            src="https://images.dailyhive.com/20190212072431/28750929_195081437923922_4834114639451127808_n.jpg"
            alt="Placeholder image"
          />
        </figure>
      </div>
    </div>
    <div class="card">
      <div class="card-image">
        <figure class="image is-1280x960">
          <img
            src="https://i.pinimg.com/originals/c8/de/f5/c8def5832179fd885ff4bcbd79b11572.jpg"
            alt="Placeholder image"
          />
        </figure>
      </div>
    </div>
  </div>
</template>

<style>
#textPlacementTitle {
  text-align: center;
}
#parentTitle {
  padding: 0;
}

#tile {
  margin: 0;
}
</style>
