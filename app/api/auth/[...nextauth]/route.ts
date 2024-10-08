import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

// Define your authentication options
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
        const role = credentials?.role?.toLowerCase() || 'student'; // Default to 'student' if role is missing

        // Dummy logic for authentication (replace with real logic)
        if (username && password) {
          const user = {
            id: "1",
            name: "SALAHUDEEN RIDWAN",
            email: "SALAHUDEEN RIDWAN@example.com",
            role: role, // Ensure role is always a string
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
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.role) {
        session.user.role = token.role as string;
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

// Create the handler for NextAuth
const handler = NextAuth(authOptions);

// Export the handler for both GET and POST methods
export { handler as GET, handler as POST };