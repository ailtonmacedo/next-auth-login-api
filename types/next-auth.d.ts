// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    access_token?: string;
    refresh_token?: string;
    user: {
      id?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    access_token?: string;
    refresh_token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token?: string;
    refresh_token?: string;
    accessTokenExpires?: number;
  }
}
