import NextAuth from "next-auth"
import Providers from "next-auth/providers"

const options = {
  providers: [
    Providers.Facebook({
      clientId: "986532818803888",
      clientSecret: "91e8625cc6eaece18556ebfb00b5c852",
    }),
    Providers.GitHub({
      clientId: "63fa4356b4cc47464ecb",
      clientSecret: "08920c62a8cc05e49ad6e30bc981a683ab6853d4",
    }),
    Providers.Twitter({
      clientId: "4R59Xcjam0vaHIwDdq0FmRKX5",
      clientSecret: "OBALskqOvxcDK9f0xbZXPUmtKJA4QJcFUuLnUfVRo4WiGVw1AQ",
    }),
    Providers.Auth0({
      clientId: "jjBnVOUFg9Vw13OKQpB7RjWdbDs5j67N",
      clientSecret: "yUsd9GGv9SFlNdtzoesOl2tbY5_N9ZW1kTR44GtDMSB7CM9icEpUyClyeWHcz6Rs",
      domain: "dev-zgd73od3.eu.auth0.com"
    }),
    Providers.Email({
      server: {
        host: "smtp.sendgrid.net",
        port: "465",
        auth: {
          user: "apikey",
          pass: "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"
        }
      },
      from: "manuel.nenninger@web.de",
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
  database: "mongodb+srv://Manuel:ToDoListNextJs@cluster0.bvwmd.mongodb.net/NextJsToDOList?retryWrites=true&w=majority",
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
