import React from "react";

export interface BranchRecord {
  id: string;
  nameEn: string;
  nameAr: string;
  capacity: number;
  activeCoaches: number;
  status: "active" | "maintenance" | "closed";
}

export const AdminOperationsTable: React.FC<{ branches: BranchRecord[]; onConfigure?: (branch: BranchRecord) => void }> = ({
  branches,
  onConfigure
}) => {
  return (
    <div className="w-full overflow-hidden rounded-[var(--radius-md)] border border-[var(--glass-l2-border)] bg-[var(--glass-l2-bg)] backdrop-blur-[12px]">
      <div className="overflow-x-auto">
        <table className="w-full text-left rtl:text-right text-xs">
          <thead className="bg-[var(--color-obsidian-950)]/80 text-[var(--color-gold-400)] uppercase font-semibold border-b border-[var(--glass-l1-border)]">
            <tr>
              <th className="p-4">Facility / Branch</th>
              <th className="p-4">العنوان بالعربية</th>
              <th className="p-4">Athlete Capacity</th>
              <th className="p-4">Coaches</th>
              <th className="p-4">Operational Status</th>
              <th className="p-4 text-right rtl:text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--glass-l1-border)] text-[var(--color-text-primary)]">
            {branches.map((b) => (
              <tr key={b.id} className="hover:bg-[var(--glass-l1-bg)] transition-colors">
                <td className="p-4 font-bold">{b.nameEn}</td>
                <td className="p-4 font-arabic text-[var(--color-text-secondary)]">{b.nameAr}</td>
                <td className="p-4 font-mono">{b.capacity}</td>
                <td className="p-4 font-mono">{b.activeCoaches}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    b.status === "active" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"
                  }`}>
                    {b.status}
                  </span>
                </td>
                <td className="p-4 text-right rtl:text-left">
                  <button
                    type="button"
                    onClick={() => onConfigure?.(b)}
                    className="px-3 py-1 rounded bg-[var(--glass-l1-bg)] border border-[var(--glass-l1-border)] text-[var(--color-gold-400)] hover:border-[var(--color-gold-500)] transition-all cursor-pointer"
                  >
                    Configure
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
