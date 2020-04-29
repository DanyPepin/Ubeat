import Cookies from "js-cookie";

const url = "http://ubeat.herokuapp.com";

export const searchAll = search => {
  return fetch(
    `${url}/search/?q=${encodeURIComponent(search)}&limit=250&media=music`,
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
      return jsonFormat.results;
    })
    .catch(() => {
      console.error("fetch for search dont work");
    });
};

export const searchTrack = search => {
  return fetch(
    `${url}/search/tracks?q=${encodeURIComponent(
      search
    )}&limit=250&media=music`,
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
      return jsonFormat.results;
    })
    .catch(() => {
      console.error("fetch for search dont work");
    });
};

export const searchArtist = search => {
  return fetch(
    `${url}/search/artists?q=${encodeURIComponent(
      search
    )}&limit=250&media=music`,
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
      return jsonFormat.results;
    })
    .catch(() => {
      console.error("fetch for search dont work");
    });
};

export const searchAlbum = search => {
  return fetch(
    `${url}/search/albums?q=${encodeURIComponent(
      search
    )}&limit=250&media=music`,
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
      return jsonFormat.results;
    })
    .catch(() => {
      console.error("fetch for search dont work");
    });
};

export const searchUser = search => {
  return fetch(
    `${url}/search/users?q=${encodeURIComponent(search)}&limit=250`,
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
      console.error("fetch for search dont work");
    });
};
