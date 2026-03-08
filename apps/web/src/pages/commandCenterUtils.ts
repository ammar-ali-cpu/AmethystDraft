import type { Player } from "../types/player";
import type { RosterEntry } from "../api/roster";
import type { League } from "../contexts/LeagueContext";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface TeamSummary {
  name: string;
  spent: number;
  filled: number;
  open: number;
  remaining: number;
  maxBid: number;
  ppSpot: number;
}

export interface PositionMarket {
  position: string;
  avgWinPrice: number;
  avgProjValue: number;
  inflation: number;
  remainingCount: number;
  scarcityRankNum: number;
  scarcityRankOf: number;
  supply: Array<{ tier: number; count: number; avgVal: number | null }>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

export function getStatByCategory(
  player: Player,
  catName: string,
  catType: "batting" | "pitching",
): number {
  const name = catName.toUpperCase();
  if (catType === "batting") {
    const b = player.stats?.batting;
    if (!b) return 0;
    if (name === "HR") return b.hr;
    if (name === "RBI") return b.rbi;
    if (name === "R" || name === "RUNS") return b.runs;
    if (name === "SB") return b.sb;
    if (name === "AVG") return parseFloat(b.avg) || 0;
    if (name === "OBP") return parseFloat(b.obp) || 0;
    if (name === "SLG") return parseFloat(b.slg) || 0;
    return 0;
  } else {
    const p = player.stats?.pitching;
    if (!p) return 0;
    if (name === "W" || name === "WINS") return p.wins;
    if (name === "K" || name === "SO") return p.strikeouts;
    if (name === "ERA") return parseFloat(p.era) || 0;
    if (name === "WHIP" || name === "WALKS + HITS PER IP")
      return parseFloat(p.whip) || 0;
    if (name === "SV" || name === "SAVES") return p.saves;
    if (name === "IP") return parseFloat(p.innings) || 0;
    return 0;
  }
}

export function computeTeamData(
  league: League,
  entries: RosterEntry[],
): TeamSummary[] {
  const totalSlots = Object.values(league.rosterSlots).reduce(
    (a, b) => a + b,
    0,
  );
  return league.teamNames.map((name, i) => {
    const teamId = `team_${i + 1}`;
    const mine = entries.filter((e) => e.teamId === teamId);
    const spent = mine.reduce((s, e) => s + e.price, 0);
    const filled = mine.length;
    const open = Math.max(0, totalSlots - filled);
    const remaining = Math.max(0, league.budget - spent);
    const maxBid = open > 0 ? Math.max(1, remaining - (open - 1)) : 0;
    const ppSpot = open > 0 ? +(remaining / open).toFixed(1) : 0;
    return { name, spent, filled, open, remaining, maxBid, ppSpot };
  });
}

export function computePositionMarket(
  position: string | null,
  allPlayers: Player[],
  draftedIds: Set<string>,
  rosterEntries: RosterEntry[],
): PositionMarket | null {
  if (!position || allPlayers.length === 0) return null;
  const posPlayers = allPlayers.filter((p) => p.position === position);
  const draftedAtPos = posPlayers.filter((p) => draftedIds.has(p.id));
  const remaining = posPlayers.filter((p) => !draftedIds.has(p.id));
  const draftedEntries = rosterEntries.filter((e) =>
    draftedAtPos.some((p) => p.id === e.externalPlayerId),
  );
  const avgWinPrice = draftedEntries.length
    ? Math.round(
        draftedEntries.reduce((s, e) => s + e.price, 0) / draftedEntries.length,
      )
    : 0;
  const avgProjValue = remaining.length
    ? Math.round(remaining.reduce((s, p) => s + p.value, 0) / remaining.length)
    : 0;
  const inflation =
    avgWinPrice > 0 && avgProjValue > 0
      ? Math.round((avgWinPrice / avgProjValue - 1) * 100)
      : 0;

  const allPositions = [...new Set(allPlayers.map((p) => p.position))];
  const remainingByPos = allPositions
    .map((pos) => ({
      pos,
      count: allPlayers.filter(
        (p) => p.position === pos && !draftedIds.has(p.id),
      ).length,
    }))
    .sort((a, b) => a.count - b.count);
  const scarcityRankNum =
    remainingByPos.findIndex((r) => r.pos === position) + 1;
  const scarcityRankOf = remainingByPos.length;

  const allTiers = [...new Set(remaining.map((p) => p.tier))].sort(
    (a, b) => a - b,
  );
  const avgOrNull = (arr: Player[]) =>
    arr.length
      ? Math.round(arr.reduce((s, p) => s + p.value, 0) / arr.length)
      : null;

  return {
    position,
    avgWinPrice,
    avgProjValue,
    inflation,
    remainingCount: remaining.length,
    scarcityRankNum,
    scarcityRankOf,
    supply: allTiers.map((tier) => {
      const arr = remaining.filter((p) => p.tier === tier);
      return { tier, count: arr.length, avgVal: avgOrNull(arr) };
    }),
  };
}
