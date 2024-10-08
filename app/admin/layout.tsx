'use client';

import React from 'react';
import withAuth from '@/lib/withAuth';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import type { WithAuthProps } from '@/lib/withAuth'; // Import the type correctly

interface AdminLayoutProps {
  children: React.ReactNode;
}

// Define the component
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

// Correctly apply the HOC with type assertion
export default withAuth(AdminLayout, ['admin']) as React.FC<AdminLayoutProps & WithAuthProps>;
