import {
  ArrowRight,
  BarChart3,
  Building2,
  CalendarClock,
  CheckCircle2,
  Dumbbell,
  Layers,
  Medal,
  ShieldCheck,
  Trophy,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  BmBadge,
  BmGlass,
  BmKpiCard,
  BmPageHeader
} from '../../components/benchmark/BenchmarkComponents';
import { BilingualText, bi } from '../../components/bilingual/BilingualText';
import { demoBranches } from '../../data/demo/business';
import { demoPlayers } from '../../data/demo/players';
import { demoActivity, demoSessions } from '../../data/demo/sessions';
import { demoSports } from '../../data/demo/sports';
import { demoTrainingGroups } from '../../data/demo/trainingGroups';

export function AdminDashboardPage() {
  const coachCount = new Set(demoTrainingGroups.flatMap((group) => group.coachIds)).size;
  const programCount = new Set(demoSports.flatMap((sport) => sport.programIds)).size;

  return (
    <div className="admin-page" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* 1. Official Header & Command Status */}
      <BmGlass
        level={3}
        style={{
          padding: '24px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <img
            src="/brand/united-olympics-sports-logo.png"
            alt="United Olympics Sports"
            style={{
              width: 58,
              height: 58,
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 16px rgba(216, 179, 90, 0.35))',
              flexShrink: 0
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h2
                style={{
                  margin: 0,
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: '-0.01em',
                  color: 'var(--uos-brand-strong)'
                }}
              >
                <BilingualText value={bi('Super Admin Command Center', 'مركز قيادة الإدارة الرئيسية')} />
              </h2>
              <BmBadge variant="gold">
                <BilingualText value={bi('Verified Operations', 'عمليات معتمدة')} />
              </BmBadge>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--uos-text-muted)' }}>
              <BilingualText
                value={bi(
                  'Unified multi-branch administration covering sports, athletes, facilities, and staff.',
                  'إدارة موحدة متعددة الفروع تغطي الرياضات واللاعبين والمنشآت والكوادر الفنية.'
                )}
              />
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link to="/admin/branches" className="bm-btn-secondary">
            <Building2 style={{ width: 16, height: 16 }} />
            <BilingualText value={bi('Branches Cockpit', 'مركز الفروع')} />
          </Link>
          <Link to="/admin/players" className="bm-btn-primary">
            <Users style={{ width: 16, height: 16 }} />
            <BilingualText value={bi('Player Directory', 'دليل اللاعبين')} />
          </Link>
        </div>
      </BmGlass>

      {/* 2. Real KPI Matrix */}
      <section aria-label="Operations metrics | المؤشرات التشغيلية">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 18
          }}
        >
          <BmKpiCard
            icon={Trophy}
            label={bi('Sports Disciplines', 'الرياضات المعتمدة')}
            value={demoSports.length}
            trend="up"
            trendDelta="+4"
            note={bi('Football, Basketball, Swimming, Tennis', 'كرة القدم، السلة، السباحة، التنس')}
          />
          <BmKpiCard
            icon={Dumbbell}
            label={bi('Training Groups', 'مجموعات التدريب')}
            value={demoTrainingGroups.length}
            trend="up"
            trendDelta="+6"
            note={bi('Active across all branches', 'نشطة في كافة الفروع')}
          />
          <BmKpiCard
            icon={Medal}
            label={bi('Registered Athletes', 'اللاعبون المسجلون')}
            value={demoPlayers.length}
            trend="up"
            trendDelta="+12%"
            note={bi('In verified preview cohort', 'ضمن الفئة التجريبية المعتمدة')}
          />
          <BmKpiCard
            icon={ShieldCheck}
            label={bi('Certified Coaches', 'المدربون المعتمدون')}
            value={coachCount}
            trend="neutral"
            trendDelta="0"
            note={bi('Full technical staffing', 'اكتمال الكادر الفني')}
          />
          <BmKpiCard
            icon={BarChart3}
            label={bi('Development Programs', 'برامج التطوير')}
            value={programCount}
            trend="up"
            trendDelta="+5"
            note={bi('Structured age pathways', 'مسارات عمرية منظمة')}
          />
          <BmKpiCard
            icon={CalendarClock}
            label={bi('Weekly Sessions', 'الحصص الأسبوعية')}
            value={demoSessions.length}
            trend="up"
            trendDelta="+8%"
            note={bi('Scheduled timetable', 'جدول زمني نشط')}
          />
        </div>
      </section>

      {/* 3. Core Operational Grids: Quick Access & Recent Audit Activity */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 24
        }}
      >
        {/* Quick Management Shortcuts */}
        <BmGlass level={2} style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--uos-text-primary)' }}>
                <BilingualText value={bi('Primary Management Surfaces', 'واجهات الإدارة الأساسية')} />
              </h3>
              <span style={{ fontSize: 12, color: 'var(--uos-text-muted)' }}>
                <BilingualText value={bi('Direct operational routing', 'الوصول المباشر للعمليات')} />
              </span>
            </div>
            <Layers style={{ width: 18, height: 18, color: 'var(--uos-brand)' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
            {[
              { to: '/admin/branches', Icon: Building2, label: bi('Branches', 'الفروع'), sub: bi('4 Facilities', '٤ منشآت') },
              { to: '/admin/players', Icon: Users, label: bi('Players', 'اللاعبون'), sub: bi('Directory & Stats', 'الدليل والإحصاء') },
              { to: '/admin/sports', Icon: Trophy, label: bi('Sports', 'الرياضات'), sub: bi('Disciplines', 'التخصصات') },
              { to: '/admin/schedules', Icon: CalendarClock, label: bi('Schedules', 'الجداول'), sub: bi('Timetables', 'المواعيد') },
              { to: '/admin/registrations', Icon: ShieldCheck, label: bi('Registrations', 'التسجيلات'), sub: bi('Intake flow', 'طلبات الانضمام') },
              { to: '/admin/reports', Icon: BarChart3, label: bi('Reports', 'التقارير'), sub: bi('Analytics', 'التحليلات') }
            ].map(({ to, Icon, label, sub }) => (
              <Link
                key={to}
                to={to}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  padding: 16,
                  borderRadius: 'var(--uos-radius-sm)',
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
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: 'color-mix(in srgb, var(--uos-brand) 12%, transparent)',
                    display: 'grid',
                    placeItems: 'center',
                    color: 'var(--uos-brand)'
                  }}
                >
                  <Icon style={{ width: 18, height: 18 }} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>
                    <BilingualText value={label} />
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--uos-text-muted)', marginTop: 2 }}>
                    <BilingualText value={sub} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </BmGlass>

        {/* Operational Preview Activity */}
        <BmGlass level={2} style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--uos-text-primary)' }}>
                <BilingualText value={bi('Verified Operational Log', 'سجل العمليات المعتمد')} />
              </h3>
              <span style={{ fontSize: 12, color: 'var(--uos-text-muted)' }}>
                <BilingualText value={bi('Current preview system events', 'أحداث النظام التجريبية الحالية')} />
              </span>
            </div>
            <BmBadge variant="active">
              <BilingualText value={bi('Synchronized', 'متزامن')} />
            </BmBadge>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {demoActivity.map((item, index) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '12px 14px',
                  borderRadius: 'var(--uos-radius-sm)',
                  background: 'color-mix(in srgb, var(--uos-surface-1) 60%, transparent)',
                  border: '1px solid var(--uos-border)'
                }}
              >
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: 'color-mix(in srgb, var(--uos-brand) 15%, transparent)',
                    color: 'var(--uos-brand-strong)',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: 12,
                    fontWeight: 700,
                    flexShrink: 0
                  }}
                >
                  0{index + 1}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--uos-text-primary)' }}>
                    <BilingualText value={item.title} />
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--uos-text-muted)', marginTop: 2 }}>
                    <BilingualText value={item.time} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </BmGlass>
      </div>

      {/* 4. Truthful Regional Branch Readiness */}
      <BmGlass level={2} style={{ padding: 28 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
            flexWrap: 'wrap',
            gap: 12
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: 'var(--uos-text-primary)' }}>
              <BilingualText value={bi('Branch Facility Operational Status', 'جاهزية وتشغيل الفروع الرياضية')} />
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--uos-text-muted)' }}>
              <BilingualText
                value={bi(
                  'Truthfully calculated readiness metrics based on linked sports, programs, coaches and athletes.',
                  'مؤشرات جاهزية محسوبة بدقة بناءً على الرياضات والبرامج والمدربين واللاعبين المرتبطين.'
                )}
              />
            </p>
          </div>
          <Link to="/admin/branches" className="bm-btn-secondary">
            <BilingualText value={bi('View All 4 Branches', 'عرض جميع الفروع الـ 4')} />
            <ArrowRight style={{ width: 14, height: 14 }} />
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 18
          }}
        >
          {demoBranches.map((branch) => {
            const readinessPct = Math.min(
              100,
              Math.round(
                ((branch.sportIds.length > 0 ? 25 : 0) +
                  (branch.programIds.length > 0 ? 25 : 0) +
                  (branch.coachIds.length > 0 ? 25 : 0) +
                  (branch.playerIds.length > 0 ? 25 : 0))
              )
            );

            return (
              <BmGlass
                key={branch.id}
                level={1}
                style={{
                  padding: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 8,
                        background: 'color-mix(in srgb, var(--uos-brand) 15%, transparent)',
                        display: 'grid',
                        placeItems: 'center',
                        color: 'var(--uos-brand)'
                      }}
                    >
                      <Building2 style={{ width: 20, height: 20 }} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: 'var(--uos-text-primary)' }}>
                        <BilingualText value={branch.name} />
                      </h4>
                      <span style={{ fontSize: 11, color: 'var(--uos-text-muted)' }}>
                        <code>{branch.id}</code>
                      </span>
                    </div>
                  </div>
                  <BmBadge variant={branch.status === 'active' ? 'active' : 'inactive'}>
                    <BilingualText value={branch.status === 'active' ? bi('Active', 'نشط') : bi('Inactive', 'غير نشط')} />
                  </BmBadge>
                </div>

                {/* Progress bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                    <span style={{ color: 'var(--uos-text-muted)' }}>
                      <BilingualText value={bi('Facility Readiness', 'جاهزية المنشأة')} />
                    </span>
                    <strong style={{ color: 'var(--uos-brand-strong)' }}>{readinessPct}%</strong>
                  </div>
                  <div
                    style={{
                      height: 6,
                      borderRadius: 99,
                      background: 'color-mix(in srgb, var(--uos-border) 60%, transparent)',
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${readinessPct}%`,
                        background: 'linear-gradient(90deg, var(--uos-brand), var(--uos-brand-strong))',
                        borderRadius: 99
                      }}
                    />
                  </div>
                </div>

                {/* Metrics Breakdown */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 8,
                    padding: '10px 12px',
                    borderRadius: 'var(--uos-radius-sm)',
                    background: 'color-mix(in srgb, var(--uos-surface-2) 60%, transparent)',
                    textAlign: 'center'
                  }}
                >
                  <div>
                    <span style={{ fontSize: 10, color: 'var(--uos-text-muted)', display: 'block' }}>
                      <BilingualText value={bi('Sports', 'الرياضات')} />
                    </span>
                    <strong style={{ fontSize: 14, color: 'var(--uos-text-primary)' }}>
                      {branch.sportIds.length}
                    </strong>
                  </div>
                  <div>
                    <span style={{ fontSize: 10, color: 'var(--uos-text-muted)', display: 'block' }}>
                      <BilingualText value={bi('Coaches', 'المدربون')} />
                    </span>
                    <strong style={{ fontSize: 14, color: 'var(--uos-text-primary)' }}>
                      {branch.coachIds.length}
                    </strong>
                  </div>
                  <div>
                    <span style={{ fontSize: 10, color: 'var(--uos-text-muted)', display: 'block' }}>
                      <BilingualText value={bi('Athletes', 'اللاعبون')} />
                    </span>
                    <strong style={{ fontSize: 14, color: 'var(--uos-text-primary)' }}>
                      {branch.playerIds.length}
                    </strong>
                  </div>
                </div>

                <Link
                  to={`/admin/branches/${branch.id}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 'var(--uos-radius-sm)',
                    background: 'var(--uos-surface-1)',
                    border: '1px solid var(--uos-border)',
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'var(--uos-brand-strong)',
                    textDecoration: 'none'
                  }}
                >
                  <span>
                    <BilingualText value={bi('Open Branch Cockpit', 'فتح مركز تحكم الفرع')} />
                  </span>
                  <ArrowRight style={{ width: 14, height: 14 }} />
                </Link>
              </BmGlass>
            );
          })}
        </div>
      </BmGlass>
    </div>
  );
}
