'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If the session is still loading, wait for it to resolve
    if (status === 'loading') return;

    // If no session exists (user not authenticated), redirect to login
    if (!session) {
      router.push('/login');
    }

    // Check if user's role is allowed (only admins should access this layout)
    if (session?.user?.role !== 'admin') {
      router.push('/unauthorized'); // Redirect if role is not allowed
    }
  }, [session, status, router]);

  // Show nothing or a loading spinner while authentication is loading
  if (status === 'loading' || !session || session.user.role !== 'admin') {
    return null; // Optionally, render a loading spinner here
  }

  // If authenticated and the role is admin, render the layout
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
