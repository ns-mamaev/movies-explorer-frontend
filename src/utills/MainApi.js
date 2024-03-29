import { createQueryString } from "./utills";

class MainApi {
  constructor({ baseUrl, headers, credentials, unauthorizedCode }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._credentials = credentials;
    this._unauthorizedCode = unauthorizedCode;
  }

  async _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    const err = await res.json();
    if (res.status === this._unauthorizedCode) {
      err.status = this._unauthorizedCode;
    }
    return Promise.reject(err);
  }

  async _request(
    path = "",
    method = "GET",
    body = null,
    headers = this._headers,
    credentials = this._credentials
  ) {
    const res = await fetch(this._baseUrl + path, {
      method,
      body,
      headers,
      credentials,
    });
    return this._handleResponse(res);
  }

  async register(userData) {
    return this._request("/signup", "POST", JSON.stringify(userData)); // исправить ??
  }

  async login(userData) {
    return this._request("/signin", "POST", JSON.stringify(userData));
  }

  async logout() {
    return this._request("/signout");
  }

  async getOwnProfile() {
    return this._request("/users/me");
  }

  async updateOwnProfile(userInfo) {
    return this._request("/users/me", "PATCH", userInfo);
  }

  async getMovies(queryArr) {
    let queryString = '';
    if (queryArr) {
      queryString = createQueryString(queryArr)
    }
    return this._request(`/movies/${queryString}`);
  }

  async getMovieData(id) {
    return this._request(`/movies/${id}`);
  } 

  async getRandomMovie(queryArr) {
    const queryString = createQueryString(queryArr);
    return this._request(`/movies/random${queryString}`);
  }

  async getGenres() {
    return this._request('/genres');
  }

  async getSavedMovied() {
    return this._request('/movies/saved')
  }

  async saveMovie(movieId) {
    return this._request(`/movies/${movieId}/likes`, "POST");
  }

  async removeMovie(movieId) {
    return this._request(`/movies/${movieId}/likes`, "DELETE");
  }
}

const mainApi = new MainApi({
  baseUrl: "http://localhost:2222",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
  unauthorizedCode: 401,
});

export default mainApi;
