import type { LucideIcon } from 'lucide-react';
import {
  AlertCircle,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Minus,
  Search,
  SlidersHorizontal,
  UserRound
} from 'lucide-react';
import React, { useState } from 'react';
import type { BilingualText as BilingualValue } from '../../domain/contracts';
import { BilingualText, bi } from '../bilingual/BilingualText';

/* 1. GLASS CONTAINER */
export interface BmGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  level?: 1 | 2 | 3 | 4;
  className?: string;
  children: React.ReactNode;
}

export function BmGlass({ level = 1, className = '', children, ...props }: BmGlassProps) {
  return (
    <div className={`bm-glass-${level} ${className}`} {...props}>
      {children}
    </div>
  );
}

/* 2. FORM SECTION */
export function BmFormSection({
  title,
  icon: Icon,
  description,
  children
}: {
  title: BilingualValue;
  icon?: LucideIcon;
  description?: BilingualValue;
  children: React.ReactNode;
}) {
  return (
    <section className="bm-form-section">
      <div className="bm-form-section-head">
        <div>
          <h3 className="bm-form-section-title">
            {Icon && <Icon />}
            <BilingualText value={title} />
          </h3>
          {description && (
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--uos-text-muted)' }}>
              <BilingualText value={description} />
            </p>
          )}
        </div>
      </div>
      {children}
    </section>
  );
}

/* 3. STRUCTURED FIELD */
export interface BmFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelEn: string;
  labelAr: string;
  icon?: LucideIcon;
  helper?: BilingualValue;
  error?: string;
  isLoading?: boolean;
}

export function BmField({
  labelEn,
  labelAr,
  icon: Icon,
  helper,
  error,
  isLoading,
  disabled,
  className = '',
  id,
  ...props
}: BmFieldProps) {
  const fieldId = id || `bm-field-${labelEn.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className={`bm-field-wrap ${className}`}>
      <label htmlFor={fieldId} className="bm-field-label-row">
        <span className="bm-field-label-en">{labelEn}</span>
        <span className="bm-field-label-ar" dir="rtl">{labelAr}</span>
      </label>
      <div
        className={`bm-field-input-box ${error ? 'has-error' : ''} ${disabled ? 'disabled' : ''}`}
      >
        {Icon && <Icon className="bm-field-icon" />}
        <input
          id={fieldId}
          disabled={disabled || isLoading}
          className="bm-field-input"
          {...props}
        />
        {isLoading && <Loader2 className="bm-field-icon animate-spin" />}
      </div>
      {error && (
        <span className="bm-field-error">
          <AlertCircle style={{ width: 14, height: 14 }} />
          {error}
        </span>
      )}
      {!error && helper && (
        <span className="bm-field-helper">
          <BilingualText value={helper} />
        </span>
      )}
    </div>
  );
}

/* 4. STRUCTURED SELECT */
export interface BmSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  labelEn: string;
  labelAr: string;
  icon?: LucideIcon;
  helper?: BilingualValue;
  error?: string;
  options: Array<{ value: string; labelEn: string; labelAr: string }>;
}

export function BmSelect({
  labelEn,
  labelAr,
  icon: Icon,
  helper,
  error,
  options,
  disabled,
  className = '',
  id,
  ...props
}: BmSelectProps) {
  const fieldId = id || `bm-select-${labelEn.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className={`bm-field-wrap ${className}`}>
      <label htmlFor={fieldId} className="bm-field-label-row">
        <span className="bm-field-label-en">{labelEn}</span>
        <span className="bm-field-label-ar" dir="rtl">{labelAr}</span>
      </label>
      <div
        className={`bm-field-input-box ${error ? 'has-error' : ''} ${disabled ? 'disabled' : ''}`}
      >
        {Icon && <Icon className="bm-field-icon" />}
        <select id={fieldId} disabled={disabled} className="bm-field-select" {...props}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.labelEn} · {opt.labelAr}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <span className="bm-field-error">
          <AlertCircle style={{ width: 14, height: 14 }} />
          {error}
        </span>
      )}
      {!error && helper && (
        <span className="bm-field-helper">
          <BilingualText value={helper} />
        </span>
      )}
    </div>
  );
}

/* 5. STATUS BADGE */
export function BmBadge({
  variant = 'active',
  children,
  className = ''
}: {
  variant?: 'active' | 'inactive' | 'gold';
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`bm-badge ${variant} ${className}`}>
      <span className="bm-badge-dot" />
      {children}
    </span>
  );
}

