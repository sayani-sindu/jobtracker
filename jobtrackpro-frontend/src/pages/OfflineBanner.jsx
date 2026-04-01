import { useEffect, useState } from "react";

// ✅ Shows a banner when the backend is unreachable
// Polls every 10s to auto-recover when server comes back
function OfflineBanner() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const check = async () => {
      try {
        await fetch("http://localhost:8080/actuator/health", { method: "GET", signal: AbortSignal.timeout(3000) });
        setOffline(false);
      } catch {
        setOffline(true);
      }
    };

    check();
    const interval = setInterval(check, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!offline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-red-500 text-white text-xs text-center py-2 px-4 flex items-center justify-center gap-2">
      <span>⚠️</span>
      <span>Server is unreachable. Some features may not work. Retrying automatically…</span>
    </div>
  );
}

export default OfflineBanner;