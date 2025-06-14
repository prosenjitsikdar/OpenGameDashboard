import type { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Footer from './Footer';
import { SidebarProvider, useSidebar } from '../contexts/SidebarContext';

interface LayoutProps {
  children: ReactNode;
}

const LayoutContent = ({ children }: LayoutProps) => {
  const { isExpanded } = useSidebar();

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Topbar />
      <Sidebar />
      <div className={`flex flex-col flex-1 ${isExpanded ? 'md:pl-80' : 'md:pl-20'} pl-0 w-full`}>
        <div className="h-16"></div>
        <main className="flex-1 p-2">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <LayoutContent children={children} />
    </SidebarProvider>
  );
};

export default Layout;