/* 6. KPI CARD */
export function BmKpiCard({
  icon: Icon,
  value,
  label,
  trend,
  trendDelta,
  note
}: {
  icon: LucideIcon;
  value: string | number;
  label: BilingualValue;
  trend?: 'up' | 'down' | 'neutral';
  trendDelta?: string;
  note?: BilingualValue;
}) {
  return (
    <BmGlass level={2} className="bm-kpi-card">
      <div className="bm-kpi-head">
        <div className="bm-kpi-icon">
          <Icon />
        </div>
        {trend && (
          <span className={`bm-kpi-trend ${trend}`}>
            {trend === 'up' && <ArrowUpRight style={{ width: 14, height: 14 }} />}
            {trend === 'down' && <ArrowDownRight style={{ width: 14, height: 14 }} />}
            {trend === 'neutral' && <Minus style={{ width: 14, height: 14 }} />}
            {trendDelta}
          </span>
        )}
      </div>
      <div>
        <div className="bm-kpi-value-row">
          <span className="bm-kpi-value">{value}</span>
        </div>
        <span className="bm-kpi-label">
          <BilingualText value={label} />
        </span>
        {note && (
          <p style={{ margin: '4px 0 0', fontSize: '11px', color: 'var(--uos-text-muted)' }}>
            <BilingualText value={note} />
          </p>
        )}
      </div>
    </BmGlass>
  );
}

/* 7. ATHLETE CELL */
export function BmAthleteCell({
  photoUrl,
  nameEn,
  nameAr,
  subtext,
  badge
}: {
  photoUrl?: string;
  nameEn: string;
  nameAr: string;
  subtext?: string;
  badge?: React.ReactNode;
}) {
  const initials = nameEn
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="bm-athlete-cell">
      <div className="bm-athlete-avatar">
        {photoUrl ? (
          <img src={photoUrl} alt={nameEn} />
        ) : (
          <span>{initials || <UserRound style={{ width: 18, height: 18 }} />}</span>
        )}
      </div>
      <div className="bm-athlete-info">
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className="bm-athlete-name">{nameEn}</span>
          <span
            lang="ar"
            dir="rtl"
            style={{ fontSize: 12, color: 'var(--uos-brand)', fontFamily: 'Cairo, sans-serif' }}
          >
            {nameAr}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {subtext && <span className="bm-athlete-sub">{subtext}</span>}
          {badge}
        </div>
      </div>
    </div>
  );
}

/* 8. FLAGSHIP DATA TABLE */
export interface BmColumn<T> {
  key: string;
  title: BilingualValue;
  render?: (row: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
}

export interface BmDataTableProps<T> {
  columns: BmColumn<T>[];
  data: T[];
  keyField: keyof T | ((row: T) => string);
  searchPlaceholder?: string;
  onSearch?: (term: string) => void;
  filters?: React.ReactNode;
  actions?: React.ReactNode;
  renderMobileCard: (row: T) => React.ReactNode;
  emptyTitle?: BilingualValue;
  emptyDescription?: BilingualValue;
  pageSize?: number;
}

export function BmDataTable<T>({
  columns,
  data,
  keyField,
  searchPlaceholder = 'Search records... | البحث في السجلات...',
  onSearch,
  filters,
  actions,
  renderMobileCard,
  emptyTitle = bi('No records found', 'لم يتم العثور على سجلات'),
  emptyDescription = bi('Try adjusting your search query or filters.', 'جرّب تعديل مصطلح البحث أو الفلاتر.'),
  pageSize = 10
}: BmDataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    setCurrentPage(1);
    onSearch?.(term);
  };

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = data.slice(startIndex, startIndex + pageSize);

  const getKey = (row: T, index: number): string => {
    if (typeof keyField === 'function') return keyField(row);
    return String(row[keyField] ?? index);
  };

