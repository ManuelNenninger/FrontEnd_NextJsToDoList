import NextAuth from "next-auth"
import Providers from "next-auth/providers"

const options = {
  providers: [
    Providers.Facebook({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Providers.Twitter({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
    Providers.Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      domain: process.env.AUTH0_DOMAIN,
    }),
    Providers.Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  pages: {
    signIn: '/auth/signIn',
  },
  callbacks: {
   session: async (session, user) => {
      session.id = user.id
      return Promise.resolve(session)
    }
},
  database: process.env.DATABASE_URL,
}
export default (req, res) => NextAuth(req, res, options);

//Hier ein paar Notes:
//Du benötigst Mongodb Version 3.5.9. Also npm i mongodb@3.5.9
//Für sendgrid musst Du unter Settings deine sender Verifizieren https://docs.sendgrid.com/ui/sending-email/sender-verification
//Du musst eine Datenbank hinterlegen, wenn Du Email Auth. verwendest.

//für die Auth0 Anmeldung musst Du unter Applicaion --> settings --> Allowed Callback URLs folgendes eingeben: http://localhost:3000/api/auth/callback/auth0
//Generell die Callbaks sollten sein: http://localhost:3000/api/auth/callback/<provider>

//Über die Callback weisen wir der derzeitigen Session eine Id zu, die der User ID aus der Datenbank entspricht.
//Wenn wir die Session bekommen, können wir die UserId aus der Session ziehen.
