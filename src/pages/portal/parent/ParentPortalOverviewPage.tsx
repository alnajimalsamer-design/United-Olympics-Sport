import {
  CalendarDays,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  HeartHandshake,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Trophy,
  User,
  UsersRound
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
import { ParentChildSwitcherCard } from '../../../components/portal/ParentChildSwitcherCard';
import { demoParents } from '../../../data/demo/parents';
import { getGroup, getPlayer, getSport } from '../../../data/demo/selectors';
import { demoSessions } from '../../../data/demo/sessions';

export function ParentPortalOverviewPage() {
  const parent = demoParents[0];
  const children = parent.playerIds.map(getPlayer).filter(Boolean);
  const [selectedChildId, setSelectedChildId] = useState<string>(children[0]?.id ?? '');

  const attended = children.reduce(
    (sum, player) => sum + (player?.attendanceSummary?.attended ?? 0),
    0
  );
  const scheduled = children.reduce(
    (sum, player) => sum + (player?.attendanceSummary?.scheduled ?? 0),
    0
  );
  const attendancePct = scheduled > 0 ? Math.round((attended / scheduled) * 100) : 0;

  const activeChild = children.find((c) => c?.id === selectedChildId) ?? children[0];
  const activeSport = activeChild ? getSport(activeChild.sportId) : null;
  const activeGroup = activeChild ? getGroup(activeChild.groupId) : null;

  // Next session for the active child
  const childSession = activeChild
    ? demoSessions.find((s) => s.groupId === activeChild.groupId)
    : demoSessions[0];

  return (
    <div className="admin-page" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* 1. Family Control Center Command Hero */}
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
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(216, 179, 90, 0.22), transparent)',
              border: '2px solid var(--uos-brand)',
              display: 'grid',
              placeItems: 'center',
              color: 'var(--uos-brand-strong)',
              boxShadow: '0 0 20px rgba(216, 179, 90, 0.25)',
              flexShrink: 0
            }}
          >
            <HeartHandshake style={{ width: 30, height: 30 }} />
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
                <BilingualText value={bi('Family Control Center', 'مركز تحكم الأسرة')} />
              </span>
              <BmBadge variant="gold">
                <BilingualText value={bi('Verified Guardian', 'ولي أمر معتمد')} />
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
              {parent.nameEn}
              <span
                lang="ar"
                dir="rtl"
                style={{
                  fontSize: '0.85em',
                  fontWeight: 600,
                  color: 'var(--uos-brand)',
                  marginRight: 10,
                  marginLeft: 10,
                  fontFamily: 'Cairo, sans-serif'
                }}
              >
                · {parent.nameAr}
              </span>
            </h1>

            <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--uos-text-muted)' }}>
              <BilingualText
                value={bi(
                  'Unified multi-child sports tracking, verified schedules, and official academy records.',
                  'متابعة رياضية موحدة للأبناء، وجداول تدريبية معتمدة، وسجلات أكاديمية رسمية.'
                )}
              />
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link to="/parent/schedule" className="bm-btn-secondary">
            <CalendarDays style={{ width: 16, height: 16 }} />
            <BilingualText value={bi('Family Schedule', 'جدول الأسرة')} />
          </Link>
          <Link to="/parent/payments" className="bm-btn-primary">
            <CreditCard style={{ width: 16, height: 16 }} />
            <BilingualText value={bi('Payments Desk', 'مكتب المدفوعات')} />
          </Link>
        </div>
      </BmGlass>

      {/* 2. Family High-Level Indicators */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 18
        }}
      >
        <BmKpiCard
          icon={UsersRound}
          label={bi('Enrolled Children', 'الأبناء المسجلون')}
          value={children.length}
          trend="neutral"
          trendDelta="0"
          note={bi('Verified family profiles', 'ملفات أسرية معتمدة')}
        />
        <BmKpiCard
          icon={CheckCircle2}
          label={bi('Combined Attendance', 'نسبة الحضور الإجمالية')}
          value={`${attendancePct}%`}
          trend="up"
          trendDelta="+5%"
          note={bi(`${attended} of ${scheduled} sessions attended`, `حضور ${attended} من أصل ${scheduled} حصة`)}
        />
        <BmKpiCard
          icon={CreditCard}
          label={bi('Subscription Status', 'حالة الاشتراك')}
          value="Active · نشط"
          trend="up"
          trendDelta="Current"
          note={bi('All seasonal dues settled', 'كافة الرسوم الموسمية مسددة')}
        />
        <BmKpiCard
          icon={MessageSquareText}
          label={bi('Direct Communication', 'التواصل المباشر')}
          value="Online · متاح"
          trend="neutral"
          note={bi('Direct line with coaches & desk', 'خط مباشر مع المدربين والإدارة')}
        />
      </div>

      {/* 3. Multi-Child Selector & Active Child Cockpit */}
      <ParentChildSwitcherCard
        childrenList={children.filter((c): c is NonNullable<typeof c> => Boolean(c)).map((c) => ({
          id: c.id,
          name: c.nameEn,
          sport: getSport(c.sportId)?.name.en ?? c.sportId,
          nextSession: demoSessions.find((s) => s.groupId === c.groupId)?.startsAt ?? '16:30 – 18:00'
        }))}
        activeChildId={selectedChildId}
        onSelect={setSelectedChildId}
      />

      <BmGlass level={2} style={{ padding: 26, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Active Child Deep Dive Card */}
        {activeChild && (
          <BmGlass
            level={1}
            style={{
              padding: 24,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 20,
              alignItems: 'center'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  border: '2px solid var(--uos-brand)',
                  background: 'color-mix(in srgb, var(--uos-brand) 15%, var(--uos-surface-2))',
                  display: 'grid',
                  placeItems: 'center',
                  color: 'var(--uos-brand-strong)',
                  fontWeight: 800,
                  fontSize: 18,
                  flexShrink: 0
                }}
              >
                {activeChild.nameEn.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: 'var(--uos-text-primary)' }}>
                  {activeChild.nameEn}
                  <span lang="ar" dir="rtl" style={{ fontSize: 14, color: 'var(--uos-brand)', marginRight: 6, marginLeft: 6 }}>
                    · {activeChild.nameAr}
                  </span>
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
                  <span style={{ fontSize: 12, color: 'var(--uos-text-muted)' }}>
                    <code>{activeChild.id}</code>
                  </span>
                  <BmBadge variant="gold">
                    <BilingualText value={activeChild.level || bi('Foundation', 'تأسيسي')} />
                  </BmBadge>
                </div>
              </div>
            </div>

            {/* Current Sport & Group */}
            <div
              style={{
                padding: '14px 18px',
                borderRadius: 'var(--uos-radius-sm)',
                background: 'color-mix(in srgb, var(--uos-surface-2) 60%, transparent)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <span style={{ fontSize: 11, color: 'var(--uos-text-muted)', display: 'block' }}>
                  <BilingualText value={bi('Sport & Training Squad', 'الرياضة والفريق التدريبي')} />
                </span>
                <strong style={{ fontSize: 14, color: 'var(--uos-text-primary)' }}>
                  {activeSport ? <BilingualText value={activeSport.name} /> : activeChild.sportId}
                </strong>
                <span style={{ fontSize: 12, color: 'var(--uos-brand-strong)', display: 'block', marginTop: 2 }}>
                  {activeGroup ? <BilingualText value={activeGroup.name} /> : 'Junior Squad'}
                </span>
              </div>
              <Trophy style={{ width: 28, height: 28, color: 'var(--uos-brand)', opacity: 0.8 }} />
            </div>

            {/* Attendance & Next Session */}
            <div
              style={{
                padding: '14px 18px',
                borderRadius: 'var(--uos-radius-sm)',
                background: 'color-mix(in srgb, var(--uos-surface-2) 60%, transparent)',
                display: 'flex',
                flexDirection: 'column',
                gap: 6
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: 'var(--uos-text-muted)' }}>
                  <BilingualText value={bi('Next Confirmed Session', 'الحصة القادمة المؤكدة')} />
                </span>
                <BmBadge variant="active"><BilingualText value={bi('On Schedule', 'في الموعد')} /></BmBadge>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700 }}>
                <Clock style={{ width: 14, height: 14, color: 'var(--uos-brand)' }} />
                <span>{childSession ? childSession.startsAt : '16:30 – 18:00'}</span>
              </div>
              <span style={{ fontSize: 11, color: 'var(--uos-text-muted)' }}>
                {activeGroup ? <BilingualText value={activeGroup.name} /> : 'Standard Squad Practice'}
              </span>
            </div>
          </BmGlass>
        )}
      </BmGlass>

      {/* 4. Fast Navigation Surfaces for Parents */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16
        }}
      >
        {[
          {
            to: '/parent/children',
            Icon: UsersRound,
            title: bi('Children Profiles', 'ملفات الأبناء'),
            desc: bi('Medical info, clearances, levels', 'البيانات الصحية والتصاريح والمستويات')
          },
          {
            to: '/parent/schedule',
            Icon: CalendarDays,
            title: bi('Family Timetable', 'الجدول الأسبوعي'),
            desc: bi('All sessions aggregated in one calendar', 'مواعيد كافة الأبناء في تقويم واحد')
          },
          {
            to: '/parent/payments',
            Icon: CreditCard,
            title: bi('Invoices & Receipts', 'الفواتير والإيصالات'),
            desc: bi('Verified billing statements and renewal', 'كشوف الحسابات المعتمدة والتجديد')
          },
          {
            to: '/parent/messages',
            Icon: MessageSquareText,
            title: bi('Official Communications', 'الرسائل والتنبيهات الرسمية'),
            desc: bi('Official coach communications', 'المراسلات الرسمية مع المدربين')
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
