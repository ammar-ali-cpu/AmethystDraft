import { RouterProvider } from 'react-router';
import { router } from './routes';
import { WatchlistProvider } from './contexts/WatchlistContext';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <WatchlistProvider>
        <RouterProvider router={router} />
      </WatchlistProvider>
    </AuthProvider>
  );
}