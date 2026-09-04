import {
  Activity,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Dumbbell,
  FileCheck2,
  MapPin,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Trophy,
  User,
  UsersRound,
  Zap
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BmAthleteCell,
  BmBadge,
  BmGlass,
  BmKpiCard,
  BmPageHeader
} from '../../../components/benchmark/BenchmarkComponents';
import { BilingualText, bi } from '../../../components/bilingual/BilingualText';
import { CoachAttendanceDesk } from '../../../components/portal/CoachAttendanceDesk';
import { demoPlayers } from '../../../data/demo/players';
import { getPlayer, getSport } from '../../../data/demo/selectors';
import { demoSessions } from '../../../data/demo/sessions';
import { demoTrainingGroups } from '../../../data/demo/trainingGroups';

export function CoachPortalOverviewPage() {
  const group = demoTrainingGroups[0];
  const sport = getSport(group.sportId);
  const sessions = demoSessions.filter((s) => s.groupId === group.id);
  const roster = group.playerIds.map(getPlayer).filter(Boolean);

  // Active session
  const activeSession = sessions[0] ?? demoSessions[0];

  return (
    <div className="admin-page" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* 1. Coach Operational Session Desk — Tablet-Optimized Command Hero */}
      <BmGlass
        level={3}
        style={{
          padding: '28px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: 'var(--uos-radius-sm)',
              background: 'linear-gradient(135deg, rgba(216, 179, 90, 0.22), transparent)',
              border: '2px solid var(--uos-brand)',
              display: 'grid',
              placeItems: 'center',
              color: 'var(--uos-brand-strong)',
              boxShadow: '0 0 20px rgba(216, 179, 90, 0.25)',
              flexShrink: 0
            }}
          >
            <ClipboardCheck style={{ width: 30, height: 30 }} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--uos-brand)'
                }}
              >
                <BilingualText value={bi('Operational Session Desk', 'مكتب إدارة الحصص التدريبية')} />
              </span>
              <BmBadge variant="gold">
                <BilingualText value={bi('Head Coach Staff', 'كادر التدريب المعتمد')} />
              </BmBadge>
            </div>

            <h1
              style={{
                margin: '4px 0 2px',
                fontSize: 'clamp(22px, 3.5vw, 30px)',
                fontWeight: 800,
                color: 'var(--uos-text-primary)'
              }}
            >
              <BilingualText value={group.name} />
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginTop: 6 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--uos-text-secondary)' }}>
                <Trophy style={{ width: 14, height: 14, color: 'var(--uos-brand)' }} />
                {sport ? <BilingualText value={sport.name} /> : group.sportId}
              </span>
              <span style={{ color: 'var(--uos-text-muted)' }}>•</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--uos-text-secondary)' }}>
                <UsersRound style={{ width: 14, height: 14, color: 'var(--uos-brand)' }} />
                <BilingualText value={bi(`${roster.length} Registered Athletes`, `${roster.length} لاعبين مسجلين`)} />
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link to="/coach/attendance" className="bm-btn-primary" style={{ minHeight: 46 }}>
            <CheckCircle2 style={{ width: 16, height: 16 }} />
            <BilingualText value={bi('Open Attendance Sheet', 'كشف تسجيل الحضور')} />
          </Link>
          <Link to="/coach/evaluations" className="bm-btn-secondary" style={{ minHeight: 46 }}>
            <Activity style={{ width: 16, height: 16 }} />
            <BilingualText value={bi('Player Evaluation', 'تقييم اللاعبين')} />
          </Link>
        </div>
      </BmGlass>

      {/* 2. Operational KPIs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 18
        }}
      >
        <BmKpiCard
          icon={UsersRound}
          label={bi('Assigned Roster', 'القائمة المكلفة')}
          value={roster.length}
          trend="neutral"
          trendDelta="0"
          note={bi('Complete squad roster', 'اكتمال قيد الفريق')}
        />
        <BmKpiCard
          icon={CalendarDays}
          label={bi('Sessions This Week', 'حصص هذا الأسبوع')}
          value={sessions.length || 3}
          trend="up"
          trendDelta="+1"
          note={bi('On field and tactical drills', 'تدريبات ميدانية وتكتيكية')}
        />
        <BmKpiCard
          icon={ClipboardCheck}
          label={bi('Attendance Verification', 'توثيق الحضور')}
          value="94%"
          trend="up"
          trendDelta="+2%"
          note={bi('Average squad compliance', 'متوسط التزام الفريق')}
        />
        <BmKpiCard
          icon={Activity}
          label={bi('Evaluations Completed', 'التقييمات المنجزة')}
          value={`${roster.length}/${roster.length}`}
          trend="up"
          trendDelta="100%"
          note={bi('All technical rubrics submitted', 'تم رفع كافة معايير الأداء')}
        />
      </div>

      {/* 3. Today's Field Session Spotlight */}
      <BmGlass level={2} style={{ padding: 26, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--uos-brand)', letterSpacing: '0.1em' }}>
              <BilingualText value={bi('Live Field Session Focus', 'جلسة التدريب الميدانية الحالية')} />
            </span>
            <h3 style={{ margin: '4px 0 0', fontSize: 18, fontWeight: 800, color: 'var(--uos-text-primary)' }}>
              <BilingualText value={group.name} />
            </h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 12px',
                borderRadius: 999,
                background: 'color-mix(in srgb, var(--uos-brand) 15%, transparent)',
                color: 'var(--uos-brand-strong)',
                fontSize: 13,
                fontWeight: 700
              }}
            >
              <Clock style={{ width: 14, height: 14 }} />
              {activeSession ? activeSession.startsAt : '16:30 – 18:00'}
            </span>
            <BmBadge variant="active">
              <BilingualText value={bi('Pitch Ready', 'الملعب جاهز')} />
            </BmBadge>
          </div>
        </div>

        {/* Squad Attendance Roster Desk */}
        <div style={{ borderTop: '1px solid var(--uos-border)', paddingTop: 16 }}>
          <CoachAttendanceDesk
            roster={roster.filter((p): p is NonNullable<typeof p> => Boolean(p)).map((p) => ({
              id: p.id,
              name: `${p.nameEn} · ${p.nameAr}`,
              status: 'present'
            }))}
          />
        </div>
      </BmGlass>

      {/* 4. Quick Coach Workflows */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16
        }}
      >
        {[
          {
            to: '/coach/attendance',
            Icon: CheckCircle2,
            title: bi('Take Attendance', 'تسجيل الحضور'),
            desc: bi('Tablet one-tap check-in workflow', 'تسجيل الحضور بلمسة واحدة للأجهزة اللوحية')
          },
          {
            to: '/coach/evaluations',
            Icon: Activity,
            title: bi('Skill Evaluations', 'تقييم المهارات'),
            desc: bi('Score drills, technical skills and fitness', 'تسجيل درجات المهارات واللياقة')
          },
          {
            to: '/coach/schedule',
            Icon: CalendarDays,
            title: bi('Full Timetable', 'الجدول الكامل'),
            desc: bi('Weekly training pitches and times', 'مواعيد وملاعب التدريب الأسبوعية')
          },
          {
            to: '/coach/messages',
            Icon: MessageSquareText,
            title: bi('Direct Dispatch', 'المراسلات المباشرة'),
            desc: bi('Broadcast to squad parents and athletes', 'إرسال التنبيهات لأولياء الأمور واللاعبين')
          }
        ].map(({ to, Icon, title, desc }) => (
          <Link
            key={to}
            to={to}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              padding: '20px 18px',
              borderRadius: 'var(--uos-radius-md)',
              background: 'color-mix(in srgb, var(--uos-surface-1) 85%, transparent)',
              border: '1px solid var(--uos-border)',
              textDecoration: 'none',
              color: 'var(--uos-text-primary)',
              transition: 'all 0.2s ease'
            }}
            className="bm-hover-lift"
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 'var(--uos-radius-sm)',
                background: 'color-mix(in srgb, var(--uos-brand) 12%, transparent)',
                border: '1px solid color-mix(in srgb, var(--uos-brand) 25%, transparent)',
                display: 'grid',
                placeItems: 'center',
                color: 'var(--uos-brand)'
              }}
            >
              <Icon style={{ width: 20, height: 20 }} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>
                <BilingualText value={title} />
              </h4>
              <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--uos-text-muted)', lineHeight: 1.45 }}>
                <BilingualText value={desc} />
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
