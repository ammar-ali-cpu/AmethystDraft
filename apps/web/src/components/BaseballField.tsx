import React from 'react';
import { User, ShieldCheck } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  pos: string;
  team: string;
  value: number;
}

interface BaseballFieldProps {
  roster: Record<string, Player | null>;
  teamRating: number;
}

const positions = [
  { id: 'P', label: 'P', top: '75%', left: '50%' },
  { id: 'C', label: 'C', top: '88%', left: '50%' },
  { id: '1B', label: '1B', top: '65%', left: '72%' },
  { id: '2B', label: '2B', top: '50%', left: '62%' },
  { id: '3B', label: '3B', top: '65%', left: '28%' },
  { id: 'SS', label: 'SS', top: '50%', left: '38%' },
  { id: 'LF', label: 'LF', top: '25%', left: '15%' },
  { id: 'CF', label: 'CF', top: '15%', left: '50%' },
  { id: 'RF', label: 'RF', top: '25%', left: '85%' },
  { id: 'DH', label: 'DH', top: '85%', left: '15%' },
];

export function BaseballField({ roster, teamRating }: BaseballFieldProps) {
  return (
    <div className="relative w-full aspect-[4/3] bg-[#2D5A27] rounded-3xl overflow-hidden border-8 border-[#6C4675]/20 shadow-2xl">
      {/* Field Markings */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-4 border-white rounded-full rotate-45" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] border-4 border-white/40 rounded-full" />
      </div>

      {/* Team Rating Overlay */}
      <div className="absolute top-6 left-6 z-20">
        <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-purple-100 min-w-[160px]">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5 text-[#9966CC]" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Team Rating</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-black text-[#6C4675]">{teamRating}</span>
            <span className="text-sm font-bold text-green-500 mb-1">/ 100</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full mt-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#9966CC] to-[#6C4675] transition-all duration-1000"
              style={{ width: `${teamRating}%` }}
            />
          </div>
        </div>
      </div>

      {/* Position Nodes */}
      {positions.map((pos) => {
        const player = roster[pos.id];
        return (
          <div
            key={pos.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
            style={{ top: pos.top, left: pos.left }}
          >
            <div className={`relative flex flex-col items-center group`}>
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-lg transition-all
                ${player 
                  ? 'bg-[#9966CC] border-white scale-110 shadow-purple-500/50' 
                  : 'bg-white/20 border-white/40 backdrop-blur-sm'
                }
              `}>
                {player ? (
                  <User className="w-6 h-6 text-white" />
                ) : (
                  <span className="text-xs font-bold text-white/80">{pos.label}</span>
                )}
              </div>
              
              {player && (
                <div className="mt-2 bg-white px-3 py-1 rounded-lg shadow-md border border-purple-100 animate-in fade-in zoom-in duration-300">
                  <p className="text-[10px] font-bold text-[#6C4675] whitespace-nowrap leading-none mb-0.5">
                    {player.name.split(' ').pop()}
                  </p>
                  <p className="text-[8px] text-gray-500 font-bold uppercase text-center">{pos.id}</p>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Home Plate Area */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white/20 rotate-45 border border-white/40" />
    </div>
  );
}