class MoviesApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  async _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    const err = await res.json();
    return Promise.reject(err);
  }

  async getFilms() {
    const res = await fetch(this._baseUrl);
    return this._handleResponse(res);
  }
}

const moviesApi = new MoviesApi({ baseUrl: 'https://api.nomoreparties.co/beatfilm-movies' })

export default moviesApi;
