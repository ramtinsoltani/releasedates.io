# Facebook App Setup

1. Go to [Facebook for Developers](https://developers.facebook.com/) and sign into your account.
2. Under **My Apps**, select **Add a New App** and enter your email and a display name for your app.
3. Click on **Settings** and then **Basic**.
4. Obtain your App ID and App Secret and use them to activate Facebook sign in inside Firebase.
5. Click on the plus button next to **Products** inside the Facebook app and click setup for **Facebook Login**.
5. Under **Facebook Login**, select **Settings**.
6. Copy the **OAuth Redirect URI** from Firebase Facebook Sign-In method window (where you entered your App ID and Secret) and add it to **Valid OAuth redirect URIs**.
7. If anyone but you is going to use the web app, you need to make your Facebook app go live:
  - Host the `privacy.html` file in the repo's root somewhere (you can use [GitHub Pages](https://pages.github.com/), or [Firebase free hosting](https://firebase.google.com/docs/hosting/)).
  - Add the URL of the privacy file in **Settings > Basic** under **Privacy Policy URL**.
  - Switch your app status to Live on top of the screen.
