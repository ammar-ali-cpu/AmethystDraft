import { useState} from 'react';
import { BaseballField } from './BaseballField';
import { Search, Trophy, History, Play, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

interface Player {
  id: string;
  name: string;
  pos: string;
  team: string;
  value: number;
}

const PLAYER_POOL: Player[] = [
  { id: '1', name: 'Ronald Acuña Jr.', pos: 'LF', team: 'ATL', value: 98 },
  { id: '2', name: 'Shohei Ohtani', pos: 'DH', team: 'LAD', value: 99 },
  { id: '3', name: 'Julio Rodríguez', pos: 'CF', team: 'SEA', value: 96 },
  { id: '4', name: 'Bobby Witt Jr.', pos: 'SS', team: 'KC', value: 95 },
  { id: '5', name: 'Corbin Carroll', pos: 'RF', team: 'AZ', value: 94 },
  { id: '6', name: 'Mookie Betts', pos: '2B', team: 'LAD', value: 97 },
  { id: '7', name: 'Freddie Freeman', pos: '1B', team: 'LAD', value: 93 },
  { id: '8', name: 'Kyle Tucker', pos: 'RF', team: 'HOU', value: 92 },
  { id: '9', name: 'Aaron Judge', pos: 'CF', team: 'NYY', value: 96 },
  { id: '10', name: 'Juan Soto', pos: 'LF', team: 'NYY', value: 95 },
  { id: '11', name: 'Jose Ramirez', pos: '3B', team: 'CLE', value: 92 },
  { id: '12', name: 'Trea Turner', pos: 'SS', team: 'PHI', value: 91 },
  { id: '13', name: 'Spencer Strider', pos: 'P', team: 'ATL', value: 96 },
  { id: '14', name: 'Gerrit Cole', pos: 'P', team: 'NYY', value: 94 },
  { id: '15', name: 'Adley Rutschman', pos: 'C', team: 'BAL', value: 90 },
  { id: '16', name: 'Austin Riley', pos: '3B', team: 'ATL', value: 91 },
  { id: '17', name: 'Yordan Alvarez', pos: 'DH', team: 'HOU', value: 94 },
  { id: '18', name: 'Matt Olson', pos: '1B', team: 'ATL', value: 92 },
  { id: '19', name: 'Marcus Semien', pos: '2B', team: 'TEX', value: 89 },
  { id: '20', name: 'Will Smith', pos: 'C', team: 'LAD', value: 88 },
];

export function MockDraftSimulator() {
  const [availablePlayers, setAvailablePlayers] = useState<Player[]>(PLAYER_POOL);
  const [roster, setRoster] = useState<Record<string, Player | null>>({
    P: null, C: null, '1B': null, '2B': null, '3B': null, SS: null, LF: null, CF: null, RF: null, DH: null
  });
  const [draftHistory, setDraftHistory] = useState<{ name: string; team: string; pick: number }[]>([]);
  const [teamRating, setTeamRating] = useState(0);
  const [isAiDrafting, setIsAiDrafting] = useState(false);

  const calculateRating = (currentRoster: Record<string, Player | null>) => {
    const filledPositions = Object.values(currentRoster).filter(p => p !== null);
    if (filledPositions.length === 0) return 0;
    const avgValue = filledPositions.reduce((acc, p) => acc + (p?.value || 0), 0) / 10;
    return Math.round(avgValue);
  };

  const draftPlayer = (player: Player) => {
    if (roster[player.pos]) {
      toast.error(`You already have a ${player.pos}!`);
      return;
    }

    const newRoster = { ...roster, [player.pos]: player };
    setRoster(newRoster);
    setAvailablePlayers(prev => prev.filter(p => p.id !== player.id));
    setDraftHistory(prev => [...prev, { name: player.name, team: 'YOU', pick: prev.length + 1 }]);
    setTeamRating(calculateRating(newRoster));
    toast.success(`Drafted ${player.name}`);

    // Simulate AI picks
    setIsAiDrafting(true);
    setTimeout(() => {
      simulateAiPicks(player.id);
      setIsAiDrafting(false);
    }, 800);
  };

  const simulateAiPicks = (lastUserPickId: string) => {
    setAvailablePlayers(prev => {
      const remaining = [...prev];
      const aiPicks: { name: string; team: string; pick: number }[] = [];
      
      // Simulate 3 AI teams drafting
      for (let i = 0; i < 3; i++) {
        if (remaining.length > 0) {
          const randomIndex = Math.floor(Math.random() * Math.min(5, remaining.length));
          const picked = remaining.splice(randomIndex, 1)[0];
          aiPicks.push({ name: picked.name, team: `AI Team ${i + 1}`, pick: draftHistory.length + i + 2 });
        }
      }
      
      setDraftHistory(prevH => [...prevH, ...aiPicks]);
      return remaining;
    });
  };

  const resetDraft = () => {
    setAvailablePlayers(PLAYER_POOL);
    setRoster({
      P: null, C: null, '1B': null, '2B': null, '3B': null, SS: null, LF: null, CF: null, RF: null, DH: null
    });
    setDraftHistory([]);
    setTeamRating(0);
    toast.info("Draft reset");
  };

  return (
    <section className="py-12 bg-[#F9F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Simulator Area */}
          <div className="flex-1 space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-3xl font-bold text-[#6C4675]">Live Mock Draft</h2>
                <p className="text-gray-600">Simulate your draft against Amethyst AI.</p>
              </div>
              <button 
                onClick={resetDraft}
                className="flex items-center gap-2 px-4 py-2 text-[#9966CC] border border-[#9966CC] rounded-lg hover:bg-purple-50 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Draft
              </button>
            </div>

            <BaseballField roster={roster} teamRating={teamRating} />
          </div>

          {/* Sidebar: Player List & History */}
          <div className="lg:w-96 flex flex-col gap-6">
            
            {/* Available Players */}
            <div className="bg-white rounded-2xl shadow-sm border border-purple-100 flex-1 overflow-hidden flex flex-col">
              <div className="p-4 border-b border-purple-50 bg-[#6C4675] text-white flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold">
                  <Search className="w-4 h-4" />
                  <span>Available Players</span>
                </div>
                {isAiDrafting && (
                  <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white/20 rounded-full animate-pulse">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    <span className="text-[10px] font-bold">AI Drafting...</span>
                  </div>
                )}
              </div>
              
              <div className="flex-1 overflow-y-auto max-h-[400px]">
                <table className="w-full text-sm">
                  <thead className="bg-purple-50 text-gray-500 font-bold sticky top-0">
                    <tr>
                      <th className="px-4 py-2 text-left">PLAYER</th>
                      <th className="px-4 py-2 text-center">POS</th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-50">
                    {availablePlayers.map((player) => {
                      const isTaken = roster[player.pos] !== null;
                      return (
                        <tr key={player.id} className={`hover:bg-purple-50/50 transition-colors ${isTaken ? 'opacity-50' : ''}`}>
                          <td className="px-4 py-3">
                            <p className="font-bold text-gray-900">{player.name}</p>
                            <p className="text-[10px] text-gray-500 uppercase font-bold">{player.team}</p>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className="inline-block px-2 py-0.5 bg-purple-100 text-[#9966CC] rounded font-bold text-[10px]">
                              {player.pos}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button 
                              onClick={() => draftPlayer(player)}
                              disabled={isTaken || isAiDrafting}
                              className={`
                                p-2 rounded-lg transition-all
                                ${isTaken 
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                  : 'bg-[#9966CC] text-white hover:bg-[#8252b0] active:scale-95 shadow-md shadow-purple-200'}
                              `}
                            >
                              <Play className="w-4 h-4 fill-current" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Draft History */}
            <div className="bg-white rounded-2xl shadow-sm border border-purple-100 h-64 overflow-hidden flex flex-col">
              <div className="p-4 border-b border-purple-50 bg-[#F9F7FA] flex items-center gap-2 font-bold text-[#6C4675]">
                <History className="w-4 h-4" />
                <span>Recent Picks</span>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {draftHistory.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <Trophy className="w-8 h-8 mb-2 opacity-20" />
                    <p className="text-xs">No picks yet</p>
                  </div>
                ) : (
                  [...draftHistory].reverse().map((pick, i) => (
                    <div key={i} className="flex items-center justify-between text-xs border-b border-purple-50 pb-2">
                      <div>
                        <p className="font-bold text-gray-900">{pick.name}</p>
                        <p className="text-[10px] text-gray-500">{pick.team}</p>
                      </div>
                      <span className="font-mono text-purple-300 font-bold">#{pick.pick}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}