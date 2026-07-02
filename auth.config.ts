import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const loggedIn = !!auth?.user;
      const protectedRoute = nextUrl.pathname.startsWith("/products");

      if (protectedRoute) {
        return loggedIn;
      }

      if (loggedIn && nextUrl.pathname === "/login") {
        return Response.redirect(new URL("/products", nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;