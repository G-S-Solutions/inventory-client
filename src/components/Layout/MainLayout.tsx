'use client';
import { ReactNode, useState } from 'react';
import { Sidebar } from '../ui/sidebar/Sidebar';
import { Header } from '../ui/Header';
import { Footer } from '../ui/Footer';

interface IProps {
  children: ReactNode;
}

const MainLayout = ({ children }: IProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='flex h-screen overflow-hidden'>
      {/* Overlay para mobile */}
      {sidebarOpen && (
        <div 
          className='fixed inset-0 bg-black/50 z-40 lg:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 lg:w-[15%]
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className='flex-1 flex flex-col w-full lg:w-[85%] overflow-hidden'>
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className='flex-1 overflow-y-auto p-4'>
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;