import { Outlet } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SkipToContent } from '@/components/layout/SkipToContent';
import { ScrollManager } from '@/components/layout/ScrollManager';

export default function App() {
  return (
    <div className="flex min-h-dvh flex-col bg-page text-ink">
      <div className="aurora" aria-hidden="true" />
      <div className="fixed inset-x-0 top-0 z-50 h-[2px] bg-accent-gradient" aria-hidden="true" />
      <SkipToContent />
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollManager />
    </div>
  );
}
