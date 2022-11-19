class MainApi {
  constructor({ baseUrl, headers, credentials }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._credentials = credentials;
  }

  async _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    const err = await res.json();
    return Promise.reject(err);
  }

  async _request(
    path = '',
    method = 'GET',
    body = null,
    headers = this._headers,
    credentials = this._credentials,
  ) {
    const res = await fetch(this._baseUrl + path, { method, body, headers, credentials } )
    return this._handleResponse(res);
  }

  async register(data) {
    return this._request('/signup', 'POST', data);
  }

  async login(data) {
    return this._request('/signin', 'POST', data);
  }

  async logout() {
    return this._request('/signout')
  }

  async getOwnProfile() {
    return this._request('/users/me')
  }

  async updateOwnProfile(data) {
    return this._request('/users/me', 'PATCH', data)
  }
}

const mainApi = new MainApi({
  baseUrl: 'http://localhost:3100',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});

export default mainApi;
