# Backend Server Configuration

1. Clone [the backend repo](https://github.com/ramtinsoltani/releasedates-backend-public)
2. Run `npm install`
3. Clone the `config.sample.js` to `config.js` (copy, paste, rename)
4. Set the `firebaseAdminCertificate` in `config.js` to your Firebase Admin SDK Certificate obtained from your Firebase project's settings
5. Obtain an API key from TheTVDB by [registering](https://www.thetvdb.com/?tab=register) and [generating a key](https://www.thetvdb.com/?tab=apiregister) in your account, then set the `thetvdb.key` in `config.js` with the API key
6. Review the `config.js` comments and configure your server (`thetvdb.tokenRefreshTime`, `firebaseAuthenticationRequired`, etc.)
7. Your `config.js` file should look something like this:
```js
module.exports = {
  thetvdb: {
    url: 'https://api.thetvdb.com',
    key: '...',
    tokenRefreshTime: 4.32e+7, // 12 Hours
    imageUrl: 'https://www.thetvdb.com/banners/',
    wrapper: require(`${__dirname}/wrappers/thetvdb.wrapper.js`)
  },
  dailymotion: {
    url: 'https://api.dailymotion.com',
    videoUrl: 'https://www.dailymotion.com/video/',
    wrapper: require(`${__dirname}/wrappers/dailymotion.wrapper.js`)
  },
  authorizedDomains: [
    'http://localhost:4200'
  ],
  firebaseAdminCertificate: {
    "type": "service_account",
    "project_id": "...",
    "private_key_id": "...",
    "private_key": "...",
    "client_email": "...",
    "client_id": "...",
    "auth_uri": "...",
    "token_uri": "...",
    "auth_provider_x509_cert_url": "...",
    "client_x509_cert_url": "..."
  },
  firebaseAuthenticationRequired: true
}
```
8. Run `node index` to start the server locally on port 3000
