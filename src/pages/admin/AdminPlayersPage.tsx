import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Filter,
  Plus,
  Search,
  ShieldCheck,
  Trophy,
  User,
  Users,
  X
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BmAthleteCell,
  BmBadge,
  BmDataTable,
  BmField,
  BmFormSection,
  BmGlass,
  BmPageHeader,
  BmSelect
} from '../../components/benchmark/BenchmarkComponents';
import { BilingualText, bi } from '../../components/bilingual/BilingualText';
import { demoPlayers } from '../../data/demo/players';
import { demoSports } from '../../data/demo/sports';
import { demoTrainingGroups } from '../../data/demo/trainingGroups';
import type { Player } from '../../domain/contracts';

export function AdminPlayersPage() {
  const [query, setQuery] = useState('');
  const [sportFilter, setSportFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Add Player Form State
  const [nameEn, setNameEn] = useState('');
  const [nameAr, setNameAr] = useState('');
  const [selectedSport, setSelectedSport] = useState('football');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [age, setAge] = useState('');
  const [formSaved, setFormSaved] = useState(false);

  const filteredPlayers = useMemo(() => {
    return demoPlayers.filter((player) => {
      const matchesQuery =
        `${player.nameEn} ${player.nameAr} ${player.id}`.toLowerCase().includes(query.toLowerCase());
      const matchesSport = sportFilter === 'all' || player.sportId === sportFilter;
      const matchesStatus =
        statusFilter === 'all' ||
        (typeof player.status === 'object'
          ? player.status.en.toLowerCase() === statusFilter
          : statusFilter === 'all');
      return matchesQuery && matchesSport && matchesStatus;
    });
  }, [query, sportFilter, statusFilter]);

  const handleCreatePlayer = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSaved(true);
    setTimeout(() => {
      setFormSaved(false);
      setShowAddModal(false);
      setNameEn('');
      setNameAr('');
      setAge('');
    }, 1200);
  };

  return (
    <div className="admin-page" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <BmPageHeader
        icon={Users}
        eyebrow={bi('Athlete Management', 'إدارة الرياضيين')}
        title={bi('Player Directory', 'دليل اللاعبين')}
        description={bi(
          'Verified athlete directory connected to training groups, attendance history, and sport-aware performance benchmarks.',
          'دليل معتمد للرياضيين مرتبط بمجموعات التدريب وسجلات الحضور ومؤشرات الأداء الخاصة بكل رياضة.'
        )}
        actions={
          <button
            type="button"
            className="bm-btn-primary"
            onClick={() => setShowAddModal(true)}
          >
            <Plus style={{ width: 16, height: 16 }} />
            <BilingualText value={bi('Register New Athlete', 'تسجيل لاعب جديد')} />
          </button>
        }
      />

      {/* Flagship Player Data Table */}
      <BmDataTable<Player>
        data={filteredPlayers}
        keyField="id"
        searchPlaceholder="Search athlete by name, ID or code... | البحث عن اللاعب بالاسم أو الرمز..."
        onSearch={setQuery}
        filters={
          <>
            <select
              value={sportFilter}
              onChange={(e) => setSportFilter(e.target.value)}
              className="bm-table-filter-select"
            >
              <option value="all">All Sports · جميع الرياضات</option>
              {demoSports.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name.en} · {s.name.ar}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bm-table-filter-select"
            >
              <option value="all">All Statuses · كافة الحالات</option>
              <option value="active">Active · نشط</option>
              <option value="inactive">Inactive · غير نشط</option>
            </select>
          </>
        }
        columns={[
          {
            key: 'athlete',
            title: bi('Athlete Profile', 'ملف اللاعب'),
            render: (player) => (
              <BmAthleteCell
                nameEn={player.nameEn}
                nameAr={player.nameAr}
                subtext={`ID: ${player.id}`}
              />
            )
          },
          {
            key: 'sportId',
            title: bi('Discipline', 'التخصص الرياضي'),
            render: (player) => {
              const sport = demoSports.find((s) => s.id === player.sportId);
              return (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '4px 10px',
                    borderRadius: 999,
                    background: 'color-mix(in srgb, var(--uos-brand) 12%, transparent)',
                    color: 'var(--uos-brand-strong)',
                    fontSize: 12,
                    fontWeight: 600
                  }}
                >
                  <Trophy style={{ width: 13, height: 13 }} />
                  {sport ? <BilingualText value={sport.name} /> : player.sportId}
                </span>
              );
            }
          },
          {
            key: 'groupId',
            title: bi('Training Group', 'مجموعة التدريب'),
            render: (player) => {
              const group = demoTrainingGroups.find((g) => g.id === player.groupId);
              return (
                <span style={{ fontSize: 13, color: 'var(--uos-text-secondary)' }}>
                  {group ? <BilingualText value={group.name} /> : (player.groupId || '—')}
                </span>
              );
            }
          },
          {
            key: 'age',
            title: bi('Age', 'العمر'),
            align: 'center',
            render: (player) => (
              <span style={{ fontWeight: 600 }}>{player.age ? `${player.age} yrs` : '—'}</span>
            )
          },
          {
            key: 'level',
            title: bi('Level', 'المستوى'),
            align: 'center',
            render: (player) => (
              <BmBadge variant="gold">
                <BilingualText value={player.level || bi('Foundation', 'تأسيسي')} />
              </BmBadge>
            )
          },
          {
            key: 'attendance',
            title: bi('Attendance', 'نسبة الحضور'),
            align: 'center',
            render: (player) => {
              const att = player.attendanceSummary;
              const rate = att && att.scheduled > 0 ? Math.round((att.attended / att.scheduled) * 100) : 0;
              return (
                <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                  <strong style={{ fontSize: 13, color: 'var(--uos-brand-strong)' }}>{rate}%</strong>
                  <span style={{ fontSize: 10, color: 'var(--uos-text-muted)' }}>
                    {att ? `${att.attended}/${att.scheduled}` : '0/0'}
                  </span>
                </div>
              );
            }
          },
          {
            key: 'performanceScore',
            title: bi('Score / 100', 'النتيجة / 100'),
            align: 'center',
            render: (player) => {
              const score =
                player.performanceHistory.length > 0
                  ? Math.round(
                      player.performanceHistory.reduce((acc, p) => acc + p.value, 0) /
                        player.performanceHistory.length
                    )
                  : 80;
              return (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 800,
                      color: score >= 80 ? 'var(--uos-success)' : 'var(--uos-brand-strong)'
                    }}
                  >
                    {score}
                  </span>
                </div>
              );
            }
          },
          {
            key: 'status',
            title: bi('Status', 'الحالة'),
            align: 'center',
            render: (player) => (
              <BmBadge
                variant={
                  typeof player.status === 'object' && player.status.en === 'active'
                    ? 'active'
                    : 'active'
                }
              >
                <BilingualText value={bi('Active', 'نشط')} />
              </BmBadge>
            )
          },
          {
            key: 'actions',
            title: bi('Record', 'السجل'),
            align: 'right',
            render: (player) => (
              <Link
                to={`/admin/players/${player.id}`}
                className="bm-btn-secondary"
                style={{ height: 34, padding: '0 12px', fontSize: 12 }}
              >
                <BilingualText value={bi('Profile', 'الملف')} />
                <ArrowRight style={{ width: 12, height: 12 }} />
              </Link>
            )
          }
        ]}
        renderMobileCard={(player) => {
          const sport = demoSports.find((s) => s.id === player.sportId);
          const att = player.attendanceSummary;
          const rate = att && att.scheduled > 0 ? Math.round((att.attended / att.scheduled) * 100) : 0;
          return (
            <>
              <div className="bm-mobile-card-header">
                <BmAthleteCell
                  nameEn={player.nameEn}
                  nameAr={player.nameAr}
                  subtext={`ID: ${player.id}`}
                />
                <BmBadge variant="active">
                  <BilingualText value={bi('Active', 'نشط')} />
                </BmBadge>
              </div>

              <div className="bm-mobile-card-grid-data">
                <div className="bm-mobile-card-grid-item">
                  <span className="bm-mobile-card-grid-label">
                    <BilingualText value={bi('Sport', 'الرياضة')} />
                  </span>
                  <span className="bm-mobile-card-grid-value">
                    {sport ? <BilingualText value={sport.name} /> : player.sportId}
                  </span>
                </div>
                <div className="bm-mobile-card-grid-item">
                  <span className="bm-mobile-card-grid-label">
                    <BilingualText value={bi('Age', 'العمر')} />
                  </span>
                  <span className="bm-mobile-card-grid-value">{player.age ? `${player.age} yrs` : '—'}</span>
                </div>
                <div className="bm-mobile-card-grid-item">
                  <span className="bm-mobile-card-grid-label">
                    <BilingualText value={bi('Score', 'النتيجة')} />
                  </span>
                  <span className="bm-mobile-card-grid-value" style={{ color: 'var(--uos-brand-strong)' }}>
                    {player.performanceHistory.length > 0
                      ? Math.round(
                          player.performanceHistory.reduce((acc, p) => acc + p.value, 0) /
                            player.performanceHistory.length
                        )
                      : 80}{' '}
                    / 100
                  </span>
                </div>
                <div className="bm-mobile-card-grid-item">
                  <span className="bm-mobile-card-grid-label">
                    <BilingualText value={bi('Attendance', 'الحضور')} />
                  </span>
                  <span className="bm-mobile-card-grid-value">{rate}%</span>
                </div>
              </div>

              <Link
                to={`/admin/players/${player.id}`}
                className="bm-btn-secondary"
                style={{ width: '100%', justifyContent: 'center', height: 40 }}
              >
                <BilingualText value={bi('Open Player Record', 'فتح سجل اللاعب')} />
                <ArrowRight style={{ width: 14, height: 14 }} />
              </Link>
            </>
          );
        }}
      />

      {/* Add Player Modal */}
      {showAddModal && (
        <div
          role="presentation"
          onClick={() => setShowAddModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(10px)',
            zIndex: 999,
            display: 'grid',
            placeItems: 'center',
            padding: 16
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className="bm-glass-4"
            style={{
              width: '100%',
              maxWidth: 680,
              padding: '32px',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 24,
                borderBottom: '1px solid var(--uos-border)',
                paddingBottom: 16
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 'var(--uos-radius-sm)',
                    background: 'color-mix(in srgb, var(--uos-brand) 15%, transparent)',
                    display: 'grid',
                    placeItems: 'center',
                    color: 'var(--uos-brand)'
                  }}
                >
                  <User style={{ width: 22, height: 22 }} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: 'var(--uos-text-primary)' }}>
                    <BilingualText value={bi('Athlete Intake & Registration', 'تسجيل وقيد لاعب جديد')} />
                  </h3>
                  <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--uos-text-muted)' }}>
                    <BilingualText
                      value={bi(
                        'Enter official athlete roster details into local preview management state.',
                        'أدخل بيانات اللاعب الرسمية في سجل المعاينة المحلي.'
                      )}
                    />
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--uos-text-muted)',
                  cursor: 'pointer',
                  padding: 8
                }}
                aria-label="Close dialog"
              >
                <X style={{ width: 20, height: 20 }} />
              </button>
            </div>

            {formSaved ? (
              <div style={{ padding: '36px 0', textAlign: 'center' }}>
                <CheckCircle2
                  style={{ width: 48, height: 48, color: 'var(--uos-success)', margin: '0 auto 12px' }}
                />
                <h4 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>
                  <BilingualText value={bi('Athlete Registered Successfully', 'تم تسجيل اللاعب بنجاح')} />
                </h4>
                <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--uos-text-muted)' }}>
                  <BilingualText
                    value={bi(
                      'The athlete profile has been added to the local preview directory.',
                      'تمت إضافة ملف اللاعب إلى دليل المعاينة المحلي بنجاح.'
                    )}
                  />
                </p>
              </div>
            ) : (
              <form onSubmit={handleCreatePlayer}>
                <BmFormSection
                  title={bi('Athlete Identification', 'هوية وبيانات اللاعب')}
                  icon={User}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                    <BmField
                      labelEn="Athlete Name (English)"
                      labelAr="اسم اللاعب (بالإنجليزية)"
                      icon={User}
                      placeholder="e.g. Sami Al-Mansoor"
                      value={nameEn}
                      onChange={(e) => setNameEn(e.target.value)}
                      required
                    />
                    <BmField
                      labelEn="Athlete Name (Arabic)"
                      labelAr="اسم اللاعب (بالعربية)"
                      icon={User}
                      placeholder="مثال: سامي المنصور"
                      dir="rtl"
                      value={nameAr}
                      onChange={(e) => setNameAr(e.target.value)}
                      required
                    />
                    <BmField
                      labelEn="Athlete Age"
                      labelAr="عمر اللاعب"
                      type="number"
                      placeholder="12"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      required
                    />
                    <BmSelect
                      labelEn="Sport Discipline"
                      labelAr="التخصص الرياضي"
                      icon={Trophy}
                      value={selectedSport}
                      onChange={(e) => setSelectedSport(e.target.value)}
                      options={demoSports.map((s) => ({
                        value: s.id,
                        labelEn: s.name.en,
                        labelAr: s.name.ar
                      }))}
                    />
                  </div>
                </BmFormSection>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: 12,
                    marginTop: 28,
                    borderTop: '1px solid var(--uos-border)',
                    paddingTop: 18
                  }}
                >
                  <button
                    type="button"
                    className="bm-btn-secondary"
                    onClick={() => setShowAddModal(false)}
                  >
                    <BilingualText value={bi('Cancel', 'إلغاء')} />
                  </button>
                  <button type="submit" className="bm-btn-primary">
                    <CheckCircle2 style={{ width: 16, height: 16 }} />
                    <BilingualText value={bi('Confirm Athlete Registration', 'تأكيد تسجيل اللاعب')} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
