'use client';

import React from 'react';
import withAuth from '@/lib/withAuth';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import  WithAuthProps  from '@/lib/withAuth'; // Import the WithAuthProps type

interface AdminLayoutProps {
  children: React.ReactNode;
}

// Update the type of the wrapped component to include WithAuthProps
const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
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

// Ensure that withAuth is correctly typed
export default withAuth(AdminLayout, ['admin']) as React.FC<AdminLayoutProps & WithAuthProps>; // Add type assertion here
