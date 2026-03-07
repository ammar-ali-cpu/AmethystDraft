import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  Zap,
  ChevronDown,
  Settings,
  LogOut,
  UserCog,
  Bell,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useLeague } from "../contexts/LeagueContext";
import "./AuthNavbar.css";

export default function AuthNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { league, allLeagues } = useLeague();
  const [leagueDropdownOpen, setLeagueDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [alertTab, setAlertTab] = useState("All Alerts");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const alertsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setLeagueDropdownOpen(false);
      }
    };
    if (leagueDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [leagueDropdownOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(e.target as Node)
      ) {
        setUserDropdownOpen(false);
      }
    };
    if (userDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userDropdownOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (alertsRef.current && !alertsRef.current.contains(e.target as Node)) {
        setAlertsOpen(false);
      }
    };
    if (alertsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [alertsOpen]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const leagueBase = league ? `/leagues/${league.id}` : "";
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="auth-navbar">
      <div className="auth-navbar-logo" onClick={() => navigate("/leagues")}>
        <Zap size={18} className="logo-icon" />
        <span className="logo-text">DRAFTROOM</span>
      </div>

      {league && (
        <div className="auth-navbar-center">
          <button
            className={
              "nav-link" +
              (isActive(`${leagueBase}/research`) ? " nav-link-active" : "")
            }
            onClick={() => navigate(`${leagueBase}/research`)}
          >
            Research
          </button>
          <button
            className={
              "nav-link" +
              (isActive(`${leagueBase}/my-draft`) ? " nav-link-active" : "")
            }
            onClick={() => navigate(`${leagueBase}/my-draft`)}
          >
            My Draft
          </button>
          <button
            className={
              "nav-link" +
              (isActive(`${leagueBase}/command-center`)
                ? " nav-link-active"
                : "")
            }
            onClick={() => navigate(`${leagueBase}/command-center`)}
          >
            Command Center
          </button>
          <button
            className={
              "nav-link" +
              (isActive(`${leagueBase}/overview`) ? " nav-link-active" : "")
            }
            onClick={() => navigate(`${leagueBase}/overview`)}
          >
            Overview
          </button>
        </div>
      )}

      <div className="auth-navbar-actions">
        {league && (
          <div className="league-selector" ref={dropdownRef}>
            <button
              className="league-selector-btn"
              onClick={() => setLeagueDropdownOpen((o) => !o)}
            >
              <span>{league.name}</span>
              <ChevronDown
                size={14}
                className={
                  "league-selector-chevron" +
                  (leagueDropdownOpen ? " chevron-open" : "")
                }
              />
            </button>
            {leagueDropdownOpen && (
              <div className="league-selector-dropdown">
                {allLeagues.map((l) => (
                  <div
                    key={l.id}
                    className={
                      "league-selector-row" +
                      (l.id === league.id ? " league-selector-row-current" : "")
                    }
                  >
                    <button
                      className="league-selector-item"
                      onClick={() => {
                        navigate(`/leagues/${l.id}/research`);
                        setLeagueDropdownOpen(false);
                      }}
                    >
                      {l.name}
                    </button>
                    <button
                      className="league-selector-settings"
                      title="League settings"
                      onClick={() => {
                        navigate(`/leagues/${l.id}/settings`);
                        setLeagueDropdownOpen(false);
                      }}
                    >
                      <Settings size={13} />
                    </button>
                  </div>
                ))}
                <div className="league-selector-divider" />
                <button
                  className="league-selector-item"
                  onClick={() => {
                    navigate("/leagues");
                    setLeagueDropdownOpen(false);
                  }}
                >
                  All Leagues
                </button>
              </div>
            )}
          </div>
        )}
        {league && (
          <div className="nb-alerts-wrap" ref={alertsRef}>
            <button
              className="nb-alerts-btn"
              onClick={() => setAlertsOpen((o) => !o)}
              title="Intelligence Alerts"
            >
              <Bell size={15} />
            </button>
            {alertsOpen && (
              <div className="nb-alerts-dropdown">
                <div className="nb-alerts-header">
                  <span className="nb-alerts-title">Intelligence Alerts</span>
                </div>
                <div className="nb-alerts-tabs">
                  {[
                    "All Alerts",
                    "External Baseball",
                    "Structural Signals",
                  ].map((t) => (
                    <button
                      key={t}
                      className={
                        "nb-alert-tab" + (alertTab === t ? " active" : "")
                      }
                      onClick={() => setAlertTab(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <div className="nb-alerts-list">
                  <div className="nb-alerts-empty">
                    No alerts — intelligence feed coming soon
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        <div className="user-avatar-wrap" ref={userDropdownRef}>
          <button
            className="user-avatar-btn"
            onClick={() => setUserDropdownOpen((o) => !o)}
            title={user?.displayName}
          >
            {user?.displayName?.[0]?.toUpperCase() ?? "?"}
          </button>
          {userDropdownOpen && (
            <div className="user-dropdown">
              <div className="user-dropdown-greeting">
                Hi, {user?.displayName ?? "there"}
              </div>
              <div className="user-dropdown-divider" />
              <button
                className="user-dropdown-item"
                onClick={() => {
                  navigate("/account");
                  setUserDropdownOpen(false);
                }}
              >
                <UserCog size={14} />
                <span>Manage Account</span>
              </button>
              <button
                className="user-dropdown-item user-dropdown-signout"
                onClick={() => {
                  handleLogout();
                  setUserDropdownOpen(false);
                }}
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
