'use client'; // Ensures this file runs on the client-side

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'; // Use NextAuth's session

interface WithAuthProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const withAuth = (WrappedComponent: React.ComponentType<any>, allowedRoles: string[]) => {
  return function ProtectedRoute(props: WithAuthProps) {
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
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
