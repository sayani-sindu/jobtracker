import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJobStats } from "../services/jobService";
import { getReminders, createReminder, deleteReminder } from "../services/reminderService";

const COLORS = {
  Applied:   { bg: "bg-blue-50",   text: "text-blue-600",   dot: "bg-blue-500"   },
  Interview: { bg: "bg-yellow-50", text: "text-yellow-600", dot: "bg-yellow-500" },
  Offer:     { bg: "bg-green-50",  text: "text-green-600",  dot: "bg-green-500"  },
  Rejected:  { bg: "bg-red-50",    text: "text-red-600",    dot: "bg-red-400"    },
};

const inputCls = "w-full px-3 py-2 rounded-lg border border-border bg-primary text-text text-sm placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition";
const EMPTY_REMINDER = { message: "", dueDate: "", status: "Pending" };

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [stats, setStats]           = useState({ Applied: 0, Interview: 0, Offer: 0, Rejected: 0 });
  const [reminders, setReminders]   = useState([]);
  const [showForm, setShowForm]     = useState(false);
  const [newReminder, setNewReminder] = useState(EMPTY_REMINDER);

  useEffect(() => {
    getJobStats().then(r => setStats(r.data)).catch(console.log);
    getReminders().then(r => setReminders(Array.isArray(r.data) ? r.data : [])).catch(console.log);
  }, []);

  const data  = Object.entries(stats).map(([name, value]) => ({ name, value: Number(value) || 0 }));
  const total = data.reduce((s, d) => s + d.value, 0);

  const handleAddReminder = async () => {
    const res = await createReminder(newReminder).catch(console.log);
    if (res) {
      setReminders(prev => [...prev, res.data]);
      setNewReminder(EMPTY_REMINDER);
      setShowForm(false);
    }
  };

  const handleDeleteReminder = async (id) => {
    await deleteReminder(id).catch(console.log);
    setReminders(prev => prev.filter(r => r.reminderId !== id));
  };

  // ✅ Logout — clears storage and redirects to login
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const isOverdue = (due) => due && new Date(due) < new Date();

  return (
    <div className="min-h-screen bg-primary">

      {/* Navbar */}
      <nav className="bg-white border-b border-border px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white text-sm font-bold">J</span>
          <span className="text-lg font-bold text-text">JobTrack <span className="text-accent">Pro</span></span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted">Welcome, <span className="font-semibold text-text">{user?.name}</span></span>
          <button
            onClick={handleLogout}
            className="text-xs px-3 py-1.5 border border-border text-muted rounded-lg hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-colors"
          >
            Log out
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-text">Dashboard</h1>
          <p className="text-sm text-muted mt-1">Here's a summary of your job applications.</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {data.map(({ name, value }) => {
            const c = COLORS[name];
            return (
              <div key={name} className={`${c.bg} border border-border rounded-2xl p-5 flex flex-col gap-2`}>
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${c.dot}`} />
                  <span className={`text-xs font-semibold uppercase tracking-widest ${c.text}`}>{name}</span>
                </div>
                <span className="text-4xl font-extrabold text-text">{value}</span>
                <span className="text-xs text-muted">{total ? ((value / total) * 100).toFixed(0) : 0}% of total</span>
              </div>
            );
          })}
        </div>

        <div className="grid sm:grid-cols-2 gap-6">

          {/* Progress Bars */}
          <div className="bg-white border border-border rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-semibold text-text">Application breakdown</h2>
            {data.map(({ name, value }) => {
              const c = COLORS[name];
              const pct = total ? (value / total) * 100 : 0;
              return (
                <div key={name}>
                  <div className="flex justify-between text-xs text-muted mb-1">
                    <span className="font-medium text-text">{name}</span>
                    <span>{value} · {pct.toFixed(0)}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-border rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${c.dot} transition-all duration-500`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
            <div className="pt-3 border-t border-border flex justify-between text-xs">
              <span className="text-muted">Total Applications</span>
              <span className="font-bold text-text">{total}</span>
            </div>
          </div>

          {/* Reminders */}
          <div className="bg-white border border-border rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-semibold text-text">Reminders</h2>
              <button onClick={() => setShowForm(!showForm)}
                className="text-xs px-3 py-1.5 bg-accent text-white rounded-lg hover:bg-accentDark transition-colors">
                {showForm ? "Cancel" : "+ Add"}
              </button>
            </div>

            {showForm && (
              <div className="bg-primary border border-border rounded-xl p-4 space-y-2">
                <input placeholder="Reminder message" value={newReminder.message}
                  onChange={e => setNewReminder({ ...newReminder, message: e.target.value })} className={inputCls} />
                <input type="date" value={newReminder.dueDate}
                  onChange={e => setNewReminder({ ...newReminder, dueDate: e.target.value })} className={inputCls} />
                <select value={newReminder.status} onChange={e => setNewReminder({ ...newReminder, status: e.target.value })} className={inputCls}>
                  {["Pending", "Done"].map(s => <option key={s}>{s}</option>)}
                </select>
                <button onClick={handleAddReminder}
                  className="w-full py-2 bg-accent text-white text-xs font-semibold rounded-lg hover:bg-accentDark transition-colors">
                  Save Reminder
                </button>
              </div>
            )}

            <div className="flex-1 space-y-2 overflow-y-auto max-h-64">
              {reminders.length === 0 ? (
                <p className="text-xs text-muted italic text-center py-6">No reminders yet.</p>
              ) : (
                reminders.map((r) => {
                  const overdue = isOverdue(r.dueDate) && r.status !== "Done";
                  return (
                    <div key={r.reminderId} className={`flex items-start justify-between px-3 py-2.5 rounded-xl border ${overdue ? "bg-red-50 border-red-100" : "bg-primary border-border"}`}>
                      <div>
                        <p className={`text-xs font-medium ${overdue ? "text-red-600" : "text-text"}`}>{r.message}</p>
                        <p className={`text-xs mt-0.5 ${overdue ? "text-red-400" : "text-muted"}`}>
                          {r.dueDate || "No date"} · <span className={r.status === "Done" ? "text-green-500" : "text-yellow-500"}>{r.status}</span>
                          {overdue && " · Overdue"}
                        </p>
                      </div>
                      <button onClick={() => handleDeleteReminder(r.reminderId)} className="text-xs text-red-300 hover:text-red-500 ml-2">✕</button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        <button onClick={() => navigate("/jobs")}
          className="w-full py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accentDark transition-all shadow-md hover:-translate-y-0.5 text-sm">
          Manage Applications →
        </button>
      </div>
    </div>
  );
}

export default Dashboard;