import React, { useState } from 'react';
import { Trophy, Search, Menu, User, Star } from 'lucide-react';
import { Link } from 'react-router';
import { SearchModal } from './SearchModal';
import { WatchlistPanel } from './WatchlistPanel';
import { useWatchlist } from '../contexts/WatchlistContext';

export function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [showWatchlist, setShowWatchlist] = useState(false);
  const { watchlist } = useWatchlist();

  return (
    <>
      <header className="bg-[#6C4675] text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Trophy className="w-8 h-8 text-[#C3A6D8]" />
              <span className="text-xl font-bold tracking-tight">AMETHYST DRAFT</span>
            </Link>
            
            <nav className="hidden md:flex space-x-8 text-sm font-medium">
              <Link to="/dashboard" className="hover:text-[#C3A6D8] transition-colors">Dashboard</Link>
              <Link to="/rankings" className="hover:text-[#C3A6D8] transition-colors">Rankings</Link>
              <Link to="/ratings" className="hover:text-[#C3A6D8] transition-colors">Ratings</Link>
              <Link to="/cheat-sheet" className="hover:text-[#C3A6D8] transition-colors">Cheat Sheets</Link>
              <Link to="/mock-draft" className="hover:text-[#C3A6D8] transition-colors">Mock Draft</Link>
              <Link to="/sleepers" className="hover:text-[#C3A6D8] transition-colors">Sleepers</Link>
              <Link to="/news" className="hover:text-[#C3A6D8] transition-colors">News</Link>
            </nav>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowSearch(true)}
                className="p-2 hover:bg-[#9966CC] rounded-full transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setShowWatchlist(true)}
                className="relative p-2 hover:bg-[#9966CC] rounded-full transition-colors"
              >
                <Star className="w-5 h-5" />
                {watchlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {watchlist.length}
                  </span>
                )}
              </button>
              <Link 
                to="/auth" 
                className="flex items-center gap-2 bg-[#9966CC] hover:bg-[#8252b0] px-4 py-2 rounded-lg font-semibold transition-all shadow-md"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
              <button className="md:hidden p-2">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <SearchModal isOpen={showSearch} onClose={() => setShowSearch(false)} />
      <WatchlistPanel isOpen={showWatchlist} onClose={() => setShowWatchlist(false)} />
    </>
  );
}