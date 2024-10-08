import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text", placeholder: "student, lecturer, admin" },
      },
      async authorize(credentials) {
        const username = credentials?.username;
        const password = credentials?.password;
        const role = credentials?.role;

        if (username && password) {
          const user = {
            id: "1",
            name: "SALAHUDEEN RIDWAN",
            email: "SALAHUDEEN RIDWAN@example.com",
            role: role?.toLowerCase(),
          };
          return user; // Return the user object if authentication succeeds
        }
        return null; // Return null if authentication fails
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // Attach role to token
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.role) {
        session.user.role = token.role; // Add role to the session object
      }
      return session;
    },
  },
  pages: {
    signIn: '/login', // Custom login page
  },
  session: {
    strategy: "jwt", // Use JWT for session management
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
