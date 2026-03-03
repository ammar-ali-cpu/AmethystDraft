import { useState } from "react";
import { Link } from "react-router";
import { Zap, ArrowLeft } from "lucide-react";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // TODO: wire to your Express API, e.g.:
      // const res = await fetch("/api/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password }),
      // });
      // if (!res.ok) throw new Error("Invalid credentials");
      // const data = await res.json();
      // store token, redirect, etc.
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg" />

      <div className="login-container">
        <Link to="/" className="login-back">
          <ArrowLeft size={15} /> Back
        </Link>

        <div className="login-logo">
          <Zap size={18} style={{ color: "#a855f7" }} />
          <span>DRAFTROOM</span>
        </div>

        <h1 className="login-title">Sign In</h1>
        <p className="login-subtitle">Enter your credentials to access your draft room.</p>

        <form onSubmit={handleLogin} className="login-form">
          <div className="login-field">
            <label className="login-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="login-input"
              placeholder="you@email.com"
            />
          </div>

          <div className="login-field">
            <label className="login-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="login-input"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" disabled={loading} className="login-submit">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="login-footer">
          <p className="login-footer-text">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="login-link">Sign up</Link>
          </p>
          <Link to="/forgot-password" className="login-link">Forgot password?</Link>
        </div>
      </div>
    </div>
  );
}