import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

const inputCls = "w-full px-4 py-3 rounded-xl border border-border bg-primary text-text placeholder-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition";

const Field = ({ label, type, placeholder, value, onChange, onKeyDown, extra }) => (
  <div>
    <div className="flex justify-between items-center mb-1.5">
      <label className="text-xs font-semibold text-text uppercase tracking-wide">{label}</label>
      {extra}
    </div>
    <input type={type} placeholder={placeholder} value={value} onChange={onChange} onKeyDown={onKeyDown} className={inputCls} />
  </div>
);

// ✅ Reads the actual error message from backend response
const parseError = (err) => {
  const data = err?.response?.data;
  if (!data) return "Something went wrong. Please try again.";
  if (typeof data === "string") return data;
  if (data.message) return data.message;
  const messages = Object.values(data);
  return messages.length > 0 ? messages.join(" · ") : "Invalid input.";
};

function Login() {
  const navigate = useNavigate();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const handleLogin = async () => {
    setError(""); setLoading(true);
    try {
      const { data } = await login({ email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({
        id: data.id, name: data.name, email: data.email, role: data.role
      }));
      navigate("/dashboard");
    } catch (err) {
      setError(parseError(err)); // ✅ shows backend message e.g. "No account found with this email"
    } finally {
      setLoading(false);
    }
  };

  const onEnter = (e) => e.key === "Enter" && handleLogin();

  return (
    <div className="min-h-screen bg-secondary flex flex-col">
      <nav className="bg-white/80 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={() => navigate("/")} className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white text-sm font-bold">J</span>
            <span className="text-lg font-bold text-text">JobTrack <span className="text-accent">Pro</span></span>
          </button>
          <button onClick={() => navigate("/register")} className="text-sm text-muted hover:text-text transition-colors">
            Don't have an account? <span className="text-accent font-semibold">Sign Up</span>
          </button>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 py-16">
        {["top-20 right-0", "bottom-10 left-0"].map((pos) => (
          <div key={pos} className={`absolute ${pos} w-72 h-72 rounded-full opacity-10 pointer-events-none`}
            style={{ background: "radial-gradient(circle, #10b981 0%, transparent 70%)" }} />
        ))}

        <div className="relative w-full max-w-md">
          <div className="bg-white border border-border rounded-2xl shadow-sm p-10">
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-2xl mx-auto mb-4">👋</div>
              <h1 className="text-2xl font-bold text-text">Welcome back</h1>
              <p className="text-muted text-sm mt-1">Sign in to your JobTrack Pro account</p>
            </div>

            {error && (
              <div className="mb-5 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm flex items-center gap-2">
                <span>⚠️</span>{error}
              </div>
            )}

            <div className="space-y-4">
              <Field label="Email" type="email" placeholder="you@example.com" value={email}
                onChange={e => setEmail(e.target.value)} onKeyDown={onEnter} />
              <Field label="Password" type="password" placeholder="••••••••" value={password}
                onChange={e => setPassword(e.target.value)} onKeyDown={onEnter}
                extra={<button className="text-xs text-accent hover:text-accentDark transition-colors">Forgot password?</button>} />
            </div>

            <button onClick={handleLogin} disabled={loading}
              className="mt-6 w-full py-3 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accentDark transition-all shadow-md hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? "Signing in…" : "Sign In →"}
            </button>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-border" /><span className="text-xs text-muted">or</span><div className="flex-1 h-px bg-border" />
            </div>

            <p className="text-center text-sm text-muted">
              New to JobTrack Pro?{" "}
              <button onClick={() => navigate("/register")} className="text-accent font-semibold hover:text-accentDark transition-colors">
                Create a free account
              </button>
            </p>
          </div>
          <p className="text-center text-xs text-muted mt-5">🔒 Your data is secure and never shared.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;