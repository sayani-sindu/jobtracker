import { useNavigate } from "react-router-dom";

const FEATURES = [
  { icon: "📋", title: "Track Applications", desc: "Log every job you apply to — company, role, date, and more — all in one place." },
  { icon: "📊", title: "Monitor Progress", desc: "See your pipeline at a glance: applied, interviewing, offered, or rejected." },
  { icon: "🔔", title: "Stay Organized", desc: "Never miss a follow-up. Keep notes and deadlines for every opportunity." },
];

const STEPS = [
  { number: "01", label: "Create a free account" },
  { number: "02", label: "Add your applications" },
  { number: "03", label: "Track every stage" },
  { number: "04", label: "Land your dream job" },
];

function Home() {
  const navigate = useNavigate();

  // ✅ Scroll Function
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-secondary text-ink">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white text-sm font-bold shadow-sm">J</span>
            <span className="text-lg font-bold tracking-tight text-ink">
              JobTrack <span className="text-accent">Pro</span>
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
                onClick={() => scrollToSection("about")}
                className="px-4 py-2 text-sm font-medium text-muted hover:text-accent hover:bg-accent/10 rounded-md transition-all duration-200"
                >
                About
            </button>

            <button
                onClick={() => scrollToSection("contact")}
                className="px-4 py-2 text-sm font-medium text-muted hover:text-accent hover:bg-accent/10 rounded-md transition-all duration-200"
                >
                Contact
            </button>

            <button
              onClick={() => navigate("/login")}
              className="ml-2 px-4 py-2 text-sm font-medium text-ink border border-border rounded-lg hover:bg-primary transition-colors"
            >
              Sign In
            </button>

            <button
              onClick={() => navigate("/register")}
              className="ml-2 px-4 py-2 text-sm font-medium text-white bg-accent rounded-lg hover:bg-accentDark transition-colors shadow-sm"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary">
        <div className="relative max-w-6xl mx-auto px-6 py-28 flex flex-col items-center text-center gap-6">
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight tracking-tight text-ink max-w-3xl">
            Your job search,{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-accent">finally organized</span>
              <span
                className="absolute bottom-1 left-0 w-full h-3 opacity-20 rounded"
                style={{ background: "#10b981" }}
              />
            </span>.
          </h1>

          <p className="text-muted text-lg max-w-xl leading-relaxed">
            JobTrack Pro keeps every application, interview, and follow-up in one clean dashboard — so you can focus on landing the role, not managing spreadsheets.
          </p>

          <div className="flex gap-3 mt-2">
            <button
              onClick={() => navigate("/register")}
              className="px-7 py-3 bg-white text-black text-sm font-semibold rounded-xl hover:bg-secondary hover:text-white transition-all shadow-md"
            >
              Get Started Free →
            </button>

            <button
              onClick={() => navigate("/login")}
              className="px-7 py-3 bg-white text-black text-sm font-medium rounded-xl border border-border hover:bg-secondary hover:text-white transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Features (About Section) */}
      <section id="about" className="bg-secondary py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
              Why JobTrack Pro
            </p>
            <h2 className="text-3xl font-bold text-ink">
              Everything your job search needs
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {FEATURES.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-primary border border-border rounded-2xl p-7 hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-border flex items-center justify-center text-2xl mb-5 shadow-sm group-hover:scale-105 transition-transform">
                  {icon}
                </div>
                <h3 className="text-base font-semibold text-ink mb-2">
                  {title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-primary py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
              Simple process
            </p>
            <h2 className="text-3xl font-bold text-ink">How it works</h2>
          </div>

          <div className="grid sm:grid-cols-4 gap-4 relative">
            <div className="hidden sm:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-border z-0" />

            {STEPS.map(({ number, label }) => (
              <div
                key={number}
                className="relative z-10 flex flex-col items-center text-center gap-3"
              >
                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-border flex items-center justify-center text-accent font-extrabold text-lg shadow-sm">
                  {number}
                </div>
                <p className="text-sm font-medium text-ink max-w-[120px] leading-snug">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer (Contact Section) */}
      <footer id="contact" className="bg-secondary border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted">
          
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-accent flex items-center justify-center text-white font-bold text-xs">
              J
            </span>
            <span className="font-medium text-ink">JobTrack Pro</span>
          </div>

          <span>
            © {new Date().getFullYear()} JobTrack Pro. All rights reserved.
          </span>

          {/* ✅ Contact Info */}
          <div className="flex flex-col sm:flex-row gap-2 text-xs text-muted">
            <span>Email: sindusayani@gmail.com</span>
            <span>Phone: +91 9014985249</span>
          </div>

        </div>
      </footer>

    </div>
  );
}

export default Home;