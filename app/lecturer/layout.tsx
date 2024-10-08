'use client';

import withAuth from '@/lib/withAuth';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

interface LecturerLayoutProps {
  children: React.ReactNode;
}

const LecturerLayout: React.FC<LecturerLayoutProps> = ({ children }) => {
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

export default withAuth(LecturerLayout, ['lecturer']);
