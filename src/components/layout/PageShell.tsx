import { ReactNode } from 'react';
import TopBar from './TopBar';
import Footer from './Footer';

interface PageShellProps {
  children: ReactNode;
  currentView: string;
  setView: (view: 'landing' | 'archive' | 'dashboard' | 'auth' | 'case') => void;
}

export default function PageShell({ children, currentView, setView }: PageShellProps) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-bg-deep text-on-surface">
      <TopBar currentView={currentView} setView={setView} />
      <main className="flex-1 mt-16 z-10 flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
}
