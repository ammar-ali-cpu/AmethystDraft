import { useState } from "react";
import { Link } from "react-router";
import { Zap, ArrowLeft } from "lucide-react";
import "./Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // TODO: wire to your Express API, e.g.:
      // const res = await fetch("/api/auth/register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ displayName, email, password }),
      // });
      // if (!res.ok) throw new Error("Registration failed");
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="signup-page">
        <div className="signup-bg" />
        <div className="signup-success">
          <Zap size={28} style={{ color: "#a855f7" }} />
          <h1 className="signup-title">You are in.</h1>
          <p className="signup-subtitle">
            Account created for <strong style={{ color: "#f0e6ff" }}>{email}</strong>.
          </p>
          <Link to="/login" className="signup-link">Go to sign in</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-page">
      <div className="signup-bg" />
      <div className="signup-container">
        <Link to="/" className="signup-back">
          <ArrowLeft size={15} /> Back
        </Link>
        <div className="signup-logo">
          <Zap size={18} style={{ color: "#a855f7" }} />
          <span>DRAFTROOM</span>
        </div>
        <h1 className="signup-title">Create Account</h1>
        <p className="signup-subtitle">Set up your draft room in 60 seconds.</p>
        <form onSubmit={handleSignup} className="signup-form">
          <div className="signup-field">
            <label className="signup-label">Display Name</label>
            <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)}
              required className="signup-input" placeholder="Your name" />
          </div>
          <div className="signup-field">
            <label className="signup-label">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              required className="signup-input" placeholder="you@email.com" />
          </div>
          <div className="signup-field">
            <label className="signup-label">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              required minLength={6} className="signup-input" placeholder="Min 6 characters" />
          </div>
          {error && <p className="signup-error">{error}</p>}
          <button type="submit" disabled={loading} className="signup-submit">
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>
        <p className="signup-footer">
          Already have an account?{" "}
          <Link to="/login" className="signup-link">Sign in</Link>
        </p>
      </div>
    </div>
  );
}