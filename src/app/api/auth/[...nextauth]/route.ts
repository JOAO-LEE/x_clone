import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code"
          }
        }
      })
    ], 
    callbacks: {
      async session({ session, token }) {
        session.user.username = session.user?.email?.slice(0, session.user.email.indexOf("@"));
        session.user.uid = token.sub
        return session;
      }
    }
});

export { handler as GET, handler as POST };