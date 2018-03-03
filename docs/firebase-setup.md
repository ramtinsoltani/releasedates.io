# Firebase Project Setup

Register for a new account if you haven't already (<https://firebase.google.com/>), then go to your Firebase console and create a new project.

Open up your project and follow these steps:

  1. On the top left side of the screen next to **Project Overview"**, click on the gear icon and select **Project settings**
  2. In the General section, click on **Add Firebase to your web app**
  3. Copy the value of `config` starting with `{` and ending with `}` and use it for the step #5 of the Build Instructions (this value goes in the `credentials.json` file)
  4. Click on the **Service Accounts** tab and click **Generate New Private Key**, then click **Generate Key** and download your Admin SDK Credentials file and use it for the step #4 of the [Backend Server Configuration](./backend-setup.md) (this value goes in the `config.js` file of the backend server)
  5. Go to the **Database** section on the left pane and click **Get Started**, then click on the **Rules** tab and replace it with the following rules:
  ```json
    {
      "rules": {
        "pins": {
          "$uid": {
            ".read": "auth != null && auth.provider !== 'anonymous' && (auth.token.email_verified === true || auth.provider === 'facebook') && auth.uid === $uid",
            ".write": "auth != null && auth.provider !== 'anonymous' && (auth.token.email_verified === true || auth.provider === 'facebook') && auth.uid === $uid"
          }
        }
      }
    }
  ```
  6. Go to the **Authentication** section on the left pane, click on the **Sign-in Methods** and enabled **Email/Password**, **Facebook**, and **Anonymous**.
  7. In order to activate Facebook authentication, you need to create a Facebook app first and obtain the App ID and App Secret. Full instructions are available [here](./facebook-app-setup.md).
  8. With the sign-in methods and Firebase credentials setup, you are ready to [build the app locally](../readme.md#build-instructions)!
