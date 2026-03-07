import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Player } from "../types/player";

interface SelectedPlayerContextType {
  selectedPlayer: Player | null;
  setSelectedPlayer: (p: Player | null) => void;
}

const SelectedPlayerContext = createContext<SelectedPlayerContextType>({
  selectedPlayer: null,
  setSelectedPlayer: () => {},
});

export function SelectedPlayerProvider({ children }: { children: ReactNode }) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  return (
    <SelectedPlayerContext.Provider
      value={{ selectedPlayer, setSelectedPlayer }}
    >
      {children}
    </SelectedPlayerContext.Provider>
  );
}

export function useSelectedPlayer() {
  return useContext(SelectedPlayerContext);
}
