import React, { useState, useEffect } from "react";

export interface VersionInfo {
  currentVersion: string;
  latestVersion: string;
  releaseNotesEn: string;
  releaseNotesAr: string;
}

export const ApplicationUpdateNotifier: React.FC = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    // Runtime version check logic simulation
    const timer = setTimeout(() => setUpdateAvailable(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!updateAvailable) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-lg p-4 rounded-[var(--radius-md)] bg-[var(--glass-l4-bg)] border border-[var(--color-gold-500)]/40 backdrop-blur-[20px] shadow-[var(--glass-l4-shadow)] flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top duration-300">
      <div className="flex items-center gap-3">
        <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-gold-500)] animate-ping" />
        <div>
          <h4 className="text-xs font-bold text-[var(--color-pure-white)]">
            ✦ New System Update Available | تحديث جديد
          </h4>
          <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">
            Optimizations ready for United Olympics Sports Portal.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="px-3 py-1.5 rounded-[var(--radius-sm)] bg-[var(--color-gold-500)] text-[var(--color-obsidian-950)] text-xs font-bold hover:brightness-110 cursor-pointer"
        >
          Update
        </button>
        <button
          type="button"
          onClick={() => setUpdateAvailable(false)}
          className="px-2 py-1.5 text-xs text-[var(--color-text-tertiary)] hover:text-white cursor-pointer"
        >
          Later
        </button>
      </div>
    </div>
  );
};