  return (
    <div className="bm-table-shell">
      {/* Toolbar */}
      <div className="bm-table-toolbar">
        <div className="bm-table-search">
          <Search style={{ width: 16, height: 16, color: 'var(--uos-brand)', flexShrink: 0 }} />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder={searchPlaceholder}
          />
        </div>
        <div className="bm-table-filters">
          {filters}
          {actions}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="bm-table-container">
        {data.length === 0 ? (
          <div style={{ padding: '48px 24px', textAlign: 'center' }}>
            <SlidersHorizontal style={{ width: 36, height: 36, margin: '0 auto 12px', color: 'var(--uos-brand)' }} />
            <h4 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: 'var(--uos-text-primary)' }}>
              <BilingualText value={emptyTitle} />
            </h4>
            <p style={{ fontSize: 13, color: 'var(--uos-text-muted)', margin: '6px 0 0' }}>
              <BilingualText value={emptyDescription} />
            </p>
          </div>
        ) : (
          <table className="bm-table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    style={{ textAlign: col.align || 'left', cursor: col.sortable ? 'pointer' : 'default' }}
                    onClick={() => {
                      if (col.sortable) {
                        if (sortCol === col.key) setSortAsc(!sortAsc);
                        else {
                          setSortCol(col.key);
                          setSortAsc(true);
                        }
                      }
                    }}
                  >
                    <BilingualText value={col.title} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData.map((row, idx) => (
                <tr key={getKey(row, idx)}>
                  {columns.map((col) => (
                    <td key={col.key} style={{ textAlign: col.align || 'left' }}>
                      {col.render ? col.render(row) : String((row as any)[col.key] ?? '—')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Mobile Card View (shown below 768px via media query) */}
      <div className="bm-mobile-card-grid">
        {data.length === 0 ? (
          <div style={{ padding: '36px 16px', textAlign: 'center' }}>
            <h4 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>
              <BilingualText value={emptyTitle} />
            </h4>
            <p style={{ fontSize: 12, color: 'var(--uos-text-muted)', margin: '4px 0 0' }}>
              <BilingualText value={emptyDescription} />
            </p>
          </div>
        ) : (
          currentData.map((row, idx) => (
            <div key={getKey(row, idx)} className="bm-mobile-card">
              {renderMobileCard(row)}
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {data.length > pageSize && (
        <div className="bm-table-pagination">
          <span>
            <BilingualText
              value={bi(
                `Showing ${startIndex + 1} to ${Math.min(startIndex + pageSize, data.length)} of ${data.length} records`,
                `عرض ${startIndex + 1} إلى ${Math.min(startIndex + pageSize, data.length)} من إجمالي ${data.length} سجل`
              )}
            />
          </span>
          <div className="bm-table-pagination-btns">
            <button
              className="bm-page-btn"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              aria-label="Previous Page | الصفحة السابقة"
            >
              <ChevronLeft style={{ width: 14, height: 14 }} />
            </button>
            <span style={{ fontSize: 12, fontWeight: 600, padding: '0 8px' }}>
              {currentPage} / {totalPages}
            </span>
            <button
              className="bm-page-btn"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              aria-label="Next Page | الصفحة التالية"
            >
              <ChevronRight style={{ width: 14, height: 14 }} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* 9. PAGE HEADER */
export function BmPageHeader({
  eyebrow,
  title,
  description,
  actions,
  icon: Icon
}: {
  eyebrow: BilingualValue;
  title: BilingualValue;
  description: BilingualValue;
  actions?: React.ReactNode;
  icon?: LucideIcon;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 20,
        marginBottom: 28,
        flexWrap: 'wrap'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, maxWidth: 820 }}>
        {Icon && (
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 'var(--uos-radius-sm)',
              background: 'color-mix(in srgb, var(--uos-brand) 15%, transparent)',
              border: '1px solid color-mix(in srgb, var(--uos-brand) 30%, transparent)',
              color: 'var(--uos-brand)',
              display: 'grid',
              placeItems: 'center',
              flexShrink: 0
            }}
          >
            <Icon style={{ width: 24, height: 24 }} />
          </div>
        )}
        <div>
          <span
            style={{
              display: 'inline-block',
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--uos-brand)',
              marginBottom: 4
            }}
          >
            <BilingualText value={eyebrow} />
          </span>
          <h1
            style={{
              fontSize: 'clamp(24px, 3.5vw, 34px)',
              fontWeight: 800,
              lineHeight: 1.15,
              margin: '0 0 8px',
              color: 'var(--uos-text-primary)'
            }}
          >
            <BilingualText value={title} />
          </h1>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--uos-text-muted)', lineHeight: 1.5 }}>
            <BilingualText value={description} />
          </p>
        </div>
      </div>
      {actions && <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>{actions}</div>}
    </div>
  );
}
