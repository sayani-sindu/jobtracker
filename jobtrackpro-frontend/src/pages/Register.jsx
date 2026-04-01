import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

const inputCls = "w-full px-4 py-3 rounded-xl border border-border bg-primary text-text placeholder-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition";

// ✅ name prop added and passed to input
const Field = ({ label, name, type, placeholder, value, onChange, onKeyDown }) => (
  <div>
    <label className="text-xs font-semibold text-text uppercase tracking-wide mb-1.5 block">{label}</label>
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={inputCls}
    />
  </div>
);

const parseError = (err) => {
  const data = err?.response?.data;
  if (err?.isOffline) return "Cannot connect to server. Please check your connection.";
  if (!data) return "Something went wrong. Please try again.";
  if (typeof data === "string") return data;
  if (data.message) return data.message;
  const messages = Object.values(data);
  return messages.length > 0 ? messages.join(" · ") : "Invalid input.";
};

function Register() {
  const navigate = useNavigate();
  const [form, setForm]       = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setError(""); setLoading(true);
    try {
      await register(form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify({
        id: res.data.id,
        name: res.data.name,
        email: res.data.email,
      }));
      navigate("/dashboard");
    } catch (err) {
      setError(parseError(err)); // ✅ shows backend message e.g. "An account with this email already exists"
    } finally {
      setLoading(false);
    }
  };

  const onEnter = (e) => e.key === "Enter" && handleSubmit();

  return (
    <div className="min-h-screen bg-secondary flex flex-col">
      <nav className="bg-white/80 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={() => navigate("/")} className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white text-sm font-bold">J</span>
            <span className="text-lg font-bold text-text">JobTrack <span className="text-accent">Pro</span></span>
          </button>
          <button onClick={() => navigate("/login")} className="text-sm text-muted hover:text-text transition-colors">
            Already have an account? <span className="text-accent font-semibold">Sign In</span>
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
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-2xl mx-auto mb-4">🚀</div>
              <h1 className="text-2xl font-bold text-text">Create account</h1>
              <p className="text-muted text-sm mt-1">Start tracking your job applications</p>
            </div>

            {error && (
              <div className="mb-5 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm flex items-center gap-2">
                <span>⚠️</span>{error}
              </div>
            )}

            <div className="space-y-4">
              <Field label="Name"     name="name"     type="text"     placeholder="Your name"        value={form.name}     onChange={handleChange} onKeyDown={onEnter} />
              <Field label="Email"    name="email"    type="email"    placeholder="you@example.com"  value={form.email}    onChange={handleChange} onKeyDown={onEnter} />
              <Field label="Password" name="password" type="password" placeholder="••••••••"         value={form.password} onChange={handleChange} onKeyDown={onEnter} />
            </div>

            <button onClick={handleSubmit} disabled={loading}
              className="mt-6 w-full py-3 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accentDark transition-all shadow-md hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? "Creating account…" : "Sign Up →"}
            </button>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-border" /><span className="text-xs text-muted">or</span><div className="flex-1 h-px bg-border" />
            </div>

            <p className="text-center text-sm text-muted">
              Already have an account?{" "}
              <button onClick={() => navigate("/login")} className="text-accent font-semibold hover:text-accentDark transition-colors">
                Sign In
              </button>
            </p>
          </div>
          <p className="text-center text-xs text-muted mt-5">🔒 Your data is secure and never shared.</p>
        </div>
      </div>
    </div>
  );
}

export default Register;