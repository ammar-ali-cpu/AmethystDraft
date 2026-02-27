import { Star, Trash2, TrendingUp, X } from 'lucide-react';
import { useWatchlist } from '../contexts/WatchlistContext';
import { toast } from 'sonner';

interface WatchlistPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WatchlistPanel({ isOpen, onClose }: WatchlistPanelProps) {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  if (!isOpen) return null;

  const handleRemove = (playerId: string, playerName: string) => {
    removeFromWatchlist(playerId);
    toast.success(`${playerName} removed from watchlist`);
  };

  const getPositionColor = (pos: string) => {
    if (pos.includes('SP') || pos.includes('RP')) return 'bg-blue-100 text-blue-700';
    if (pos.includes('C')) return 'bg-red-100 text-red-700';
    if (pos.includes('OF')) return 'bg-green-100 text-green-700';
    return 'bg-purple-100 text-purple-700';
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#6C4675] to-[#9966CC] text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Star className="w-7 h-7 fill-current" />
              <div>
                <h2 className="text-2xl font-bold">My Watchlist</h2>
                <p className="text-sm opacity-90">{watchlist.length} players tracked</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(80vh-120px)] p-6">
          {watchlist.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Star className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p className="text-lg font-semibold mb-2">Your watchlist is empty</p>
              <p className="text-sm">Search for players and add them to track their stats</p>
            </div>
          ) : (
            <div className="space-y-4">
              {watchlist.map((player) => (
                <div
                  key={player.id}
                  className="bg-white border-2 border-purple-100 rounded-2xl p-4 hover:shadow-lg hover:border-[#9966CC] transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#6C4675] mb-1">{player.name}</h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm text-gray-500 font-semibold">{player.team}</span>
                        <span className={`text-xs px-2 py-1 rounded-full font-bold ${getPositionColor(player.position)}`}>
                          {player.position}
                        </span>
                        <span className="text-sm text-gray-400">Age {player.age}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-xs text-gray-500 font-semibold">ADP</p>
                        <p className="text-2xl font-bold text-[#6C4675]">{player.adp}</p>
                      </div>
                      <button
                        onClick={() => handleRemove(player.id, player.name)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                      >
                        <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
                      </button>
                    </div>
                  </div>

                  {/* Quick Stats Preview */}
                  {player.projection.batting && (
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-[#9966CC]" />
                        <span className="text-xs font-bold text-gray-600 uppercase">2026 Projections</span>
                      </div>
                      <div className="grid grid-cols-5 gap-2">
                        <div className="text-center">
                          <p className="text-[10px] text-gray-500 font-semibold">AVG</p>
                          <p className="text-sm font-bold text-[#6C4675]">{player.projection.batting.avg}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] text-gray-500 font-semibold">HR</p>
                          <p className="text-sm font-bold text-[#6C4675]">{player.projection.batting.hr}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] text-gray-500 font-semibold">RBI</p>
                          <p className="text-sm font-bold text-[#6C4675]">{player.projection.batting.rbi}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] text-gray-500 font-semibold">R</p>
                          <p className="text-sm font-bold text-[#6C4675]">{player.projection.batting.runs}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] text-gray-500 font-semibold">SB</p>
                          <p className="text-sm font-bold text-[#6C4675]">{player.projection.batting.sb}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {player.projection.pitching && (
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-[#9966CC]" />
                        <span className="text-xs font-bold text-gray-600 uppercase">2026 Projections</span>
                      </div>
                      <div className="grid grid-cols-5 gap-2">
                        <div className="text-center">
                          <p className="text-[10px] text-gray-500 font-semibold">ERA</p>
                          <p className="text-sm font-bold text-[#6C4675]">{player.projection.pitching.era}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] text-gray-500 font-semibold">WHIP</p>
                          <p className="text-sm font-bold text-[#6C4675]">{player.projection.pitching.whip}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] text-gray-500 font-semibold">W</p>
                          <p className="text-sm font-bold text-[#6C4675]">{player.projection.pitching.wins}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] text-gray-500 font-semibold">K</p>
                          <p className="text-sm font-bold text-[#6C4675]">{player.projection.pitching.strikeouts}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] text-gray-500 font-semibold">SV</p>
                          <p className="text-sm font-bold text-[#6C4675]">{player.projection.pitching.saves}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
