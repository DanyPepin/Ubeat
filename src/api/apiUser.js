import Cookies from "js-cookie";

var qs = require("qs");

export const getUser = id => {
  return fetch(`http://ubeat.herokuapp.com/users/${id}`, {
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
      console.error("fetch to get this user didnt work");
    });
};

export const signUp = (name, email, password) => {
  return fetch("http://ubeat.herokuapp.com/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: qs.stringify({
      name: name,
      email: email,
      password: password
    })
  })
    .then(response => {
      return response.json();
    })
    .then(jsonFormat => {
      return jsonFormat;
    });
};

export const login = (email, password) => {
  return fetch("http://ubeat.herokuapp.com/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: qs.stringify({
      email: email,
      password: password
    })
  })
    .then(response => {
      return response.json();
    })
    .then(jsonFormat => {
      return jsonFormat;
    });
};

export const storeInCookie = tokenToStore => {
  let date = new Date();
  let minutes = 60;
  date.setTime(date.getTime() + minutes * 60 * 1000);
  Cookies.set("token", tokenToStore, { expires: date });
};

export const getTokenInfos = token => {
  return fetch("http://ubeat.herokuapp.com/tokenInfo", {
    method: "GET",
    headers: {
      Authorization: token
    }
  }).then(result => {
    if (result.status == 401) throw Error("401 BAD REQUEST: NO TOKEN");
    return result.json();
  });
};

export const logout = () => {
  return fetch("http://ubeat.herokuapp.com/logout", {
    method: "POST",
    headers: {
      Authorization: Cookies.get("token")
    }
  })
    .then(itWorks => {
      Cookies.remove("token");
      return itWorks;
    })
    .catch(() => {
      console.error("failed to logout");
    });
};

export const followUser = id => {
  return fetch(`http://ubeat.herokuapp.com/follow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: Cookies.get("token")
    },
    body: JSON.stringify({
      id: id
    })
  }).then(response => {
    if (response.status == 401) throw Error("401 BAD REQUEST: NO TOKEN");
    if (response.status == 412) {
      return false;
    }
    return response.json();
  });
};

export const unfollowUser = id => {
  return fetch(`http://ubeat.herokuapp.com/follow/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: Cookies.get("token")
    }
  }).then(res => {
    if (res.status == 401) throw Error("401 BAD REQUEST: NO TOKEN");
    if (res.status == 404) {
      return false;
    }
  });
};
