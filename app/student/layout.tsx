'use client';

import React from 'react';
import withAuth from '@/lib/withAuth';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

interface StudentLayoutProps {
  children: React.ReactNode;
}

const StudentLayout: React.FC<StudentLayoutProps> = ({ children }) => {
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

export default withAuth(StudentLayout, ['student']);