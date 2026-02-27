import { Outlet } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import { Toaster } from 'sonner';

export function Layout() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#C3A6D8] selection:text-white">
      <Toaster position="top-right" />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
