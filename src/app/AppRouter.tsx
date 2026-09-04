import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminLayout } from '../layouts/AdminLayout';
import { PlayerPortalRouter } from '../portals/PlayerPortalRouter';
import { ParentPortalRouter } from '../portals/ParentPortalRouter';
import { CoachPortalRouter } from '../portals/CoachPortalRouter';
import { PublicSite } from '../pages/public/PublicSite';
import { PlayerLoginPage } from '../pages/portal/player/PlayerLoginPage';
import { BenchmarkShowcasePage } from '../pages/benchmark/BenchmarkShowcasePage';
import { AuthenticationShell } from '../components/auth/AuthenticationShell';
import { UnitedAssistantDrawer } from '../components/assistant/UnitedAssistantDrawer';
import { ApplicationUpdateNotifier } from '../components/common/ApplicationUpdateNotifier';

export function AppRouter() {
  return (
    <BrowserRouter>
      <ApplicationUpdateNotifier />
      <Routes>
        <Route path="/auth" element={<AuthenticationShell />} />
        <Route path="/login" element={<AuthenticationShell />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/player/login" element={<PlayerLoginPage />} />
        <Route path="/player/*" element={<PlayerPortalRouter />} />
        <Route path="/parent/*" element={<ParentPortalRouter />} />
        <Route path="/coach/*" element={<CoachPortalRouter />} />
        <Route path="/benchmark/*" element={<BenchmarkShowcasePage />} />
        <Route path="*" element={<PublicSite />} />
      </Routes>
      <UnitedAssistantDrawer />
    </BrowserRouter>
  );
}
