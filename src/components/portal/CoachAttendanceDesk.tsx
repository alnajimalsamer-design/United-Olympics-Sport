import React, { useState } from "react";

export interface AthleteRosterItem {
  id: string;
  name: string;
  status: "present" | "absent" | "excused" | "unmarked";
}

export const CoachAttendanceDesk: React.FC<{ roster: AthleteRosterItem[] }> = ({ roster: initialRoster }) => {
  const [roster, setRoster] = useState(initialRoster);

  const updateStatus = (id: string, status: AthleteRosterItem["status"]) => {
    setRoster(prev => prev.map(item => item.id === id ? { ...item, status } : item));
  };

  return (
    <div className="w-full rounded-[var(--radius-md)] border border-[var(--glass-l2-border)] bg-[var(--glass-l2-bg)] p-4 backdrop-blur-[12px]">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--glass-l1-border)]">
        <div>
          <h3 className="text-sm font-bold text-[var(--color-pure-white)]">Session Roster Attendance</h3>
          <p className="text-xs text-[var(--color-text-secondary)]">U16 Elite Football • Court A</p>
        </div>
        <span className="text-xs font-mono text-[var(--color-gold-400)]">Total: {roster.length}</span>
      </div>

      <div className="space-y-2">
        {roster.map((player) => (
          <div
            key={player.id}
            className="flex items-center justify-between p-3 rounded-[var(--radius-sm)] bg-[var(--glass-l1-bg)] border border-[var(--glass-l1-border)]"
          >
            <span className="text-sm font-semibold text-[var(--color-text-primary)]">{player.name}</span>
            <div className="flex items-center gap-1.5">
              {(["present", "absent", "excused"] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => updateStatus(player.id, st)}
                  className={`px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-bold capitalize transition-all cursor-pointer ${
                    player.status === st
                      ? st === "present"
                        ? "bg-emerald-500 text-white"
                        : st === "absent"
                        ? "bg-red-500 text-white"
                        : "bg-amber-500 text-white"
                      : "bg-[var(--color-midnight-800)] text-[var(--color-text-tertiary)] hover:text-white"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
