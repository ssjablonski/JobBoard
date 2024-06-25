import axios from "axios";
import { AuthOptions, TokenSet } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import KeycloakProvider from "next-auth/providers/keycloak";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

async function requestRefreshOfAccessToken(token: JWT) {
  const response = await fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.KEYCLOAK_CLIENT_ID!,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken!,
    }),
    method: "POST",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to refresh access token");
  }

  const tokens: TokenSet = await response.json();
  return {
    ...token,
    accessToken: tokens.access_token,
    idToken: tokens.id_token,
    refreshToken: tokens.refresh_token ?? token.refreshToken,
    expiresAt: Math.floor(Date.now() / 1000 + (tokens.expires_in as number)),
  };
}

export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER!,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  session: {
    maxAge: 60 * 30,
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
        return token;
      }

      // Token is still valid
      if (Date.now() < token.expiresAt! * 1000 - 60 * 1000) {
        return token;
      }

      // Token has expired, refresh it
      return requestRefreshOfAccessToken(token).catch(error => {
        console.error("Error refreshing access token", error);
        return { ...token, error: "RefreshAccessTokenError" };
      });
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
    async signIn({ user, account, profile }) {
      
      // console.log("user", user, "account", account, "profile", profile)
      if (account.provider === "keycloak") {
        const email = user.email;
        const accessToken = account.access_token; // Pobierz token dostępu

        try {
          const response = await axios.get(`${apiUrl}/api/users/email/${email}`, {
            headers: {
              Authorization: `Bearer ${accessToken}` // Dodaj nagłówek z tokenem
            }
          });

          if (response.data === 'User not found') {
            await axios.post(`${apiUrl}/api/users/create`, { email, name: user.name }, {
              headers: {
                Authorization: `Bearer ${accessToken}` // Dodaj nagłówek z tokenem
              }
            });
          }
        } catch (error) {
          console.error("Error creating user in database", error);
          return false;
        }
      }
      return true;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

