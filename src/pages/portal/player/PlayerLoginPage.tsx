import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  User
} from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BmField } from '../../../components/benchmark/BenchmarkComponents';
import { BilingualText, bi } from '../../../components/bilingual/BilingualText';

export function PlayerLoginPage() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('player-demo-001');
  const [pin, setPin] = useState('••••••••');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError('Please enter your Athlete ID or registered email.');
      return;
    }
    setError(null);
    setLoading(true);

    // Realistic seamless authentication
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate('/player');
      }, 700);
    }, 800);
  };

  return (
    <div className="bm-login-viewport">
      {/* Ambient background glow */}
      <div className="bm-login-backdrop-glow" aria-hidden="true" />

      {/* Luxury Auth Card */}
      <div className="bm-login-card">
        {/* Brand Lockup */}
        <div className="bm-login-logo-lockup">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <img
              src="/brand/united-olympics-sports-logo.png"
              alt="United Olympics Sports | يونايتد أوليمبيكس سبورت"
              className="bm-login-logo"
            />
          </Link>
          <h1 className="bm-login-title">United Olympics Sports</h1>
          <span
            lang="ar"
            dir="rtl"
            style={{
              fontSize: 14,
              color: '#d8b35a',
              fontFamily: 'Cairo, sans-serif',
              fontWeight: 600,
              marginTop: 2
            }}
          >
            يونايتد أوليمبيكس سبورت
          </span>
          <p className="bm-login-subtitle">
            <BilingualText
              value={bi(
                'Athlete & Member Portal · Official Sign In',
                'بوابة الرياضيين والأعضاء · تسجيل الدخول الرسمي'
              )}
            />
          </p>
        </div>

        {error && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 16px',
              borderRadius: 12,
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#fca5a5',
              fontSize: 13,
              marginBottom: 16
            }}
          >
            <AlertCircle style={{ width: 16, height: 16, flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {success ? (
          <div style={{ textAlign: 'center', padding: '32px 16px' }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'rgba(94, 195, 155, 0.15)',
                border: '2px solid #5ec39b',
                display: 'grid',
                placeItems: 'center',
                margin: '0 auto 16px',
                color: '#5ec39b'
              }}
            >
              <CheckCircle2 style={{ width: 32, height: 32 }} />
            </div>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#fdfbf7' }}>
              <BilingualText value={bi('Welcome to Athlete Portal', 'مرحباً بك في بوابة اللاعب')} />
            </h3>
            <p style={{ margin: '8px 0 0', fontSize: 13, color: '#a7a9b0' }}>
              <BilingualText value={bi('Redirecting to your dashboard...', 'جارٍ التحويل إلى لوحة التحكم...')} />
            </p>
          </div>
        ) : (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <BmField
              labelEn="Athlete ID or Email"
              labelAr="رقم اللاعب أو البريد المسجل"
              icon={User}
              placeholder="e.g. player-demo-001"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              helper={bi('Use demo identifier: player-demo-001', 'استخدم المعرف التجريبي: player-demo-001')}
              required
            />

            <BmField
              labelEn="Security PIN / Access Code"
              labelAr="رمز الدخول السري"
              icon={Lock}
              type="password"
              placeholder="••••••••"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              helper={bi('Authorized athlete credential', 'بيانات اعتماد اللاعب المصرح بها')}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="bm-btn-primary"
              style={{
                width: '100%',
                height: 50,
                marginTop: 8,
                fontSize: 14,
                fontWeight: 700
              }}
            >
              {loading ? (
                <BilingualText value={bi('Authenticating...', 'جارٍ التحقق...')} />
              ) : (
                <>
                  <BilingualText value={bi('Sign In to Athlete Portal', 'دخول بوابة اللاعب')} />
                  <ArrowRight style={{ width: 16, height: 16 }} />
                </>
              )}
            </button>
          </form>
        )}

        {/* Federated Access Options */}
        <div className="bm-sso-group">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              margin: '16px 0 6px',
              color: '#6b7280',
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}
          >
            <div style={{ flex: 1, height: 1, background: 'rgba(255, 255, 255, 0.1)' }} />
            <span><BilingualText value={bi('Institutional Single Sign-On', 'الدخول المؤسسي الموحد')} /></span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255, 255, 255, 0.1)' }} />
          </div>

          <button type="button" className="bm-sso-btn" disabled>
            <svg style={{ width: 16, height: 16 }} viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
              />
              <path
                fill="#FBBC05"
                d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8 0-1.3.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 20.4 7.5 23 12 23z"
              />
            </svg>
            <span>Google Workspace Single Sign-On</span>
          </button>

          <button type="button" className="bm-sso-btn" disabled>
            <svg style={{ width: 16, height: 16, fill: 'currentColor' }} viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.64-.78 1.08-1.86.96-2.95-1 .04-2.16.66-2.82 1.44-.57.65-1.07 1.73-.94 2.8 1.11.09 2.2-.56 2.8-1.29z" />
            </svg>
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

        {/* Back to Public Home */}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Link
            to="/"
            style={{
              fontSize: 12,
              color: '#a7a9b0',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#d8b35a')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#a7a9b0')}
          >
            <BilingualText value={bi('← Return to Public Website', '← العودة للموقع العام')} />
          </Link>
        </div>
      </div>
    </div>
  );
}
