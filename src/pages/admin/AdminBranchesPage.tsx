import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Flag,
  Globe,
  MapPin,
  Plus,
  Search,
  ShieldCheck,
  Trophy,
  Users,
  X
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BmBadge,
  BmDataTable,
  BmField,
  BmFormSection,
  BmGlass,
  BmPageHeader,
  BmSelect
} from '../../components/benchmark/BenchmarkComponents';
import { BilingualText, bi } from '../../components/bilingual/BilingualText';
import { AdminOperationsTable, BranchRecord } from '../../components/admin/AdminOperationsTable';
import { demoBranches, demoCountries } from '../../data/demo/business';
import type { Branch } from '../../domain/contracts';

export function AdminBranchesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [newBranchNameEn, setNewBranchNameEn] = useState('');
  const [newBranchNameAr, setNewBranchNameAr] = useState('');
  const [newBranchCode, setNewBranchCode] = useState('');
  const [newBranchAddressEn, setNewBranchAddressEn] = useState('');
  const [newBranchAddressAr, setNewBranchAddressAr] = useState('');
  const [newBranchCountry, setNewBranchCountry] = useState(demoCountries[0]?.id ?? '');
  const [formSaved, setFormSaved] = useState(false);
  const [viewMode, setViewMode] = useState<'desk' | 'records'>('desk');

  const filteredBranches = useMemo(() => {
    return demoBranches.filter((branch) => {
      const query = searchTerm.toLowerCase();
      const matchesSearch =
        branch.name.en.toLowerCase().includes(query) ||
        branch.name.ar.toLowerCase().includes(query) ||
        branch.id.toLowerCase().includes(query);

      const matchesStatus = statusFilter === 'all' || branch.status === statusFilter;
      const matchesCountry = countryFilter === 'all' || branch.countryId === countryFilter;

      return matchesSearch && matchesStatus && matchesCountry;
    });
  }, [searchTerm, statusFilter, countryFilter]);

  const handleCreateBranch = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSaved(true);
    setTimeout(() => {
      setFormSaved(false);
      setShowAddModal(false);
      setNewBranchNameEn('');
      setNewBranchNameAr('');
      setNewBranchCode('');
    }, 1200);
  };

  return (
    <div className="admin-page" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <BmPageHeader
        icon={Building2}
        eyebrow={bi('Regional Infrastructure', 'البنية التحتية الإقليمية')}
        title={bi('Branch Operations Cockpit', 'مركز عمليات الفروع')}
        description={bi(
          'Centralized multi-facility management covering sports allocation, coaching staff, and athlete capacities.',
          'إدارة مركزية متعددة المنشآت تغطي تخصيص الرياضات والكوادر الفنية واستيعاب اللاعبين.'
        )}
        actions={
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', borderRadius: 8, background: 'var(--uos-surface-1)', border: '1px solid var(--uos-border)', padding: 2 }}>
              <button
                type="button"
                onClick={() => setViewMode('desk')}
                style={{
                  padding: '6px 14px',
                  borderRadius: 6,
                  border: 'none',
                  background: viewMode === 'desk' ? 'var(--uos-brand)' : 'transparent',
                  color: viewMode === 'desk' ? '#05070a' : 'var(--uos-text-secondary)',
                  fontWeight: 700,
                  fontSize: 12,
                  cursor: 'pointer'
                }}
              >
                Operations Desk
              </button>
              <button
                type="button"
                onClick={() => setViewMode('records')}
                style={{
                  padding: '6px 14px',
                  borderRadius: 6,
                  border: 'none',
                  background: viewMode === 'records' ? 'var(--uos-brand)' : 'transparent',
                  color: viewMode === 'records' ? '#05070a' : 'var(--uos-text-secondary)',
                  fontWeight: 700,
                  fontSize: 12,
                  cursor: 'pointer'
                }}
              >
                Detail Records
              </button>
            </div>
            <button
              type="button"
              className="bm-btn-primary"
              onClick={() => setShowAddModal(true)}
            >
              <Plus style={{ width: 16, height: 16 }} />
              <BilingualText value={bi('Add Regional Branch', 'إضافة فرع إقليمي')} />
            </button>
          </div>
        }
      />

      {viewMode === 'desk' && (
        <div style={{ marginBottom: 16 }}>
          <AdminOperationsTable
            branches={filteredBranches.map((b) => ({
              id: b.id,
              nameEn: b.name.en,
              nameAr: b.name.ar,
              capacity: b.playerIds.length ? b.playerIds.length * 5 : 250,
              activeCoaches: b.coachIds.length,
              status: b.status === 'active' ? 'active' : 'maintenance'
            }))}
          />
        </div>
      )}

      {/* Flagship Data Table */}
      <BmDataTable<Branch>
        data={filteredBranches}
        keyField="id"
        searchPlaceholder="Search branches by name or ID... | البحث عن الفروع بالاسم أو الرمز..."
        onSearch={setSearchTerm}
        filters={
          <>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bm-table-filter-select"
            >
              <option value="all">All Statuses · كل الحالات</option>
              <option value="active">Active · نشط</option>
              <option value="inactive">Inactive · غير نشط</option>
            </select>
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="bm-table-filter-select"
            >
              <option value="all">All Territories · كافة المناطق</option>
              {demoCountries.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name.en} · {c.name.ar}
                </option>
              ))}
            </select>
          </>
        }
        columns={[
          {
            key: 'branch',
            title: bi('Branch Facility', 'منشأة الفرع'),
            render: (branch) => (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 'var(--uos-radius-sm)',
                    background: 'color-mix(in srgb, var(--uos-brand) 12%, transparent)',
                    border: '1px solid color-mix(in srgb, var(--uos-brand) 25%, transparent)',
                    display: 'grid',
                    placeItems: 'center',
                    color: 'var(--uos-brand)',
                    flexShrink: 0
                  }}
                >
                  <Building2 style={{ width: 20, height: 20 }} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--uos-text-primary)' }}>
                    <BilingualText value={branch.name} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                    <code style={{ fontSize: 11, color: 'var(--uos-text-muted)' }}>{branch.id}</code>
                  </div>
                </div>
              </div>
            )
          },
          {
            key: 'territory',
            title: bi('Territory / Country', 'المنطقة / الدولة'),
            render: (branch) => {
              const country = demoCountries.find((c) => c.id === branch.countryId);
              return (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
                  <Flag style={{ width: 14, height: 14, color: 'var(--uos-brand)' }} />
                  <span>{country ? <BilingualText value={country.name} /> : branch.countryId}</span>
                </div>
              );
            }
          },
          {
            key: 'sports',
            title: bi('Sports', 'الرياضات'),
            align: 'center',
            render: (branch) => (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  fontWeight: 600,
                  fontSize: 13
                }}
              >
                <Trophy style={{ width: 14, height: 14, color: 'var(--uos-brand)' }} />
                {branch.sportIds.length}
              </span>
            )
          },
          {
            key: 'staff',
            title: bi('Staff & Coaches', 'الكادر والمدربون'),
            align: 'center',
            render: (branch) => (
              <span style={{ fontWeight: 600, fontSize: 13 }}>
                {branch.coachIds.length}
              </span>
            )
          },
          {
            key: 'athletes',
            title: bi('Athletes', 'اللاعبون'),
            align: 'center',
            render: (branch) => (
              <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--uos-brand-strong)' }}>
                {branch.playerIds.length}
              </span>
            )
          },
          {
            key: 'status',
            title: bi('Status', 'الحالة'),
            align: 'center',
            render: (branch) => (
              <BmBadge variant={branch.status === 'active' ? 'active' : 'inactive'}>
                <BilingualText
                  value={branch.status === 'active' ? bi('Active', 'نشط') : bi('Inactive', 'غير نشط')}
                />
              </BmBadge>
            )
          },
          {
            key: 'actions',
            title: bi('Actions', 'الإجراءات'),
            align: 'right',
            render: (branch) => (
              <Link
                to={`/admin/branches/${branch.id}`}
                className="bm-btn-secondary"
                style={{ height: 34, padding: '0 12px', fontSize: 12 }}
              >
                <BilingualText value={bi('Cockpit', 'مركز التحكم')} />
                <ArrowRight style={{ width: 12, height: 12 }} />
              </Link>
            )
          }
        ]}
        renderMobileCard={(branch) => {
          const country = demoCountries.find((c) => c.id === branch.countryId);
          return (
            <>
              <div className="bm-mobile-card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Building2 style={{ width: 20, height: 20, color: 'var(--uos-brand)' }} />
                  <div>
                    <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>
                      <BilingualText value={branch.name} />
                    </h4>
                    <code style={{ fontSize: 11, color: 'var(--uos-text-muted)' }}>{branch.id}</code>
                  </div>
                </div>
                <BmBadge variant={branch.status === 'active' ? 'active' : 'inactive'}>
                  <BilingualText
                    value={branch.status === 'active' ? bi('Active', 'نشط') : bi('Inactive', 'غير نشط')}
                  />
                </BmBadge>
              </div>

              <div className="bm-mobile-card-grid-data">
                <div className="bm-mobile-card-grid-item">
                  <span className="bm-mobile-card-grid-label">
                    <BilingualText value={bi('Territory', 'المنطقة')} />
                  </span>
                  <span className="bm-mobile-card-grid-value">
                    {country ? <BilingualText value={country.name} /> : branch.countryId}
                  </span>
                </div>
                <div className="bm-mobile-card-grid-item">
                  <span className="bm-mobile-card-grid-label">
                    <BilingualText value={bi('Sports', 'الرياضات')} />
                  </span>
                  <span className="bm-mobile-card-grid-value">{branch.sportIds.length}</span>
                </div>
                <div className="bm-mobile-card-grid-item">
                  <span className="bm-mobile-card-grid-label">
                    <BilingualText value={bi('Coaches', 'المدربون')} />
                  </span>
                  <span className="bm-mobile-card-grid-value">{branch.coachIds.length}</span>
                </div>
                <div className="bm-mobile-card-grid-item">
                  <span className="bm-mobile-card-grid-label">
                    <BilingualText value={bi('Athletes', 'اللاعبون')} />
                  </span>
                  <span className="bm-mobile-card-grid-value" style={{ color: 'var(--uos-brand-strong)' }}>
                    {branch.playerIds.length}
                  </span>
                </div>
              </div>

              <Link
                to={`/admin/branches/${branch.id}`}
                className="bm-btn-secondary"
                style={{ width: '100%', justifyContent: 'center', height: 40 }}
              >
                <BilingualText value={bi('Open Branch Cockpit', 'فتح مركز تحكم الفرع')} />
                <ArrowRight style={{ width: 14, height: 14 }} />
              </Link>
            </>
          );
        }}
      />

      {/* Real Admin Form Modal: Add Regional Branch */}
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
                  <Building2 style={{ width: 22, height: 22 }} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: 'var(--uos-text-primary)' }}>
                    <BilingualText value={bi('Add Regional Branch Facility', 'إضافة منشأة فرع إقليمي')} />
                  </h3>
                  <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--uos-text-muted)' }}>
                    <BilingualText
                      value={bi(
                        'Configure territorial facility metadata and operational baseline.',
                        'تكوين بيانات المنشأة الإقليمية والأساس التشغيلي.'
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
                  <BilingualText value={bi('Branch Registered in Preview', 'تم تسجيل الفرع في بيئة المعاينة')} />
                </h4>
                <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--uos-text-muted)' }}>
                  <BilingualText
                    value={bi(
                      'The branch metadata has been successfully captured in local operational state.',
                      'تم حفظ بيانات الفرع بنجاح في حالة التشغيل المحلية.'
                    )}
                  />
                </p>
              </div>
            ) : (
              <form onSubmit={handleCreateBranch}>
                <BmFormSection
                  title={bi('Facility Identification', 'بيانات تعريف المنشأة')}
                  icon={Building2}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                    <BmField
                      labelEn="Branch Name (English)"
                      labelAr="اسم الفرع (بالإنجليزية)"
                      icon={Building2}
                      placeholder="e.g. Dubai Central Sports Complex"
                      value={newBranchNameEn}
                      onChange={(e) => setNewBranchNameEn(e.target.value)}
                      required
                    />
                    <BmField
                      labelEn="Branch Name (Arabic)"
                      labelAr="اسم الفرع (بالعربية)"
                      icon={Building2}
                      placeholder="مثال: مجمع دبي الرياضي المركزي"
                      dir="rtl"
                      value={newBranchNameAr}
                      onChange={(e) => setNewBranchNameAr(e.target.value)}
                      required
                    />
                    <BmField
                      labelEn="Facility Identifier / Code"
                      labelAr="معرف المنشأة / الرمز"
                      placeholder="branch-ae-dxb-01"
                      value={newBranchCode}
                      onChange={(e) => setNewBranchCode(e.target.value)}
                      helper={bi('Unique system reference code', 'رمز مرجعي فريد للنظام')}
                      required
                    />
                    <BmSelect
                      labelEn="Regional Territory / Country"
                      labelAr="المنطقة الإقليمية / الدولة"
                      icon={Globe}
                      value={newBranchCountry}
                      onChange={(e) => setNewBranchCountry(e.target.value)}
                      options={demoCountries.map((c) => ({
                        value: c.id,
                        labelEn: c.name.en,
                        labelAr: c.name.ar
                      }))}
                    />
                  </div>
                </BmFormSection>

                <BmFormSection
                  title={bi('Location & Physical Address', 'الموقع والعنوان الجغرافي')}
                  icon={MapPin}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                    <BmField
                      labelEn="Street Address (English)"
                      labelAr="العنوان (بالإنجليزية)"
                      icon={MapPin}
                      placeholder="e.g. Sports City Boulevard, Sector 4"
                      value={newBranchAddressEn}
                      onChange={(e) => setNewBranchAddressEn(e.target.value)}
                    />
                    <BmField
                      labelEn="Street Address (Arabic)"
                      labelAr="العنوان (بالعربية)"
                      icon={MapPin}
                      placeholder="مثال: شارع المدينة الرياضية، القطاع 4"
                      dir="rtl"
                      value={newBranchAddressAr}
                      onChange={(e) => setNewBranchAddressAr(e.target.value)}
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
                    <BilingualText value={bi('Confirm & Register Branch', 'تأكيد وتسجيل الفرع')} />
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
