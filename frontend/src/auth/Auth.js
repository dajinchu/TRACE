import { Auth0LockPasswordless } from 'auth0-lock';
import { AUTH_CONFIG } from './auth0-variables';
import history from '../history';

export default class Auth {

  lock = new Auth0LockPasswordless(AUTH_CONFIG.clientId, AUTH_CONFIG.domain, {
    allowedConnections: ['email'],
    passwordlessMethod: 'code',
    avatar: null,
    closable: false,
    allowAutocomplete: true,
    languageDictionary: {
      title: "Verify Husky Email",
      emailInputPlaceholder: "student@husky.neu.edu",
      passwordlessEmailInstructions: "Enter your husky email to sign in",
      signUpTerms: "",
      submitLabel: "Sign In",
      error: {
        signUp: {
          "bad-domain": "You must use a Husky email"
        }
      }
    },
    auth: {
      redirectUrl: AUTH_CONFIG.callbackUrl,
      responseType: 'token id_token',
      sso: false,
      params: {
        scope: 'openid email'
      }
    }
  });

  constructor() {
    this.handleAuthentication();
    // binds functions to keep this context
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  handleAuthentication() {
    // Add a callback for Lock's `authenticated` event
    this.lock.on('authenticated', this.setSession.bind(this));
    // Add a callback for Lock's `authorization_error` event
    this.lock.on('authorization_error', (err) => {
      alert(`Error: ${err.errorDescription}. Check the console for further details.`);
      history.replace('/');
    });
  }

  setSession(authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
      // Set the time that the access token will expire at
      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
      // navigate to the home route
      this.lock.hide();
    }
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/');
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    console.log(new Date().getTime() < expiresAt)
    return new Date().getTime() < expiresAt;
  }
}