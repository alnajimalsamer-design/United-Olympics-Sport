import { Activity, Award, CalendarDays, CheckCircle2, FileText, ShieldCheck, TrendingUp, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../../components/admin/AdminUI';
import { BilingualText, bi } from '../../../components/bilingual/BilingualText';
import { demoPlayers } from '../../../data/demo/players';
import { getGroup, getSport } from '../../../data/demo/selectors';

export function PlayerPortalOverviewPage() {
  const player = demoPlayers[0];
  const sport = getSport(player.sportId);
  const group = getGroup(player.groupId);
  const attendance = player.attendanceSummary;
  const attendancePct = attendance && attendance.scheduled > 0
    ? Math.round((attendance.attended / attendance.scheduled) * 100)
    : 0;

  return (
    <div className="admin-page">
      <PageHeader
        eyebrow={bi('Player Portal', 'بوابة اللاعب')}
        title={bi('Overview', 'نظرة عامة')}
        description={bi('A focused athlete workspace using anonymized preview records only.', 'مساحة مركزة للاعب تستخدم سجلات تجريبية مجهولة فقط.')}
      />

      <section className="portal-overview-hero">
        <article className="portal-overview-primary">
          <span><ShieldCheck /></span>
          <div>
            <h2>{player.nameEn}<span lang="ar" dir="rtl"> · {player.nameAr}</span></h2>
            <p><BilingualText value={bi('Your sport, group and development tools remain connected in one calm view.', 'تظل رياضتك ومجموعتك وأدوات تطورك مترابطة في واجهة واحدة هادئة.')} /></p>
          </div>
        </article>
        <article className="portal-overview-score">
          <small><BilingualText value={bi('Attendance Preview', 'معاينة الحضور')} /></small>
          <strong>{attendance ? `${attendance.attended}/${attendance.scheduled}` : '—'}</strong>
          {attendance && attendance.scheduled > 0 && (
            <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ flex: 1, height: 6, borderRadius: 99, background: 'color-mix(in srgb, var(--color-border) 40%, transparent)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${attendancePct}%`, borderRadius: 99, background: 'linear-gradient(90deg, var(--color-brand), var(--color-brand-strong))', transition: 'width 600ms ease' }} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-brand-strong)' }}>{attendancePct}%</span>
            </div>
          )}
          <BilingualText value={sport?.name ?? bi('Sport Preview', 'معاينة الرياضة')} />
        </article>
      </section>

      <section className="portal-action-grid">
        <Link to="/player/schedule">
          <CalendarDays />
          <BilingualText value={bi('My Schedule', 'جدولي')} />
          <small><BilingualText value={bi('Open training timeline', 'فتح الخط الزمني للتدريب')} /></small>
        </Link>
        <Link to="/player/performance">
          <Activity />
          <BilingualText value={bi('Performance', 'الأداء')} />
          <small><BilingualText value={bi('Review sport-aware metrics', 'مراجعة مؤشرات الرياضة')} /></small>
        </Link>
        <Link to="/player/achievements">
          <Award />
          <BilingualText value={bi('Achievements', 'الإنجازات')} />
          <small><BilingualText value={bi('Truthful empty state ready', 'حالة فارغة صادقة وجاهزة')} /></small>
        </Link>
      </section>

      <section className="portal-overview-list">
        <header>
          <BilingualText value={bi('Training Context', 'سياق التدريب')} />
          <Sparkles />
        </header>
        <div>
          <article>
            <strong><BilingualText value={bi('Current Group', 'المجموعة الحالية')} /></strong>
            <small><BilingualText value={group?.name ?? bi('Not linked', 'غير مرتبطة')} /></small>
          </article>
          <article>
            <strong><BilingualText value={bi('Documents', 'المستندات')} /></strong>
            <small><BilingualText value={bi('No verified documents yet', 'لا توجد مستندات موثقة بعد')} /></small>
          </article>
        </div>
        <Link className="admin-link-button" to="/player/documents">
          <FileText />
          <BilingualText value={bi('Open Documents', 'فتح المستندات')} />
        </Link>
      </section>
    </div>
  );
}
