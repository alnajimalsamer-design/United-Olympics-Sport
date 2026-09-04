import React from "react";

export interface PlayerCardProps {
  memberName: string;
  memberNameAr: string;
  memberId: string;
  sportProgram: string;
  validUntil: string;
  photoUrl?: string;
}

export const PlayerMembershipCard: React.FC<PlayerCardProps> = ({
  memberName,
  memberNameAr,
  memberId,
  sportProgram,
  validUntil,
  photoUrl
}) => {
  return (
    <div className="relative w-full max-w-md h-56 rounded-[var(--radius-lg)] p-6 overflow-hidden border border-[var(--glass-l3-border)] bg-[var(--glass-l3-bg)] backdrop-blur-[16px] shadow-[var(--glass-l3-shadow)] flex flex-col justify-between">
      {/* Background Metallic Light Effect */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--color-gold-500)]/15 rounded-full blur-2xl pointer-events-none" />

      {/* Header Area */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <img
            src="/brand/united-olympics-sports-logo.png"
            alt="UOS"
            className="h-8 w-auto"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/public/brand/united-olympics-sports-logo.png';
            }}
          />
          <span className="text-xs font-bold text-[var(--color-pure-white)] tracking-wider">
            UNITED OLYMPICS SPORTS
          </span>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--color-gold-500)]/20 text-[var(--color-gold-400)] border border-[var(--color-gold-500)]/30">
          OFFICIAL ATHLETE
        </span>
      </div>

      {/* Body Area */}
      <div className="flex items-center gap-4 relative z-10 my-auto">
        <div className="w-16 h-16 rounded-full border-2 border-[var(--color-gold-500)] overflow-hidden bg-[var(--color-midnight-800)] flex-shrink-0">
          {photoUrl ? (
            <img src={photoUrl} alt={memberName} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xl font-bold text-[var(--color-gold-400)]">
              {memberName.charAt(0)}
            </div>
          )}
        </div>
        <div className="overflow-hidden">
          <h3 className="text-base font-bold text-[var(--color-pure-white)] truncate">{memberName}</h3>
          <p className="text-sm font-arabic text-[var(--color-gold-400)] dir-rtl truncate">{memberNameAr}</p>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{sportProgram}</p>
        </div>
      </div>

      {/* Footer Meta Details */}
      <div className="flex items-center justify-between pt-3 border-t border-[var(--glass-l1-border)] text-[11px] relative z-10">
        <div>
          <span className="text-[var(--color-text-tertiary)] block text-[9px] uppercase">Member ID</span>
          <span className="font-mono text-[var(--color-text-primary)]">{memberId}</span>
        </div>
        <div className="text-right">
          <span className="text-[var(--color-text-tertiary)] block text-[9px] uppercase">Valid Through</span>
          <span className="font-mono text-[var(--color-gold-400)]">{validUntil}</span>
        </div>
      </div>
    </div>
  );
};
