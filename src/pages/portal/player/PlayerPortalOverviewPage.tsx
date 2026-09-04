import {
  Activity,
  Award,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  Clock,
  Dumbbell,
  FileText,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Trophy,
  User,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { BmBadge, BmGlass, BmPageHeader } from '../../../components/benchmark/BenchmarkComponents';
import { BilingualText, bi } from '../../../components/bilingual/BilingualText';
import { PlayerMembershipCard } from '../../../components/portal/PlayerMembershipCard';
import { demoPlayers } from '../../../data/demo/players';
import { getGroup, getSport } from '../../../data/demo/selectors';
import { demoSessions } from '../../../data/demo/sessions';

export function PlayerPortalOverviewPage() {
  const player = demoPlayers[0];
  const sport = getSport(player.sportId);
  const group = getGroup(player.groupId);
  const attendance = player.attendanceSummary;
  const attendancePct =
    attendance && attendance.scheduled > 0
      ? Math.round((attendance.attended / attendance.scheduled) * 100)
      : 0;

  // Find next session for this group
  const nextSession = demoSessions.find((s) => s.groupId === player.groupId) ?? demoSessions[0];

  const playerScore =
    player.performanceHistory.length > 0
      ? Math.round(
          player.performanceHistory.reduce((acc, p) => acc + p.value, 0) /
            player.performanceHistory.length
        )
      : 84;

  return (
    <div
      className="admin-page"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24
      }}
    >
      {/* 1. Athlete Hero Banner — Player Black Gold Architectural Centerpiece */}
      <div
        className="bm-glass-3"
        style={{
          padding: '32px',
          background:
            'radial-gradient(ellipse at 80% 20%, rgba(216, 179, 90, 0.16) 0%, transparent 60%), linear-gradient(135deg, rgba(20, 24, 32, 0.95), rgba(10, 12, 16, 0.98))',
          borderColor: 'rgba(216, 179, 90, 0.32)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          color: '#fdfbf7'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            flexWrap: 'wrap'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {/* Athlete Avatar with Gold Metallic Ring */}
            <div
              style={{
                width: 76,
                height: 76,
                borderRadius: '50%',
                border: '2px solid rgba(216, 179, 90, 0.65)',
                background: 'linear-gradient(135deg, rgba(216, 179, 90, 0.25), rgba(0, 0, 0, 0.6))',
                display: 'grid',
                placeItems: 'center',
                boxShadow: '0 0 24px rgba(216, 179, 90, 0.25)',
                flexShrink: 0
              }}
            >
              <User style={{ width: 36, height: 36, color: '#f3c969' }} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#d8b35a'
                  }}
                >
                  <BilingualText value={bi('Verified Athlete Hub', 'مركز اللاعب المعتمد')} />
                </span>
                <span
                  style={{
                    padding: '3px 8px',
                    borderRadius: 999,
                    fontSize: 11,
                    fontWeight: 600,
                    background: 'rgba(216, 179, 90, 0.18)',
                    color: '#f4d27b',
                    border: '1px solid rgba(216, 179, 90, 0.35)'
                  }}
                >
                  <code>{player.id}</code>
                </span>
              </div>

              <h1
                style={{
                  margin: '6px 0 4px',
                  fontSize: 'clamp(24px, 3.8vw, 32px)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: '#ffffff'
                }}
              >
                {player.nameEn}
                <span
                  lang="ar"
                  dir="rtl"
                  style={{
                    fontSize: '0.85em',
                    fontWeight: 600,
                    color: '#d8b35a',
                    marginRight: 10,
                    marginLeft: 10,
                    fontFamily: 'Cairo, sans-serif'
                  }}
                >
                  · {player.nameAr}
                </span>
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 12,
                    color: '#d4d0ca'
                  }}
                >
                  <Trophy style={{ width: 14, height: 14, color: '#d8b35a' }} />
                  {sport ? <BilingualText value={sport.name} /> : player.sportId}
                </span>
                <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>•</span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 12,
                    color: '#d4d0ca'
                  }}
                >
                  <Dumbbell style={{ width: 14, height: 14, color: '#d8b35a' }} />
                  {group ? <BilingualText value={group.name} /> : 'Primary Squad'}
                </span>
                <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>•</span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 12,
                    color: '#5ec39b'
                  }}
                >
                  <CheckCircle2 style={{ width: 14, height: 14 }} />
                  <BilingualText value={bi('Active Roster', 'قائمة نشطة')} />
                </span>
              </div>
            </div>
          </div>

          {/* Quick Athlete Badge Lockup */}
          <div
            style={{
              padding: '16px 20px',
              borderRadius: 16,
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(216, 179, 90, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: 16
            }}
          >
            <img
              src="/brand/united-olympics-sports-logo.png"
              alt="United Olympics Sports"
              style={{ width: 44, height: 44, objectFit: 'contain' }}
            />
            <div>
              <div style={{ fontSize: 11, color: '#a5a29c', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                United Olympics Sports
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#f4d27b' }}>
                {player.level ? <BilingualText value={player.level} /> : 'Elite Track'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Official Digital Membership Card Row */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <PlayerMembershipCard
          memberName={player.nameEn}
          memberNameAr={player.nameAr}
          memberId={player.id}
          sportProgram={sport ? sport.name.en : 'Athletic Program'}
          validUntil="2026-12-31"
        />
      </div>

      {/* 2. Vital Performance & Training Metrics */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 18
        }}
      >
        {/* Attendance KPI Card */}
        <BmGlass level={2} style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--uos-text-muted)' }}>
              <BilingualText value={bi('Attendance Rate', 'نسبة الحضور')} />
            </span>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: 'color-mix(in srgb, var(--uos-brand) 15%, transparent)',
                display: 'grid',
                placeItems: 'center',
                color: 'var(--uos-brand)'
              }}
            >
              <CheckCircle2 style={{ width: 18, height: 18 }} />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 32, fontWeight: 800, color: 'var(--uos-text-primary)' }}>
                {attendancePct}%
              </span>
              <span style={{ fontSize: 13, color: 'var(--uos-text-muted)' }}>
                {attendance ? `${attendance.attended} of ${attendance.scheduled} sessions` : '0/0'}
              </span>
            </div>
            {/* Progress Pill */}
            <div
              style={{
                height: 6,
                borderRadius: 99,
                background: 'color-mix(in srgb, var(--uos-border) 50%, transparent)',
                marginTop: 10,
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${attendancePct}%`,
                  background: 'linear-gradient(90deg, var(--uos-brand), var(--uos-brand-strong))',
                  borderRadius: 99
                }}
              />
            </div>
          </div>
          <span style={{ fontSize: 11, color: 'var(--uos-text-muted)' }}>
            <BilingualText value={bi('Full session compliance', 'التزام كامل بالحضور')} />
          </span>
        </BmGlass>

        {/* Performance Score KPI Card */}
        <BmGlass level={2} style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--uos-text-muted)' }}>
              <BilingualText value={bi('Performance Index', 'مؤشر الأداء')} />
            </span>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: 'color-mix(in srgb, var(--uos-brand) 15%, transparent)',
                display: 'grid',
                placeItems: 'center',
                color: 'var(--uos-brand)'
              }}
            >
              <Activity style={{ width: 18, height: 18 }} />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 32, fontWeight: 800, color: 'var(--uos-brand-strong)' }}>
                {playerScore}
              </span>
              <span style={{ fontSize: 14, color: 'var(--uos-text-muted)', fontWeight: 600 }}>/ 100</span>
            </div>
            <div
              style={{
                height: 6,
                borderRadius: 99,
                background: 'color-mix(in srgb, var(--uos-border) 50%, transparent)',
                marginTop: 10,
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${playerScore}%`,
                  background: 'linear-gradient(90deg, #5ec39b, var(--uos-brand-strong))',
                  borderRadius: 99
                }}
              />
            </div>
          </div>
          <span style={{ fontSize: 11, color: 'var(--uos-text-muted)' }}>
            <BilingualText value={bi('Verified coach evaluation', 'تقييم فني معتمد من المدرب')} />
          </span>
        </BmGlass>

        {/* Next Scheduled Session */}
        <BmGlass level={2} style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--uos-text-muted)' }}>
              <BilingualText value={bi('Upcoming Training', 'التدريب القادم')} />
            </span>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: 'color-mix(in srgb, var(--uos-brand) 15%, transparent)',
                display: 'grid',
                placeItems: 'center',
                color: 'var(--uos-brand)'
              }}
            >
              <CalendarClock style={{ width: 18, height: 18 }} />
            </div>
          </div>

          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--uos-text-primary)' }}>
              {group ? (
                <BilingualText value={group.name} />
              ) : (
                <BilingualText value={bi('Weekly Squad Drill', 'تمرين الفريق الأسبوعي')} />
              )}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginTop: 6,
                fontSize: 12,
                color: 'var(--uos-brand-strong)',
                fontWeight: 600
              }}
            >
              <Clock style={{ width: 14, height: 14 }} />
              {nextSession ? nextSession.startsAt : '16:30 – 18:00'}
            </div>
          </div>

          <span style={{ fontSize: 11, color: 'var(--uos-text-muted)' }}>
            <BilingualText value={bi('Main Olympic Training Field', 'الملعب الأولمبي الرئيسي')} />
          </span>
        </BmGlass>
      </div>

      {/* 3. Fast Operations Action Grid */}
      <BmGlass level={2} style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--uos-text-primary)' }}>
              <BilingualText value={bi('Athlete Workspaces & Actions', 'أقسام ومساحات عمل اللاعب')} />
            </h3>
            <span style={{ fontSize: 12, color: 'var(--uos-text-muted)' }}>
              <BilingualText value={bi('Instant access to training data and documents', 'الوصول الفوري للبيانات والمستندات')} />
            </span>
          </div>
          <Sparkles style={{ width: 18, height: 18, color: 'var(--uos-brand)' }} />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 14
          }}
        >
          {[
            {
              to: '/player/schedule',
              Icon: CalendarDays,
              title: bi('Training Schedule', 'جدول التدريب'),
              desc: bi('Timetables and fixture dates', 'المواعيد وتواريخ الحصص')
            },
            {
              to: '/player/performance',
              Icon: Activity,
              title: bi('Sport Performance', 'الأداء الرياضي'),
              desc: bi('Skills, drills and metrics', 'المهارات والتمارين والمؤشرات')
            },
            {
              to: '/player/feedback',
              Icon: MessageSquare,
              title: bi('Coach Feedback', 'ملاحظات المدرب'),
              desc: bi('Technical guidance notes', 'الإرشادات الفنية والتوجيهات')
            },
            {
              to: '/player/achievements',
              Icon: Award,
              title: bi('Achievements', 'الإنجازات والبطولات'),
              desc: bi('Verified badges and medals', 'الأوسمة والشهادات المعتمدة')
            },
            {
              to: '/player/attendance',
              Icon: CheckCircle2,
              title: bi('Attendance Log', 'سجل الحضور'),
              desc: bi('Check-in track history', 'سجل تسجيل الدخول للحصص')
            },
            {
              to: '/player/documents',
              Icon: FileText,
              title: bi('Documents & Waivers', 'المستندات والتصاريح'),
              desc: bi('Official verified clearances', 'التراخيص والاعتمادات الرسمية')
            }
          ].map(({ to, Icon, title, desc }) => (
            <Link
              key={to}
              to={to}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                padding: '18px 16px',
                borderRadius: 'var(--uos-radius-sm)',
                background: 'color-mix(in srgb, var(--uos-surface-1) 85%, transparent)',
                border: '1px solid var(--uos-border)',
                textDecoration: 'none',
                color: 'var(--uos-text-primary)',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className="bm-hover-lift"
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 8,
                  background: 'color-mix(in srgb, var(--uos-brand) 14%, transparent)',
                  border: '1px solid color-mix(in srgb, var(--uos-brand) 25%, transparent)',
                  display: 'grid',
                  placeItems: 'center',
                  color: 'var(--uos-brand)'
                }}
              >
                <Icon style={{ width: 18, height: 18 }} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>
                  <BilingualText value={title} />
                </h4>
                <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--uos-text-muted)', lineHeight: 1.4 }}>
                  <BilingualText value={desc} />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </BmGlass>
    </div>
  );
}
