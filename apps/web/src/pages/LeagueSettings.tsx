import { useState } from "react";
import { ArrowLeft, Search, Save } from "lucide-react";
import { useNavigate } from "react-router";
import { useLeague } from "../contexts/LeagueContext";
import { useLeagueForm } from "../hooks/useLeagueForm";
import { hittingStats, pitchingStats, keeperSlots } from "../types/league";
import "./LeagueSettings.css";

// TODO(db): Replace all local state with API load + save when league persistence is wired.

type Section = "setup" | "scoring" | "teams" | "keepers";

const navItems: { id: Section; label: string; desc: string }[] = [
  { id: "setup",   label: "League Setup",  desc: "Name, teams, budget, roster" },
  { id: "scoring", label: "Scoring",       desc: "Player pool & stat categories" },
  { id: "teams",   label: "Team Names",    desc: "Customize each team's name" },
  { id: "keepers", label: "Keepers",       desc: "Manage keeper rosters per team" },
];

export default function LeagueSettings() {
  const navigate = useNavigate();
  const { league } = useLeague();

  const [activeSection, setActiveSection] = useState<Section>("setup");

  const {
    leagueName, setLeagueName,
    teams, setTeams,
    budget, setBudget,
    rosterSlots, totalRosterSpots,
    playerPool, setPlayerPool,
    selectedHitting, setSelectedHitting,
    selectedPitching, setSelectedPitching,
    teamNames,
    activeKeeperTeam, setActiveKeeperTeam,
    playerSearch, setPlayerSearch,
    teamKeepers,
    currentKeepers, remainingBudget, completionPercent,
    filteredPlayers,
    toggleStat, updateRosterCount, updateTeamName, addKeeper, removeKeeper,
  } = useLeagueForm({
    initialName:   league?.name   ?? "My League",
    initialTeams:  league?.teams  ?? 12,
    initialBudget: league?.budget ?? 260,
  });

  const backPath = league ? `/leagues/${league.id}/research` : "/leagues";

  const handleSave = () => {
    // TODO(db): POST/PATCH league settings to backend here.
    console.log("Save settings", { leagueName, teams, budget, rosterSlots, playerPool, selectedHitting, selectedPitching, teamNames, teamKeepers });
    navigate(backPath);
  };

  return (
    <div className="ls-page">
      <div className="ls-container">
        <button className="ls-back" onClick={() => navigate(backPath)}>
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        <div className="ls-header">
          <h1>{league?.name ?? "League"} Settings</h1>
          <p>Edit any section independently — changes won't be saved until you click Save.</p>
        </div>

        <div className="ls-layout">
          {/* Sidebar nav */}
          <nav className="ls-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={"ls-nav-item" + (activeSection === item.id ? " ls-nav-item-active" : "")}
                onClick={() => setActiveSection(item.id)}
              >
                <span className="ls-nav-label">{item.label}</span>
                <span className="ls-nav-desc">{item.desc}</span>
              </button>
            ))}
          </nav>

          {/* Content panel */}
          <div className="ls-panel">
            {activeSection === "setup" && (
              <div className="ls-section">
                <div className="ls-section-heading">League Setup</div>

                <div className="ls-form-grid">
                  <div className="ls-field">
                    <label>LEAGUE NAME</label>
                    <input value={leagueName} onChange={(e) => setLeagueName(e.target.value)} />
                  </div>
                  <div className="ls-field">
                    <label>TEAMS</label>
                    <input type="number" value={teams} onChange={(e) => setTeams(Number(e.target.value))} />
                  </div>
                  <div className="ls-field">
                    <label>BUDGET ($)</label>
                    <input type="number" value={budget} onChange={(e) => setBudget(Number(e.target.value))} />
                  </div>
                </div>

                <div className="ls-subsection">
                  <div className="ls-label">ROSTER SLOTS</div>
                  <div className="ls-roster-table">
                    <div className="ls-roster-header"><span>POSITION</span><span>COUNT</span></div>
                    {rosterSlots.map((slot) => (
                      <div key={slot.position} className="ls-roster-row">
                        <span>{slot.position}</span>
                        <div className="ls-roster-controls">
                          <button type="button" onClick={() => updateRosterCount(slot.position, -1)}>−</button>
                          <span>{slot.count}</span>
                          <button type="button" onClick={() => updateRosterCount(slot.position, 1)}>+</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="ls-total">Total: {totalRosterSpots} roster spots</div>
                </div>
              </div>
            )}

            {activeSection === "scoring" && (
              <div className="ls-section">
                <div className="ls-section-heading">Scoring</div>

                <div className="ls-label" style={{ marginBottom: "10px" }}>PLAYER POOL</div>
                <div className="ls-pool-grid">
                  {(["Mixed MLB", "AL-Only", "NL-Only"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={"ls-pool-card" + (playerPool === option ? " ls-pool-card-selected" : "")}
                      onClick={() => setPlayerPool(option)}
                    >
                      <strong>{option}</strong>
                      <span>
                        {option === "Mixed MLB" ? "All players available" : option === "AL-Only" ? "American League only" : "National League only"}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="ls-subsection">
                  <div className="ls-label">STAT CATEGORIES</div>
                  <div className="ls-stats-grid">
                    <div className="ls-stats-col">
                      <div className="ls-sublabel">HITTING</div>
                      <div className="ls-check-grid">
                        {hittingStats.map((stat) => (
                          <label key={stat} className="ls-check-card">
                            <input type="checkbox" checked={selectedHitting.includes(stat)} onChange={() => toggleStat(stat, selectedHitting, setSelectedHitting)} />
                            <span>{stat}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="ls-stats-col">
                      <div className="ls-sublabel">PITCHING</div>
                      <div className="ls-check-grid">
                        {pitchingStats.map((stat) => (
                          <label key={stat} className="ls-check-card">
                            <input type="checkbox" checked={selectedPitching.includes(stat)} onChange={() => toggleStat(stat, selectedPitching, setSelectedPitching)} />
                            <span>{stat}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "teams" && (
              <div className="ls-section">
                <div className="ls-section-heading">Team Names</div>
                <p className="ls-copy">Name all {teams} teams in your league.</p>
                <div className="ls-team-grid">
                  {teamNames.slice(0, teams).map((name, i) => (
                    <div key={i} className="ls-field">
                      <label>Team {i + 1}</label>
                      <input value={name} onChange={(e) => updateTeamName(i, e.target.value)} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "keepers" && (
              <div className="ls-section">
                <div className="ls-section-heading">Keepers</div>

                <select
                  className="ls-keeper-select"
                  value={activeKeeperTeam}
                  onChange={(e) => setActiveKeeperTeam(e.target.value)}
                >
                  {teamNames.slice(0, teams).map((name, i) => (
                    <option key={i} value={name}>Managing keepers for: {name}</option>
                  ))}
                </select>

                <div className="ls-keepers-layout">
                  <div className="ls-keeper-panel">
                    <div className="ls-keeper-title">AVAILABLE PLAYERS</div>
                    <div className="ls-searchbar">
                      <Search size={14} />
                      <input placeholder="Search..." value={playerSearch} onChange={(e) => setPlayerSearch(e.target.value)} />
                    </div>
                    <div className="ls-filter-row">
                      {["ALL", "C", "IF", "OF", "P"].map((f) => <button key={f} type="button">{f}</button>)}
                    </div>
                    <div className="ls-player-list">
                      {filteredPlayers.map((player) => (
                        <div key={player.id} className="ls-player-row">
                          <div className="ls-avatar">{player.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}</div>
                          <div className="ls-player-main">
                            <div className="ls-player-name">{player.name}</div>
                            <div className="ls-player-meta">{player.team}</div>
                          </div>
                          <div className="ls-badge">{player.pos}</div>
                          <div className="ls-adp">ADP {player.adp}</div>
                          <button type="button" className="ls-add-btn" onClick={() => addKeeper(player)}>+</button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="ls-keeper-panel">
                    <div className="ls-keeper-title">{activeKeeperTeam.toUpperCase()} — KEEPER ROSTER</div>
                    <div className="ls-progress-copy">{completionPercent}% filled ({currentKeepers.length}/{keeperSlots.length})</div>
                    <div className="ls-progressbar"><div style={{ width: `${completionPercent}%` }} /></div>
                    <div className="ls-budget">Remaining Budget: ${remainingBudget}</div>
                    <div className="ls-player-list">
                      {keeperSlots.map((slot, i) => {
                        const keeper = currentKeepers[i];
                        return (
                          <div key={`${slot}-${i}`} className="ls-keeper-row">
                            <div className="ls-keeper-slot">{slot}</div>
                            <div className="ls-keeper-player">{keeper ? `${keeper.playerName} (${keeper.team})` : "(empty)"}</div>
                            <div className="ls-keeper-cost">${keeper ? keeper.cost : 0}</div>
                            {keeper
                              ? <button type="button" className="ls-remove-btn" onClick={() => removeKeeper(i)}>Remove</button>
                              : <div className="ls-empty-slot">—</div>
                            }
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="ls-save-row">
              <button className="ls-save-btn" onClick={handleSave}>
                <Save size={15} />
                <span>Save Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

