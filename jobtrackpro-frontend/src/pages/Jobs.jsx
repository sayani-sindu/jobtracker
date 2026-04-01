import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJobs, deleteJob } from "../services/jobService";
import { createRound, deleteRound } from "../services/interviewService";
import { useLocation } from "react-router-dom";

const STATUS_STYLE = {
  Applied:   "bg-blue-50 text-blue-600",
  Interview: "bg-yellow-50 text-yellow-600",
  Offer:     "bg-green-50 text-green-600",
  Rejected:  "bg-red-50 text-red-500",
};

const inputCls = "w-full px-3 py-2 rounded-lg border border-border bg-white text-text text-xs placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition";
const EMPTY_ROUND = { title: "", date: "", outcome: "", followUpDate: "" };

function Jobs() {
  const navigate = useNavigate();
  const [jobs, setJobs]             = useState([]);
  const [search, setSearch]         = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [showForm, setShowForm]     = useState(null);
  const [newRound, setNewRound]     = useState(EMPTY_ROUND);

  const location = useLocation();

  useEffect(() => {
    getJobs()
      .then(r => setJobs(Array.isArray(r.data) ? r.data : []))
      .catch(console.log);
  }, [location.key]);
  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const filtered = jobs.filter(j =>
    j.company?.toLowerCase().includes(search.toLowerCase()) ||
    j.role?.toLowerCase().includes(search.toLowerCase()) ||
    j.location?.toLowerCase().includes(search.toLowerCase()) ||
    j.status?.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (jobId) => setExpandedId(prev => prev === jobId ? null : jobId);

  const handleDelete = async (e, jobId) => {
    e.stopPropagation();
    if (!window.confirm("Delete this application?")) return;
    await deleteJob(jobId).catch(console.log);
    setJobs(prev => prev.filter(j => j.id !== jobId));
    if (expandedId === jobId) setExpandedId(null);
  };

  const handleAddRound = async (jobId) => {
    const res = await createRound(newRound, jobId).catch(console.log);
    if (res) {
      setJobs(prev => prev.map(j => j.id === jobId
        ? { ...j, interviewRounds: [...(j.interviewRounds ?? []), res.data] }
        : j
      ));
      setNewRound(EMPTY_ROUND);
      setShowForm(null);
    }
  };

  const handleDeleteRound = async (jobId, roundId) => {
    await deleteRound(roundId).catch(console.log);
    setJobs(prev => prev.map(j => j.id === jobId
      ? { ...j, interviewRounds: j.interviewRounds.filter(r => r.roundId !== roundId) }
      : j
    ));
  };

  return (
    <div className="min-h-screen bg-primary">

      {/* Navbar */}
      <nav className="bg-white border-b border-border px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white text-sm font-bold">J</span>
          <span className="text-lg font-bold text-text">JobTrack <span className="text-accent">Pro</span></span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/dashboard")} className="text-sm text-muted hover:text-text transition-colors">
            ← Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="text-xs px-3 py-1.5 border border-border text-muted rounded-lg hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-colors"
          >
            Log out
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-text">My Applications</h1>
            <p className="text-sm text-muted mt-1">{filtered.length} of {jobs.length} job{jobs.length !== 1 ? "s" : ""} shown</p>
          </div>
          <button onClick={() => navigate("/jobs/create")}
            className="px-5 py-2.5 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accentDark transition-all shadow-md hover:-translate-y-0.5">
            + Add Job
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-sm">🔍</span>
          <input type="text" placeholder="Search by company, role, location or status…" value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-white text-text text-sm placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition" />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-text text-xs">✕ Clear</button>
          )}
        </div>

        {jobs.length === 0 ? (
          <div className="bg-white border border-border rounded-2xl p-16 text-center">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-base font-semibold text-text mb-1">No applications yet</h3>
            <p className="text-sm text-muted mb-6">Start tracking your job hunt by adding your first application.</p>
            <button onClick={() => navigate("/jobs/create")} className="px-6 py-2.5 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accentDark shadow-sm">
              + Add your first job
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white border border-border rounded-2xl p-12 text-center">
            <div className="text-3xl mb-3">🔎</div>
            <p className="text-sm font-semibold text-text mb-1">No results for "{search}"</p>
            <p className="text-xs text-muted">Try searching by company, role, location, or status.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((job) => {
              const isOpen = expandedId === job.id;
              const jobRounds = job.interviewRounds ?? [];
              return (
                <div key={job.id} className="bg-white border border-border rounded-2xl overflow-hidden hover:shadow-sm transition-shadow">
                  <div className="px-6 py-4 flex items-center justify-between cursor-pointer" onClick={() => toggle(job.id)}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary border border-border flex items-center justify-center text-base font-bold text-accent flex-shrink-0">
                        {job.company?.[0]?.toUpperCase() ?? "?"}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-text">{job.role}</p>
                        <p className="text-xs text-muted">{job.company}{job.location ? ` · ${job.location}` : ""}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {job.appliedAt && <span className="text-xs text-muted hidden sm:block">{job.appliedAt}</span>}
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_STYLE[job.status] ?? "bg-gray-100 text-gray-500"}`}>{job.status}</span>
                      <button onClick={(e) => { e.stopPropagation(); navigate(`/jobs/edit/${job.id}`); }}
                        className="text-xs px-3 py-1.5 border border-border text-muted rounded-lg hover:text-text hover:bg-primary transition-colors">Edit</button>
                      <button onClick={(e) => handleDelete(e, job.id)}
                        className="text-xs px-3 py-1.5 border border-red-100 text-red-400 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">Delete</button>
                      <span className={`text-muted text-sm transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>▾</span>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="border-t border-border bg-primary px-6 py-5 space-y-5">
                      <div className="grid sm:grid-cols-3 gap-4">
                        {[
                          { label: "Applied Date", value: job.appliedAt || "—" },
                          { label: "Resume Version", value: job.resumeVersion || "—" },
                          { label: "Location", value: job.location || "—" },
                        ].map(({ label, value }) => (
                          <div key={label}>
                            <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-1">{label}</p>
                            <p className="text-sm text-text">{value}</p>
                          </div>
                        ))}
                        {job.jdLink && (
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-1">JD Link</p>
                            <a href={job.jdLink} target="_blank" rel="noreferrer" className="text-sm text-accent hover:underline">View ↗</a>
                          </div>
                        )}
                        {job.notes && (
                          <div className="sm:col-span-3">
                            <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-1">Notes</p>
                            <p className="text-sm text-text leading-relaxed">{job.notes}</p>
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                            Interview Rounds <span className="text-accent">({jobRounds.length})</span>
                          </p>
                          <button onClick={() => setShowForm(showForm === job.id ? null : job.id)}
                            className="text-xs px-3 py-1.5 bg-accent text-white rounded-lg hover:bg-accentDark transition-colors">
                            {showForm === job.id ? "Cancel" : "+ Add Round"}
                          </button>
                        </div>

                        {showForm === job.id && (
                          <div className="bg-white border border-border rounded-xl p-4 mb-3 grid sm:grid-cols-2 gap-3">
                            <input placeholder="Round title (e.g. Technical)" value={newRound.title}
                              onChange={e => setNewRound({ ...newRound, title: e.target.value })} className={inputCls} />
                            <input type="date" value={newRound.date}
                              onChange={e => setNewRound({ ...newRound, date: e.target.value })} className={inputCls} />
                            <input placeholder="Outcome (e.g. Passed)" value={newRound.outcome}
                              onChange={e => setNewRound({ ...newRound, outcome: e.target.value })} className={inputCls} />
                            <input type="date" placeholder="Follow-up date" value={newRound.followUpDate}
                              onChange={e => setNewRound({ ...newRound, followUpDate: e.target.value })} className={inputCls} />
                            <div className="sm:col-span-2">
                              <button onClick={() => handleAddRound(job.id)}
                                className="w-full py-2 bg-accent text-white text-xs font-semibold rounded-lg hover:bg-accentDark transition-colors">
                                Save Round
                              </button>
                            </div>
                          </div>
                        )}

                        {jobRounds.length === 0 ? (
                          <p className="text-xs text-muted italic">No interview rounds added yet.</p>
                        ) : (
                          <div className="space-y-2">
                            {jobRounds.map((round) => (
                              <div key={round.roundId} className="bg-white border border-border rounded-xl px-4 py-3 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center text-xs">🎯</div>
                                  <div>
                                    <p className="text-xs font-semibold text-text">{round.title}</p>
                                    <p className="text-xs text-muted">{round.date || "—"}{round.followUpDate ? ` · Follow-up: ${round.followUpDate}` : ""}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  {round.outcome && <span className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full">{round.outcome}</span>}
                                  <button onClick={() => handleDeleteRound(job.id, round.roundId)} className="text-xs text-red-300 hover:text-red-500">✕</button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Jobs;