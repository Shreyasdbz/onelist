/** @format */

import NextAuth from 'next-auth';

import GithubProvider from 'next-auth/providers/github';
import AppleProvider from 'next-auth/providers/apple';
import GoogleProvider from 'next-auth/providers/google';
import Email from 'next-auth/providers/email';

if (!process.env.GITHUB_ID) {
  throw new Error('GitHub ID ENV Missing');
}
if (!process.env.GITHUB_SECRET) {
  throw new Error('GitHub SECRET ENV Missing');
}
if (!process.env.GOOGLE_ID) {
  throw new Error('Apple ID ENV Missing');
}
if (!process.env.GOOGLE_SECRET) {
  throw new Error('Apple SECRET ENV Missing');
}
if (!process.env.APPLE_ID) {
  throw new Error('Google ID ENV Missing');
}
if (!process.env.APPLE_SECRET) {
  throw new Error('Google SECRET ENV Missing');
}

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET,
    }),
    // Email({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    // }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
