import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobs, updateJob } from "../services/jobService";

const inputCls = "w-full px-4 py-2.5 rounded-xl border border-border bg-primary text-text text-sm placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition";

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold uppercase tracking-wide text-text">{label}</label>
    {children}
  </div>
);

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("user"))?.id;
  const [job, setJob] = useState({ role: "", company: "", location: "", status: "Applied", appliedAt: "", jdLink: "", notes: "", resumeVersion: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  getJobs()
    .then(res => {
      const found = res.data.find(j => j.id === Number(id));
      if (found) {
        setJob({
          ...found,
          appliedAt: found.appliedAt
            ? (Array.isArray(found.appliedAt)
                ? `${found.appliedAt[0]}-${String(found.appliedAt[1]).padStart(2,'0')}-${String(found.appliedAt[2]).padStart(2,'0')}`
                : String(found.appliedAt).split("T")[0])
            : "",
        });
      }
    })
    .catch(console.log);
}, []);

  const handleChange = (e) => setJob({ ...job, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const cleanedJob = {
        ...job,
        appliedAt: job.appliedAt || null,
        jdLink: job.jdLink || null,
        notes: job.notes || null,
        resumeVersion: job.resumeVersion || null,
      };
      await updateJob(id, cleanedJob);
      navigate("/jobs", { state: { refresh: true } });
    } catch (err) {
      console.log("Error updating job", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary">

      {/* Navbar */}
      <nav className="bg-white border-b border-border px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white text-sm font-bold">J</span>
          <span className="text-lg font-bold text-text">JobTrack <span className="text-accent">Pro</span></span>
        </div>
        <button onClick={() => navigate("/jobs")} className="text-sm text-muted hover:text-text transition-colors">
          ← Back to Jobs
        </button>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-text">Edit Application</h1>
          <p className="text-sm text-muted mt-1">Update the details for this job application.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-border rounded-2xl p-8 space-y-5 shadow-sm">

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Company">
              <input name="company" value={job.company} placeholder="e.g. Google" onChange={handleChange} className={inputCls} />
            </Field>
            <Field label="Role">
              <input name="role" value={job.role} placeholder="e.g. Frontend Engineer" onChange={handleChange} className={inputCls} />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Location">
              <input name="location" value={job.location} placeholder="e.g. Bengaluru, Remote" onChange={handleChange} className={inputCls} />
            </Field>
            <Field label="Status">
              <select name="status" value={job.status} onChange={handleChange} className={inputCls}>
                {["Applied", "Interview", "Offer", "Rejected"].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Applied Date">
              <input name="appliedAt" type="date" value={job.appliedAt || ""} onChange={handleChange} className={inputCls} />
            </Field>
            <Field label="Resume Version">
              <input name="resumeVersion" value={job.resumeVersion || ""} placeholder="e.g. v3-backend" onChange={handleChange} className={inputCls} />
            </Field>
          </div>

          <Field label="Job Description Link">
            <input name="jdLink" value={job.jdLink || ""} placeholder="https://..." onChange={handleChange} className={inputCls} />
          </Field>

          <Field label="Notes">
            <textarea name="notes" value={job.notes || ""} placeholder="Any notes about this role..." onChange={handleChange} rows={3} className={`${inputCls} resize-none`} />
          </Field>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={loading}
              className="flex-1 py-3 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accentDark transition-all shadow-md hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? "Saving…" : "Update Application →"}
            </button>
            <button type="button" onClick={() => navigate("/jobs")}
              className="px-6 py-3 border border-border text-text text-sm font-medium rounded-xl hover:bg-primary transition-colors">
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default EditJob;