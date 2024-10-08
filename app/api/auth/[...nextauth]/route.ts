import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text", placeholder: "student, lecturer, admin" } // Include role
      },
   
      async authorize(credentials) {
        // Access the credentials properties explicitly
        const username = credentials?.username;
        const password = credentials?.password;
        const role = credentials?.role;

        // Dummy logic for authentication (replace with your own logic)
        if (username && password ) {
          const user = {
            id: "1",
            name: "SALAHUDEEN RIDWAN ",
            email: "SALAHUDEEN RIDWAN@example.com",
            role: role?.toLowerCase(), // Default to 'student' if role is not provided
          };
          return user; // Return user object on successful authentication
        }
        
        return null; // Return null on failure
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // If user is authenticated, add role to the token
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Add role to the session object
      if (token?.role) {
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login', // Custom login page
  },
  session: {
    strategy: "jwt", // Use JWT-based sessions
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
