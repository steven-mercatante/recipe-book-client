import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      // clientId: process.env.GITHUB_ID,
      clientId: "9efce87dd7e5d628f6f3",
      // clientSecret: process.env.GITHUB_SECRET,
      clientSecret: "9126fa527296f8f08bd75640329f50656f53a7ec",
    }),
    // ...add more providers here
  ],
});
