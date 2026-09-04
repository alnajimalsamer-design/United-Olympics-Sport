import React from "react";

export interface ChildProfile {
  id: string;
  name: string;
  sport: string;
  nextSession: string;
}

export const ParentChildSwitcherCard: React.FC<{
  childrenList: ChildProfile[];
  activeChildId: string;
  onSelect: (id: string) => void;
}> = ({ childrenList, activeChildId, onSelect }) => {
  return (
    <div className="w-full p-4 rounded-[var(--radius-md)] bg-[var(--glass-l1-bg)] border border-[var(--glass-l1-border)] backdrop-blur-[8px]">
      <span className="text-xs font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider block mb-3">
        Select Child Profile | اختر الحساب
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {childrenList.map((child) => {
          const isActive = child.id === activeChildId;
          return (
            <button
              key={child.id}
              onClick={() => onSelect(child.id)}
              className={`p-3 rounded-[var(--radius-sm)] border text-left transition-all duration-[var(--transition-smooth)] flex items-center gap-3 cursor-pointer ${
                isActive
                  ? "bg-[var(--glass-l3-bg)] border-[var(--color-gold-500)] text-[var(--color-pure-white)] shadow-md"
                  : "bg-[var(--glass-l1-bg)] border-[var(--glass-l1-border)] text-[var(--color-text-secondary)] hover:border-[var(--glass-l2-border)]"
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                isActive ? "bg-[var(--color-gold-500)] text-[var(--color-obsidian-950)]" : "bg-[var(--color-midnight-700)] text-[var(--color-text-primary)]"
              }`}>
                {child.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <div className="text-sm font-bold truncate">{child.name}</div>
                <div className="text-xs text-[var(--color-gold-400)]">{child.sport}</div>
                <div className="text-[10px] text-[var(--color-text-tertiary)] truncate mt-0.5">Next: {child.nextSession}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
