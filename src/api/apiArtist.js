import Cookies from "js-cookie";

const url = "http://ubeat.herokuapp.com";

export const getArtistAlbums = id => {
  return fetch(`${url}/artists/${id}/albums`, {
    method: "GET",
    headers: {
      Authorization: Cookies.get("token")
    }
  })
    .then(response => {
      return response.json();
    })
    .then(jsonFormat => {
      return jsonFormat.results;
    })
    .catch(() => {
      console.error("fetch to get albums from this artist didnt work");
    });
};

export const getInfoArtist = artistName => {
  return fetch(
    `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&format=json&api_key=011362e5fe360f7ee34712760681eecc`,
    {
      method: "GET",
      headers: {
        Authorization: Cookies.get("token")
      }
    }
  )
    .then(response => {
      return response.json();
    })
    .then(jsonFormat => {
      return jsonFormat;
    })
    .catch(() => {
      console.error("fetch to get albums from this artist didnt work");
    });
};

export const getArtist = id => {
  return fetch(`${url}/artists/${id}`, {
    method: "GET",
    headers: {
      Authorization: Cookies.get("token")
    }
  })
    .then(response => {
      return response.json();
    })
    .then(jsonFormat => {
      return jsonFormat.results;
    })
    .catch(() => {
      console.error("fetch to get this artist didnt work");
    });
};
