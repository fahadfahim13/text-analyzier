import NextAuth from "next-auth"
// import { MongoDBAdapter } from "@auth/mongodb-adapter"
// import clientPromise from "./lib/db";
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"

 
export const { handlers, auth, signIn, signOut } = NextAuth({
  // adapter: MongoDBAdapter(clientPromise),
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GitHub,
  ],
  pages: {
    signIn: '/sign-in'
  }
})