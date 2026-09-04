import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export type AuthRole = "player" | "parent" | "coach" | "admin";

export interface AuthRoleConfig {
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
}

export const ROLE_CONFIGS: Record<AuthRole, AuthRoleConfig> = {
  player: {
    titleEn: "Athlete Portal Access",
    titleAr: "بوابة الأبطال والرياضيين",
    subtitleEn: "Track sessions, performance, and training goals.",
    subtitleAr: "تابع تدريباتك، أدائك، وأهدافك الرياضية."
  },
  parent: {
    titleEn: "Parent Control Hub",
    titleAr: "مركز متابعة أولياء الأمور",
    subtitleEn: "Monitor child schedules, attendance, and progress.",
    subtitleAr: "متابعة جداول الأبناء، الحضور، والتطور الرياضي."
  },
  coach: {
    titleEn: "Coach Operations Desk",
    titleAr: "منصة الكادر التدريبي",
    subtitleEn: "Manage group rosters, daily drills, and evaluations.",
    subtitleAr: "إدارة الفرق، الحضور والغياب، والتقييم الفني."
  },
  admin: {
    titleEn: "Sports Command Center",
    titleAr: "مركز التحكم والإدارة العليا",
    subtitleEn: "Institutional operations and scope management.",
    subtitleAr: "إدارة الفروع، العمليات المالية، والرقابة التنظيمية."
  }
};

export const AuthenticationShell: React.FC<{ initialRole?: AuthRole; onSuccess?: (role: AuthRole) => void }> = ({
  initialRole = "player",
  onSuccess
}) => {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState<AuthRole>(initialRole);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (onSuccess) {
        onSuccess(activeRole);
      } else {
        // Navigate to the target portal environment
        if (activeRole === "player") navigate("/player");
        else if (activeRole === "parent") navigate("/parent");
        else if (activeRole === "coach") navigate("/coach");
        else if (activeRole === "admin") navigate("/admin");
      }
    }, 900);
  };

  const currentRole = ROLE_CONFIGS[activeRole];

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[var(--color-obsidian-950)] overflow-hidden font-sans p-4 sm:p-6">
      {/* Visual Identity Atmosphere Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[rgba(212,175,55,0.08)] via-[rgba(10,15,29,0.95)] to-[var(--color-obsidian-950)] pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[var(--color-gold-500)]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Glass Layout Box */}
      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 rounded-[var(--radius-lg)] border border-[var(--glass-l2-border)] bg-[var(--glass-l2-bg)] backdrop-blur-[16px] shadow-[var(--glass-l4-shadow)] overflow-hidden">
        
        {/* Left Side: Brand Experience Surface */}
        <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[var(--glass-l1-border)] bg-gradient-to-b from-transparent to-[var(--color-midnight-900)]/60">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <img
                src="/brand/united-olympics-sports-logo.png"
                alt="United Olympics Sports"
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/public/brand/united-olympics-sports-logo.png';
                }}
              />
              <div>
                <h1 className="text-base font-bold text-[var(--color-pure-white)] leading-tight">
                  UNITED OLYMPICS SPORTS
                </h1>
                <p className="text-xs text-[var(--color-gold-500)] font-arabic dir-rtl">
                  يونايتد أوليمبيكس سبورت
                </p>
              </div>
            </div>

            <div className="space-y-2 mt-12">
              <span className="text-xs font-semibold tracking-wider text-[var(--color-gold-400)] uppercase">
                {activeRole} Environment
              </span>
              <h2 className="text-2xl font-bold text-[var(--color-pure-white)]">
                {currentRole.titleEn}
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {currentRole.subtitleEn}
              </p>
              <p className="text-sm text-[var(--color-text-tertiary)] font-arabic dir-rtl mt-1">
                {currentRole.subtitleAr}
              </p>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-[var(--glass-l1-border)]">
            <p className="text-xs text-[var(--color-text-tertiary)]">
              Institutional Grade Platform • Encrypted Portal Access
            </p>
          </div>
        </div>

        {/* Right Side: Interactive Form Container */}
        <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-center">
          {/* Role Switching Tabs */}
          <div className="grid grid-cols-4 gap-1 p-1 bg-[var(--color-obsidian-950)]/60 rounded-[var(--radius-md)] border border-[var(--glass-l1-border)] mb-8">
            {(["player", "parent", "coach", "admin"] as AuthRole[]).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setActiveRole(role)}
                className={`py-2 text-xs font-semibold capitalize rounded-[var(--radius-sm)] transition-all duration-[var(--transition-fast)] cursor-pointer ${
                  activeRole === role
                    ? "bg-[var(--color-gold-500)] text-[var(--color-obsidian-950)] shadow-md font-bold"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-pure-white)]"
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          {/* Authentication Input Form */}
          <form onSubmit={handleAuthSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-[var(--color-text-secondary)] mb-1">
                Email / ID
              </label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@unitedolympics.com"
                className="w-full h-[50px] px-4 rounded-[var(--radius-md)] bg-[var(--glass-l1-bg)] border border-[var(--glass-l1-border)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-gold-500)] focus:ring-1 focus:ring-[var(--color-gold-500)]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--color-text-secondary)] mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-[50px] px-4 rounded-[var(--radius-md)] bg-[var(--glass-l1-bg)] border border-[var(--glass-l1-border)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-gold-500)] focus:ring-1 focus:ring-[var(--color-gold-500)]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-[52px] mt-2 rounded-[var(--radius-md)] bg-gradient-to-r from-[var(--color-gold-500)] to-[var(--color-gold-400)] text-[var(--color-obsidian-950)] font-bold text-sm tracking-wide shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:brightness-110 active:scale-[0.99] transition-all duration-[var(--transition-fast)] flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-[var(--color-obsidian-950)] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Account</span>
                  <span className="font-arabic dir-rtl text-xs font-normal">| تسجيل الدخول</span>
                </>
              )}
            </button>
          </form>

          {/* OAuth Provider Section */}
          <div className="mt-8 pt-6 border-t border-[var(--glass-l1-border)]">
            <p className="text-center text-xs text-[var(--color-text-tertiary)] mb-4">
              Or authorize via organizational SSO
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                aria-label="Sign in with Apple"
                onClick={() => {
                  setEmail("athlete@apple.uos");
                  setPassword("demo-secure-pass");
                }}
                className="flex items-center justify-center w-12 h-12 rounded-[var(--radius-md)] bg-[var(--glass-l1-bg)] border border-[var(--glass-l1-border)] hover:border-[var(--color-gold-500)]/40 hover:bg-[var(--glass-l2-bg)] transition-all cursor-pointer"
              >
                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.62-.77 1.05-1.83.93-2.85-.92.04-2.06.62-2.7 1.38-.58.67-1.09 1.76-.95 2.8 1.03.08 2.1-.56 2.72-1.33" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Sign in with Google"
                onClick={() => {
                  setEmail("athlete@google.uos");
                  setPassword("demo-secure-pass");
                }}
                className="flex items-center justify-center w-12 h-12 rounded-[var(--radius-md)] bg-[var(--glass-l1-bg)] border border-[var(--glass-l1-border)] hover:border-[var(--color-gold-500)]/40 hover:bg-[var(--glass-l2-bg)] transition-all cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z" />
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                  <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-2.9z" />
                  <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
