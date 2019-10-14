import auth0 from 'auth0-js';
import history from './history';
import axios from 'axios';

export default class Auth {
  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  auth0 = new auth0.WebAuth({
    domain: 'nathankluth.auth0.com',
    clientID: 'KhCmaEsCN2HdW3NkKo1uF6mK8EpMGImd',
    audience: 'acronimbleapi',
    responseType: 'token id_token',
    scope: 'openid profile'
  });

  login(itemId, definitionId) {
    const params = itemId && definitionId ? `?itemId=${itemId}&definitionId=${definitionId}` : '';
    this.auth0.authorize({
      redirectUri: `${window.location.origin}/callback${params}`
    });
  }

  handleAuthentication(search, callback) {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(search, authResult);
        callback();
      } else if (err) {
        callback(err);
      }
    });
  }

  setSession(search, authResult) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('user_id', authResult.idTokenPayload.sub);
    // navigate to the home route

    if (search) {
      return history.replace(`/like${search}`);
    }

    history.replace('/');
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.push('/');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  getProfile(cb) {
    let accessToken = this.getAccessToken();
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    const auth0Promise = new Promise((resolve, reject) => {
      this.auth0.client.userInfo(accessToken, (err, profile) => {
        if (profile) {
          return resolve(profile);
        }

        return reject(err);
      });
    });

    const userId = encodeURIComponent(localStorage.getItem('user_id'));
    const userLikesPromise = axios.get(`/users/${userId}/likes`);

    return Promise.all([auth0Promise, userLikesPromise])
      .then(([profile, likes]) => {
        this.userProfile = {
          ...profile,
          likes: likes.data || []
        };

        cb();
      })
      .catch(cb);
  }
}
