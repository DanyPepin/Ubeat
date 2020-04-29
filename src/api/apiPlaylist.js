import Cookies from "js-cookie";

const url = "http://ubeat.herokuapp.com";

export const newPlaylist = (playlistName, emailOwner) => {
  return fetch(`${url}/playlists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: Cookies.get("token")
    },
    body: JSON.stringify({ name: playlistName, owner: emailOwner })
  })
    .then(response => {
      return response.json();
    })
    .catch(() => {
      console.error("playlist creation failed");
    });
};

export const getPlaylists = userId => {
  return fetch(`${url}/users/${userId}/playlists`, {
    method: "GET",
    headers: {
      Authorization: Cookies.get("token")
    }
  })
    .then(response => {
      return response.json();
    })
    .then(jsonFormat => {
      return jsonFormat;
    })
    .catch(() => {
      console.error("fetch for playlists for this user failed");
    });
};

export const deletePlaylist = playlistSelected => {
  return fetch(`${url}/playlists/${playlistSelected}`, {
    method: "DELETE",
    headers: {
      Authorization: Cookies.get("token")
    }
  }).catch(() => {
    console.error("cant delete this playlist");
  });
};

export const editPlaylistName = (id, editedName, emailOwner) => {
  return fetch(`${url}/playlists/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: Cookies.get("token")
    },
    body: JSON.stringify({ name: editedName, owner: emailOwner })
  })
    .then(response => {
      return response.json();
    })
    .catch(() => {
      console.log("cant edit the playlist name");
    });
};

export const getTracksFromPlaylist = playlistId => {
  return fetch(`${url}/playlists/${playlistId}`, {
    method: "GET",
    headers: {
      Authorization: Cookies.get("token")
    }
  })
    .then(response => {
      return response.json();
    })
    .then(jsonFormat => {
      return jsonFormat;
    })
    .catch(() => {
      console.error("fetch for this playlist failed");
    });
};

export const deleteTrackFromPlaylist = (playlistId, trackId) => {
  return fetch(`${url}/playlists/${playlistId}/tracks/${trackId}`, {
    method: "DELETE",
    headers: {
      Authorization: Cookies.get("token")
    }
  }).catch(() => {
    console.error("cant delete this track from this playlist");
  });
};

export const addTrack = (playlistId, track) => {
  return fetch(`${url}/playlists/${playlistId}/tracks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: Cookies.get("token")
    },
    body: JSON.stringify(track)
  }).then(response => {
    if (response.status == 401) throw Error("401 BAD REQUEST: NO TOKEN");
    return response.json();
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
