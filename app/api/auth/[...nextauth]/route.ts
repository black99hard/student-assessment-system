import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions, User } from "next-auth";

// Extend the User type to include the role property
interface CustomUser extends User {
  role?: string; // Make role optional
}

// Define your authentication options
const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text", placeholder: "student, lecturer, admin" } // Include role
      },
      async authorize(credentials) {
        const username = credentials?.username;
        const password = credentials?.password;
        const role = credentials?.role;

        // Dummy logic for authentication (replace with real logic)
        if (username && password) {
          const user: CustomUser = {
            id: "1",
            name: "SALAHUDEEN RIDWAN",
            email: "SALAHUDEEN RIDWAN@example.com",
            role: role?.toLowerCase(), // Role comes from credentials
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
        token.role = (user as CustomUser).role; // Attach role to token
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

// Create the handler for NextAuth
const handler = NextAuth(authOptions);

// Export the handler for both GET and POST methods
export { handler as GET, handler as POST };
