import Cookies from "js-cookie";

const url = "http://ubeat.herokuapp.com";

export const getAlbum = id => {
  return fetch(`${url}/albums/${id}/`, {
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
    .catch(err => {
      console.error(err);
    });
};

export const getAlbumTracks = id => {
  return fetch(`${url}/albums/${id}/tracks`, {
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
    .catch(err => {
      console.error(err);
    });
};
