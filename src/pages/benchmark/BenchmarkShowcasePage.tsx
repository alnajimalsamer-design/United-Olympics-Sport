import {
  Activity,
  Award,
  BarChart3,
  Building2,
  CalendarDays,
  CheckCircle2,
  Layers,
  Lock,
  Mail,
  ShieldCheck,
  Trophy,
  User,
  Users
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BmAthleteCell,
  BmBadge,
  BmDataTable,
  BmField,
  BmFormSection,
  BmGlass,
  BmKpiCard,
  BmPageHeader,
  BmSelect
} from '../../components/benchmark/BenchmarkComponents';
import { BilingualText, bi } from '../../components/bilingual/BilingualText';
import { demoPlayers } from '../../data/demo/players';

export function BenchmarkShowcasePage() {
  const [activeTab, setActiveTab] = useState<'surfaces' | 'forms' | 'tables' | 'kpis' | 'auth'>('surfaces');

  return (
    <div style={{ maxWidth: 'var(--uos-content-max)', margin: '0 auto', padding: '32px 24px 80px' }}>
      <BmPageHeader
        icon={Layers}
        eyebrow={bi('Design System & UI Laboratory', 'نظام التصميم والمختبر البصري')}
        title={bi('Benchmark Visual System', 'النظام البصري المرجعي')}
        description={bi(
          'A precision laboratory verifying glass depth, typography hierarchy, bilingual form fields, tables, and sports UI surfaces.',
          'مختبر دقيق للتحقق من عمق الزجاج والترتيب الطباعي وحقول النماذج ثنائية اللغة والجداول والواجهات الرياضية.'
        )}
        actions={
          <div style={{ display: 'flex', gap: 10 }}>
            <Link to="/admin" className="bm-btn-secondary">
              <BilingualText value={bi('Admin Dashboard', 'لوحة الإدارة')} />
            </Link>
            <Link to="/player/login" className="bm-btn-primary">
              <BilingualText value={bi('Player Auth', 'تسجيل اللاعب')} />
            </Link>
          </div>
        }
      />

      {/* Laboratory Navigation Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          marginBottom: 32,
          padding: 6,
          background: 'color-mix(in srgb, var(--uos-surface-2) 60%, transparent)',
          borderRadius: 'var(--uos-radius-md)',
          border: '1px solid var(--uos-border)',
          overflowX: 'auto'
        }}
      >
        {[
          { id: 'surfaces', label: bi('Glass Surfaces', 'الأسطح الزجاجية') },
          { id: 'forms', label: bi('Fields & Forms', 'الحقول والنماذج') },
          { id: 'tables', label: bi('Flagship Table', 'الجدول الرئيسي') },
          { id: 'kpis', label: bi('KPI & Metrics', 'المؤشرات والبطاقات') },
          { id: 'auth', label: bi('Auth Architecture', 'معمارية المصادقة') }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              padding: '10px 18px',
              borderRadius: 'var(--uos-radius-sm)',
              border: 'none',
              background: activeTab === tab.id ? 'var(--uos-surface-1)' : 'transparent',
              color: activeTab === tab.id ? 'var(--uos-brand-strong)' : 'var(--uos-text-muted)',
              fontWeight: activeTab === tab.id ? 700 : 500,
              fontSize: 13,
              cursor: 'pointer',
              boxShadow: activeTab === tab.id ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            <BilingualText value={tab.label} />
          </button>
        ))}
      </div>

      {/* 1. SURFACES */}
      {activeTab === 'surfaces' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          <BmGlass level={1} style={{ padding: 24 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--uos-brand)', textTransform: 'uppercase' }}>
              Level 1 Glass
            </span>
            <h3 style={{ margin: '8px 0', fontSize: 18, color: 'var(--uos-text-primary)' }}>
              <BilingualText value={bi('Quiet Supporting Surface', 'سطح داعم هادئ')} />
            </h3>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--uos-text-muted)', lineHeight: 1.5 }}>
              <BilingualText
                value={bi(
                  'Subtle backdrop blur (8px) for background cards, secondary sections, and structural containers.',
                  'ضبابية خفيفة (8px) للبطاقات الخلفية والأقسام الثانوية والحاويات الهيكلية.'
                )}
              />
            </p>
          </BmGlass>

          <BmGlass level={2} style={{ padding: 24 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--uos-brand)', textTransform: 'uppercase' }}>
              Level 2 Glass
            </span>
            <h3 style={{ margin: '8px 0', fontSize: 18, color: 'var(--uos-text-primary)' }}>
              <BilingualText value={bi('Interactive Surface', 'سطح تفاعلي')} />
            </h3>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--uos-text-muted)', lineHeight: 1.5 }}>
              <BilingualText
                value={bi(
                  'Moderate elevation (12px blur) with metallic brand edge for form modules, interactive lists, and data cards.',
                  'ارتفاع متوسط (ضبابية 12px) بحافة برونزية ذهبية لنماذج الإدخال والقوائم التفاعلية.'
                )}
              />
            </p>
          </BmGlass>

          <BmGlass level={3} style={{ padding: 24 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--uos-brand)', textTransform: 'uppercase' }}>
              Level 3 Glass
            </span>
            <h3 style={{ margin: '8px 0', fontSize: 18, color: 'var(--uos-text-primary)' }}>
              <BilingualText value={bi('Hero / Featured Accent', 'سطح مميز وبارز')} />
            </h3>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--uos-text-muted)', lineHeight: 1.5 }}>
              <BilingualText
                value={bi(
                  'Illuminated edge lighting with subtle gold gradient depth for flagship command centers and profile banners.',
                  'إضاءة حواف مميزة مع تدرج ذهبي عميق لمراكز القيادة وشاشات الملف الشخصي الرئيسية.'
                )}
              />
            </p>
          </BmGlass>

          <BmGlass level={4} style={{ padding: 24 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--uos-brand)', textTransform: 'uppercase' }}>
              Level 4 Glass
            </span>
            <h3 style={{ margin: '8px 0', fontSize: 18, color: 'var(--uos-text-primary)' }}>
              <BilingualText value={bi('Floating Dialog & Drawer', 'حوار عائم وقوائم منبثقة')} />
            </h3>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--uos-text-muted)', lineHeight: 1.5 }}>
              <BilingualText
                value={bi(
                  'Heavy blur (24px) with deep drop-shadow for modals, flyouts, and command palette overlays.',
                  'ضبابية عالية (24px) مع ظلال عميقة للنوافذ المنبثقة ولوحات الأوامر.'
                )}
              />
            </p>
          </BmGlass>
        </div>
      )}

      {/* 2. FORMS */}
      {activeTab === 'forms' && (
        <BmGlass level={2} style={{ padding: 32, maxWidth: 840, margin: '0 auto' }}>
          <BmFormSection
            title={bi('Athlete Registration & Profile Fields', 'تسجيل اللاعب وحقول الملف التعريفي')}
            icon={User}
            description={bi(
              'Persistent bilingual labels, modern vector icons, comfortable touch targets, and truthful validation.',
              'تسميات ثنائية اللغة دائمة، وأيقونات موجهة حديثة، وأهداف لمس مريحة، وتحقق صادق.'
            )}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
              <BmField
                labelEn="Full Name (English)"
                labelAr="الاسم الكامل (بالإنجليزية)"
                icon={User}
                placeholder="e.g. Tariq Al-Mansoor"
                defaultValue="Omar Al-Sabah"
                helper={bi('Official passport name', 'الاسم الرسمي حسب جواز السفر')}
              />
              <BmField
                labelEn="Full Name (Arabic)"
                labelAr="الاسم الكامل (بالعربية)"
                icon={User}
                placeholder="مثال: طارق المنصور"
                defaultValue="عمر الصباح"
                dir="rtl"
                helper={bi('Full Arabic name', 'الاسم الرباعي بالعربية')}
              />
              <BmSelect
                labelEn="Primary Sport"
                labelAr="الرياضة الأساسية"
                icon={Trophy}
                options={[
                  { value: 'football', labelEn: 'Football', labelAr: 'كرة القدم' },
                  { value: 'basketball', labelEn: 'Basketball', labelAr: 'كرة السلة' },
                  { value: 'swimming', labelEn: 'Swimming', labelAr: 'السباحة' },
                  { value: 'tennis', labelEn: 'Tennis', labelAr: 'التنس' }
                ]}
              />
              <BmField
                labelEn="Emergency Contact"
                labelAr="جهة الاتصال في حالات الطوارئ"
                icon={Mail}
                type="tel"
                placeholder="+971 50 000 0000"
                helper={bi('Verified parent phone number', 'رقم هاتف ولي الأمر المعتمد')}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
              <button type="button" className="bm-btn-secondary">
                <BilingualText value={bi('Cancel', 'إلغاء')} />
              </button>
              <button type="button" className="bm-btn-primary">
                <CheckCircle2 style={{ width: 16, height: 16 }} />
                <BilingualText value={bi('Save Changes', 'حفظ التغييرات')} />
              </button>
            </div>
          </BmFormSection>
        </BmGlass>
      )}

      {/* 3. FLAGSHIP TABLE */}
      {activeTab === 'tables' && (
        <BmDataTable
          data={demoPlayers}
          keyField="id"
          searchPlaceholder="Search by athlete name, sport or ID... | البحث بالاسم أو الرياضة أو الرمز..."
          columns={[
            {
              key: 'player',
              title: bi('Athlete Profile', 'ملف الرياضي'),
              render: (row) => (
                <BmAthleteCell
                  nameEn={row.nameEn}
                  nameAr={row.nameAr}
                  subtext={`ID: ${row.id}`}
                  badge={
                    <BmBadge variant="gold">
                      <BilingualText value={row.level || bi('Foundation', 'تأسيسي')} />
                    </BmBadge>
                  }
                />
              )
            },
            {
              key: 'sportId',
              title: bi('Sport Discipline', 'التخصص الرياضي'),
              render: (row) => (
                <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>
                  {row.sportId}
                </span>
              )
            },
            {
              key: 'age',
              title: bi('Age', 'العمر'),
              align: 'center',
              render: (row) => <span>{row.age ? `${row.age} yrs` : '—'}</span>
            },
            {
              key: 'performanceScore',
              title: bi('Score / 100', 'النتيجة / 100'),
              align: 'center',
              render: (row) => {
                const score =
                  row.performanceHistory.length > 0
                    ? Math.round(
                        row.performanceHistory.reduce((acc, p) => acc + p.value, 0) /
                          row.performanceHistory.length
                      )
                    : 80;
                return (
                  <strong style={{ color: 'var(--uos-brand-strong)' }}>
                    {score}
                  </strong>
                );
              }
            },
            {
              key: 'status',
              title: bi('Status', 'الحالة'),
              align: 'center',
              render: () => <BmBadge variant="active"><BilingualText value={bi('Active', 'نشط')} /></BmBadge>
            }
          ]}
          renderMobileCard={(row) => (
            <>
              <div className="bm-mobile-card-header">
                <BmAthleteCell
                  nameEn={row.nameEn}
                  nameAr={row.nameAr}
                  subtext={`ID: ${row.id}`}
                />
                <BmBadge variant="active"><BilingualText value={bi('Active', 'نشط')} /></BmBadge>
              </div>
              <div className="bm-mobile-card-grid-data">
                <div className="bm-mobile-card-grid-item">
                  <span className="bm-mobile-card-grid-label">
                    <BilingualText value={bi('Sport', 'الرياضة')} />
                  </span>
                  <span className="bm-mobile-card-grid-value" style={{ textTransform: 'capitalize' }}>
                    {row.sportId}
                  </span>
                </div>
                <div className="bm-mobile-card-grid-item">
                  <span className="bm-mobile-card-grid-label">
                    <BilingualText value={bi('Age', 'العمر')} />
                  </span>
                  <span className="bm-mobile-card-grid-value">
                    {row.age ? `${row.age} yrs` : '—'}
                  </span>
                </div>
                <div className="bm-mobile-card-grid-item">
                  <span className="bm-mobile-card-grid-label">
                    <BilingualText value={bi('Score', 'النتيجة')} />
                  </span>
                  <span className="bm-mobile-card-grid-value" style={{ color: 'var(--uos-brand-strong)' }}>
                    {row.performanceHistory.length > 0
                      ? Math.round(
                          row.performanceHistory.reduce((acc, p) => acc + p.value, 0) /
                            row.performanceHistory.length
                        )
                      : 80}{' '}
                    / 100
                  </span>
                </div>
                <div className="bm-mobile-card-grid-item">
                  <span className="bm-mobile-card-grid-label">
                    <BilingualText value={bi('Level', 'المستوى')} />
                  </span>
                  <span className="bm-mobile-card-grid-value">
                    <BilingualText value={row.level || bi('Foundation', 'تأسيسي')} />
                  </span>
                </div>
              </div>
            </>
          )}
        />
      )}

      {/* 4. KPIS */}
      {activeTab === 'kpis' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          <BmKpiCard
            icon={Trophy}
            label={bi('Official Sports Disciplines', 'الرياضات المعتمدة')}
            value="4"
            trend="up"
            trendDelta="+100%"
            note={bi('Football, Basketball, Swimming, Tennis', 'كرة القدم، السلة، السباحة، التنس')}
          />
          <BmKpiCard
            icon={Users}
            label={bi('Registered Athletes', 'اللاعبون المسجلون')}
            value={demoPlayers.length}
            trend="up"
            trendDelta="+12%"
            note={bi('Verified preview cohort', 'فئة تجريبية معتمدة')}
          />
          <BmKpiCard
            icon={Building2}
            label={bi('Active Regional Branches', 'الفروع الإقليمية النشطة')}
            value="4"
            trend="neutral"
            trendDelta="0%"
            note={bi('All branch facilities operational', 'جميع منشآت الفروع جاهزة')}
          />
          <BmKpiCard
            icon={CalendarDays}
            label={bi('Scheduled Weekly Sessions', 'الحصص التدريبية الأسبوعية')}
            value="24"
            trend="up"
            trendDelta="+8%"
            note={bi('Optimized field capacity', 'سعة ميدانية محسنة')}
          />
        </div>
      )}

      {/* 5. AUTH PREVIEW */}
      {activeTab === 'auth' && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0' }}>
          <div className="bm-login-card">
            <div className="bm-login-logo-lockup">
              <img
                src="/brand/united-olympics-sports-logo.png"
                alt="United Olympics Sports"
                className="bm-login-logo"
              />
              <h2 className="bm-login-title">
                United Olympics Sports
              </h2>
              <span lang="ar" dir="rtl" style={{ fontSize: 13, color: 'var(--uos-brand)', fontFamily: 'Cairo, sans-serif' }}>
                يونايتد أوليمبيكس سبورت
              </span>
              <p className="bm-login-subtitle">
                <BilingualText
                  value={bi(
                    'Athlete & Member Portal · Quiet Luxury Sign In',
                    'بوابة الرياضيين والأعضاء · تسجيل دخول فاخر وهادئ'
                  )}
                />
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <BmField
                labelEn="Athlete ID or Email"
                labelAr="رقم اللاعب أو البريد"
                icon={Mail}
                placeholder="athlete@unitedolympics.com"
              />
              <BmField
                labelEn="Security PIN / Password"
                labelAr="الرمز السري / كلمة المرور"
                icon={Lock}
                type="password"
                placeholder="••••••••"
              />

              <button type="submit" className="bm-btn-primary" style={{ height: 50, marginTop: 8 }}>
                <BilingualText value={bi('Sign In to Athlete Portal', 'دخول بوابة اللاعب')} />
              </button>
            </form>

            <div className="bm-sso-group">
              <button type="button" className="bm-sso-btn" disabled>
                <span>Google Workspace Single Sign-On</span>
              </button>
              <button type="button" className="bm-sso-btn" disabled>
                <span>Apple ID Single Sign-On</span>
              </button>
              <p className="bm-sso-disclaimer">
                <BilingualText
                  value={bi(
                    'Institutional federated access is configured through organization administrators only.',
                    'يتم إعداد الدخول المؤسسي الموحد من خلال مسؤولي المنظمة فقط.'
                  )}
                />
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
