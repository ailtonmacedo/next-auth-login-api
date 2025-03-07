import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Configuração principal do NextAuth
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Usuário", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        // Exemplo de chamada a uma API externa
        // Substitua pela sua URL e lógica de autenticação
        const res = await fetch(
          "https://qrpagar-backend.onrender.com/auth/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          }
        );

        const data = await res.json();

        // Se a API retornar um access_token, login bem-sucedido
        if (res.ok && data?.access_token) {
          return data; // { access_token, refresh_token }
        }
        return null; // Falha no login
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // No primeiro login, insira tokens no JWT
      if (user) {
        token.access_token = user.access_token;
        token.refresh_token = user.refresh_token;
        token.accessTokenExpires = Date.now() + 60 * 60 * 1000; // 1h
      }

      // Se o token ainda não expirou, retorna
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Caso contrário, tenta renovar
      try {
        const res = await fetch(
          "https://qrpagar-backend.onrender.com/auth/refresh",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh_token: token.refresh_token }),
          }
        );
        const data = await res.json();

        if (res.ok && data?.access_token) {
          token.access_token = data.access_token;
          token.refresh_token = data.refresh_token;
          token.accessTokenExpires = Date.now() + 60 * 60 * 1000;
        }
      } catch (error) {
        console.error("Erro ao atualizar token:", error);
      }
      return token;
    },
    async session({ session, token }) {
      session.access_token = token.access_token;
      session.refresh_token = token.refresh_token;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // defina no .env.local
};

// Handler do NextAuth
const handler = NextAuth(authOptions);

// Precisamos exportar GET e POST
export { handler as GET, handler as POST };
