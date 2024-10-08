'use client'; // Ensures this file runs on the client-side

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react'; // Use NextAuth's session

// Use a generic type for WrappedComponent to capture its props
interface WithAuthProps {
  allowedRoles: string[];
}

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles: string[]
) => {
  const AuthenticatedComponent: React.FC<P & WithAuthProps> = (props) => {
    const { data: session, status } = useSession(); // Get session data from NextAuth
    const router = useRouter();

    useEffect(() => {
      // If the session is loading, wait for it to resolve
      if (status === 'loading') return;

      // If no session exists (user not authenticated)
      if (!session) {
        router.push('/login'); // Redirect to login page
      } 
      // Check if user's role is allowed
      else if (session && !allowedRoles.includes(session.user.role)) {
        router.push('/unauthorized'); // Redirect if role is not allowed
      }
    }, [session, status, router, allowedRoles]);

    // Show nothing until the role and session are verified
    if (status === 'loading' || !session) {
      return null; // Optionally, render a loading spinner here
    }

    // If role is authorized, render the wrapped component
    return <WrappedComponent {...(props as P)} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
