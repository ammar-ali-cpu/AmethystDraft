import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useParams } from "react-router";
import { useAuth } from "./AuthContext";
import { getNotes, saveNote } from "../api/notes";

interface PlayerNotesContextType {
  getNote: (playerId: string) => string;
  setNote: (playerId: string, note: string) => void;
}

const PlayerNotesContext = createContext<PlayerNotesContextType>({
  getNote: () => "",
  setNote: () => {},
});

export function PlayerNotesProvider({ children }: { children: ReactNode }) {
  const { id: leagueId } = useParams<{ id: string }>();
  const { token } = useAuth();
  const [notes, setNotes] = useState<Record<string, string>>({});
  // Pending saves: map of playerId → debounce timer id
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  // Load all notes for this league on mount / leagueId change
  useEffect(() => {
    if (!leagueId || !token) return;
    let cancelled = false;
    getNotes(leagueId, token)
      .then((data) => {
        if (!cancelled) setNotes(data);
      })
      .catch(console.error);
    return () => {
      cancelled = true;
    };
  }, [leagueId, token]);

  const getNote = useCallback(
    (playerId: string) => notes[playerId] ?? "",
    [notes],
  );

  const setNote = useCallback(
    (playerId: string, note: string) => {
      // Update local state immediately for responsive UI
      setNotes((prev) => ({ ...prev, [playerId]: note }));

      // Debounce the DB write — 600 ms after the last keystroke
      if (!leagueId || !token) return;
      clearTimeout(timers.current[playerId]);
      timers.current[playerId] = setTimeout(() => {
        saveNote(leagueId, playerId, note, token).catch(console.error);
      }, 600);
    },
    [leagueId, token],
  );

  return (
    <PlayerNotesContext.Provider value={{ getNote, setNote }}>
      {children}
    </PlayerNotesContext.Provider>
  );
}

export function usePlayerNotes() {
  return useContext(PlayerNotesContext);
}
