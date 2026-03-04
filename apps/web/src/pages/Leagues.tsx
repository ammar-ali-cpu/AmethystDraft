import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

export default function Leagues() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0514",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "1rem",
      color: "#f0e6ff",
      fontFamily: "DM Sans, sans-serif"
    }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>League Lobby</h1>
      <p style={{ color: "#9070b8" }}>
        Logged in as <strong style={{ color: "#a855f7" }}>{user?.username}</strong> ({user?.email})
      </p>
      <p style={{ color: "#9070b8", fontSize: "0.875rem" }}>
        Auth is working. League lobby coming soon.
      </p>
      <button
        onClick={handleLogout}
        style={{
          marginTop: "1rem",
          padding: "0.6rem 1.5rem",
          background: "linear-gradient(135deg, #9333ea, #7c3aed)",
          border: "none",
          borderRadius: "8px",
          color: "#fff",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Log Out
      </button>
    </div>
  );
}