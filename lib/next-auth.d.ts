// types/next-auth.d.ts

import NextAuth from "next-auth";

// Extend the User type to include the role property
declare module "next-auth" {
  interface User {
    role: string; // Add role to User type
  }

  interface Session {
    user: User; // Ensure session has the User type
  }

  interface JWT {
    role: string; // Add role to JWT type
  }
}
