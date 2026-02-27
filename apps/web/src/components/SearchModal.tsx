import { useState, useEffect } from 'react';
import { Search, X, Star, TrendingUp, Award, AlertCircle, Plus, Check } from 'lucide-react';
import { PLAYER_DATABASE, type Player } from '../data/players';
import { useWatchlist } from '../contexts/WatchlistContext';
import { toast } from 'sonner';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  useEffect(() => {
    if (isOpen) {
      setSearchTerm('');
      setSelectedPlayer(null);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredPlayers = PLAYER_DATABASE.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleWatchlist = (player: Player) => {
    if (isInWatchlist(player.id)) {
      removeFromWatchlist(player.id);
      toast.success(`${player.name} removed from watchlist`);
    } else {
      addToWatchlist(player);
      toast.success(`${player.name} added to watchlist`);
    }
  };

  const getTierColor = (tier: number) => {
    if (tier === 1) return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    if (tier === 2) return 'bg-purple-100 text-purple-700 border-purple-300';
    return 'bg-blue-100 text-blue-700 border-blue-300';
  };

  const getPositionColor = (pos: string) => {
    if (pos.includes('SP') || pos.includes('RP')) return 'bg-blue-100 text-blue-700';
    if (pos.includes('C')) return 'bg-red-100 text-red-700';
    if (pos.includes('OF')) return 'bg-green-100 text-green-700';
    return 'bg-purple-100 text-purple-700';
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl my-8 animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#6C4675] to-[#9966CC] text-white p-6 rounded-t-3xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Search className="w-7 h-7" />
              <h2 className="text-2xl font-bold">Player Search</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
            <input
              type="text"
              placeholder="Search by player name, team, or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border-2 border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-white/60 text-white text-lg"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row max-h-[70vh]">
          
          {/* Left Side - Search Results */}
          <div className="lg:w-2/5 border-r border-purple-100 overflow-y-auto">
            {searchTerm === '' ? (
              <div className="p-8 text-center text-gray-400">
                <Search className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p className="text-sm">Start typing to search for players</p>
              </div>
            ) : filteredPlayers.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p className="text-sm">No players found</p>
              </div>
            ) : (
              <div className="divide-y divide-purple-50">
                {filteredPlayers.map((player) => (
                  <button
                    key={player.id}
                    onClick={() => setSelectedPlayer(player)}
                    className={`w-full p-4 text-left hover:bg-purple-50 transition-colors ${
                      selectedPlayer?.id === player.id ? 'bg-purple-100' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">{player.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 font-semibold">{player.team}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${getPositionColor(player.position)}`}>
                            {player.position}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-bold border-2 ${getTierColor(player.tier)}`}>
                            Tier {player.tier}
                          </span>
                        </div>
                      </div>
                      <div className="text-right ml-3">
                        <p className="text-xs text-gray-500 font-semibold">ADP</p>
                        <p className="text-lg font-bold text-[#6C4675]">{player.adp}</p>
                      </div>
                    </div>
                    {isInWatchlist(player.id) && (
                      <div className="flex items-center gap-1 text-xs text-green-600 font-semibold">
                        <Star className="w-3 h-3 fill-current" />
                        <span>On Watchlist</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side - Player Details */}
          <div className="lg:w-3/5 overflow-y-auto">
            {!selectedPlayer ? (
              <div className="p-8 text-center text-gray-400 h-full flex flex-col items-center justify-center">
                <TrendingUp className="w-16 h-16 mb-4 opacity-20" />
                <p className="text-sm">Select a player to view details</p>
              </div>
            ) : (
              <div className="p-6 space-y-6">
                
                {/* Player Header */}
                <div className="bg-gradient-to-br from-[#9966CC] to-[#6C4675] rounded-2xl p-6 text-white">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{selectedPlayer.name}</h2>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-semibold opacity-90">{selectedPlayer.team}</span>
                        <span className="px-3 py-1 bg-white/20 rounded-full font-bold">
                          {selectedPlayer.position}
                        </span>
                        <span className="text-sm opacity-75">Age {selectedPlayer.age}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggleWatchlist(selectedPlayer)}
                      className={`p-3 rounded-xl transition-all ${
                        isInWatchlist(selectedPlayer.id)
                          ? 'bg-green-500 text-white shadow-lg scale-110'
                          : 'bg-white/20 hover:bg-white/30'
                      }`}
                    >
                      {isInWatchlist(selectedPlayer.id) ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <Plus className="w-6 h-6" />
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                      <p className="text-xs opacity-75 mb-1">ADP Rank</p>
                      <p className="text-2xl font-bold">{selectedPlayer.adp}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                      <p className="text-xs opacity-75 mb-1">Tier</p>
                      <p className="text-2xl font-bold">{selectedPlayer.tier}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                      <p className="text-xs opacity-75 mb-1">Value Score</p>
                      <p className="text-2xl font-bold">{selectedPlayer.value}</p>
                    </div>
                  </div>
                </div>

                {/* Outlook */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    <h3 className="font-bold text-blue-900">Fantasy Outlook</h3>
                  </div>
                  <p className="text-sm text-blue-800 leading-relaxed">{selectedPlayer.outlook}</p>
                </div>

                {/* 2025 Stats */}
                {selectedPlayer.stats.batting && (
                  <div className="bg-white border-2 border-purple-100 rounded-2xl p-4">
                    <h3 className="font-bold text-[#6C4675] mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      2025 Stats
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <p className="text-xs text-gray-500 font-semibold mb-1">AVG</p>
                        <p className="text-2xl font-bold text-[#6C4675]">{selectedPlayer.stats.batting.avg}</p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <p className="text-xs text-gray-500 font-semibold mb-1">HR</p>
                        <p className="text-2xl font-bold text-[#6C4675]">{selectedPlayer.stats.batting.hr}</p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <p className="text-xs text-gray-500 font-semibold mb-1">RBI</p>
                        <p className="text-2xl font-bold text-[#6C4675]">{selectedPlayer.stats.batting.rbi}</p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <p className="text-xs text-gray-500 font-semibold mb-1">Runs</p>
                        <p className="text-2xl font-bold text-[#6C4675]">{selectedPlayer.stats.batting.runs}</p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <p className="text-xs text-gray-500 font-semibold mb-1">SB</p>
                        <p className="text-2xl font-bold text-[#6C4675]">{selectedPlayer.stats.batting.sb}</p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <p className="text-xs text-gray-500 font-semibold mb-1">OBP</p>
                        <p className="text-2xl font-bold text-[#6C4675]">{selectedPlayer.stats.batting.obp}</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedPlayer.stats.pitching && (
                  <div className="bg-white border-2 border-purple-100 rounded-2xl p-4">
                    <h3 className="font-bold text-[#6C4675] mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      2025 Stats
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <p className="text-xs text-gray-500 font-semibold mb-1">ERA</p>
                        <p className="text-2xl font-bold text-[#6C4675]">{selectedPlayer.stats.pitching.era}</p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <p className="text-xs text-gray-500 font-semibold mb-1">WHIP</p>
                        <p className="text-2xl font-bold text-[#6C4675]">{selectedPlayer.stats.pitching.whip}</p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <p className="text-xs text-gray-500 font-semibold mb-1">Wins</p>
                        <p className="text-2xl font-bold text-[#6C4675]">{selectedPlayer.stats.pitching.wins}</p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <p className="text-xs text-gray-500 font-semibold mb-1">K</p>
                        <p className="text-2xl font-bold text-[#6C4675]">{selectedPlayer.stats.pitching.strikeouts}</p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <p className="text-xs text-gray-500 font-semibold mb-1">IP</p>
                        <p className="text-2xl font-bold text-[#6C4675]">{selectedPlayer.stats.pitching.innings}</p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <p className="text-xs text-gray-500 font-semibold mb-1">Saves</p>
                        <p className="text-2xl font-bold text-[#6C4675]">{selectedPlayer.stats.pitching.saves}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2026 Projections */}
                {selectedPlayer.projection.batting && (
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-4">
                    <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      2026 Projections
                    </h3>
                    <div className="grid grid-cols-5 gap-3">
                      <div className="text-center p-3 bg-white/80 rounded-lg">
                        <p className="text-xs text-gray-600 font-semibold mb-1">AVG</p>
                        <p className="text-xl font-bold text-green-700">{selectedPlayer.projection.batting.avg}</p>
                      </div>
                      <div className="text-center p-3 bg-white/80 rounded-lg">
                        <p className="text-xs text-gray-600 font-semibold mb-1">HR</p>
                        <p className="text-xl font-bold text-green-700">{selectedPlayer.projection.batting.hr}</p>
                      </div>
                      <div className="text-center p-3 bg-white/80 rounded-lg">
                        <p className="text-xs text-gray-600 font-semibold mb-1">RBI</p>
                        <p className="text-xl font-bold text-green-700">{selectedPlayer.projection.batting.rbi}</p>
                      </div>
                      <div className="text-center p-3 bg-white/80 rounded-lg">
                        <p className="text-xs text-gray-600 font-semibold mb-1">Runs</p>
                        <p className="text-xl font-bold text-green-700">{selectedPlayer.projection.batting.runs}</p>
                      </div>
                      <div className="text-center p-3 bg-white/80 rounded-lg">
                        <p className="text-xs text-gray-600 font-semibold mb-1">SB</p>
                        <p className="text-xl font-bold text-green-700">{selectedPlayer.projection.batting.sb}</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedPlayer.projection.pitching && (
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-4">
                    <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      2026 Projections
                    </h3>
                    <div className="grid grid-cols-5 gap-3">
                      <div className="text-center p-3 bg-white/80 rounded-lg">
                        <p className="text-xs text-gray-600 font-semibold mb-1">ERA</p>
                        <p className="text-xl font-bold text-green-700">{selectedPlayer.projection.pitching.era}</p>
                      </div>
                      <div className="text-center p-3 bg-white/80 rounded-lg">
                        <p className="text-xs text-gray-600 font-semibold mb-1">WHIP</p>
                        <p className="text-xl font-bold text-green-700">{selectedPlayer.projection.pitching.whip}</p>
                      </div>
                      <div className="text-center p-3 bg-white/80 rounded-lg">
                        <p className="text-xs text-gray-600 font-semibold mb-1">Wins</p>
                        <p className="text-xl font-bold text-green-700">{selectedPlayer.projection.pitching.wins}</p>
                      </div>
                      <div className="text-center p-3 bg-white/80 rounded-lg">
                        <p className="text-xs text-gray-600 font-semibold mb-1">K</p>
                        <p className="text-xl font-bold text-green-700">{selectedPlayer.projection.pitching.strikeouts}</p>
                      </div>
                      <div className="text-center p-3 bg-white/80 rounded-lg">
                        <p className="text-xs text-gray-600 font-semibold mb-1">Saves</p>
                        <p className="text-xl font-bold text-green-700">{selectedPlayer.projection.pitching.saves}</p>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
