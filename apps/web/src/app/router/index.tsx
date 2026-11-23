import { Suspense, lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthLayout } from "@/layouts/auth-layout";
import { MainLayout } from "@/layouts/main-layout";
import { BlankLayout } from "@/layouts/blank-layout";
import { AdminLayout } from "@/layouts/admin-layout";
import { DeskLayout } from "@/layouts/desk-layout";
import { ProtectedRoute } from "./protected-route";

const LoginPage = lazy(() => import("@/features/auth/pages/login-page").then((m) => ({ default: m.LoginPage })));
const RegisterPage = lazy(() =>
  import("@/features/auth/pages/register-page").then((m) => ({ default: m.RegisterPage }))
);
const ForgotPasswordPage = lazy(() =>
  import("@/features/auth/pages/forgot-password-page").then((m) => ({ default: m.ForgotPasswordPage }))
);
const HomePage = lazy(() => import("@/features/home/pages/home-page").then((m) => ({ default: m.HomePage })));
const DocumentsPage = lazy(() =>
  import("@/features/documents/pages/documents-page").then((m) => ({ default: m.DocumentsPage }))
);
const ContractPage = lazy(() =>
  import("@/features/contract/pages/contract-page").then((m) => ({ default: m.ContractPage }))
);
const WorkLogPage = lazy(() =>
  import("@/features/work-log/pages/work-log-page").then((m) => ({ default: m.WorkLogPage }))
);
const PayguardPage = lazy(() =>
  import("@/features/payguard/pages/payguard-page").then((m) => ({ default: m.PayguardPage }))
);
const SalaryTwinPage = lazy(() =>
  import("@/features/salary-twin/pages/salary-twin-page").then((m) => ({ default: m.SalaryTwinPage }))
);
const CostLedgerPage = lazy(() =>
  import("@/features/cost-ledger/pages/cost-ledger-page").then((m) => ({ default: m.CostLedgerPage }))
);
const DebtFamilyPage = lazy(() =>
  import("@/features/debt-family/pages/debt-family-page").then((m) => ({ default: m.DebtFamilyPage }))
);
const EvidencePage = lazy(() =>
  import("@/features/evidence/pages/evidence-page").then((m) => ({ default: m.EvidencePage }))
);
const RightsAgentPage = lazy(() =>
  import("@/features/rights-agent/pages/rights-agent-page").then((m) => ({ default: m.RightsAgentPage }))
);
const CasePackPage = lazy(() =>
  import("@/features/case-pack/pages/case-pack-page").then((m) => ({ default: m.CasePackPage }))
);
const LegalCompassPage = lazy(() =>
  import("@/features/legal-compass/pages/legal-compass-page").then((m) => ({ default: m.LegalCompassPage }))
);
const NotificationsPage = lazy(() =>
  import("@/features/notifications/pages/notifications-page").then((m) => ({ default: m.NotificationsPage }))
);
const PlanPage = lazy(() => import("@/features/plan/pages/plan-page").then((m) => ({ default: m.PlanPage })));
const SettingsPage = lazy(() =>
  import("@/features/settings/pages/settings-page").then((m) => ({ default: m.SettingsPage }))
);
const ComponentShowcasePage = lazy(() =>
  import("@/features/dashboard/pages/component-showcase-page").then((m) => ({
    default: m.ComponentShowcasePage,
  }))
);
const NotFoundPage = lazy(() =>
  import("@/features/dashboard/pages/not-found-page").then((m) => ({ default: m.NotFoundPage }))
);
const AdminOverviewPage = lazy(() =>
  import("@/features/admin/pages/admin-overview-page").then((m) => ({ default: m.AdminOverviewPage }))
);
const AdminLawPackPage = lazy(() =>
  import("@/features/admin/pages/admin-lawpack-page").then((m) => ({ default: m.AdminLawPackPage }))
);
const AdminSettingsPage = lazy(() =>
  import("@/features/admin/pages/admin-settings-page").then((m) => ({ default: m.AdminSettingsPage }))
);
const DeskListPage = lazy(() =>
  import("@/features/desk/pages/desk-list-page").then((m) => ({ default: m.DeskListPage }))
);
const DeskCaseDetailPage = lazy(() =>
  import("@/features/desk/pages/desk-case-detail-page").then((m) => ({ default: m.DeskCaseDetailPage }))
);
const DeskNotificationsPage = lazy(() =>
  import("@/features/desk/pages/desk-notifications-page").then((m) => ({ default: m.DeskNotificationsPage }))
);
const DeskSettingsPage = lazy(() =>
  import("@/features/desk/pages/desk-settings-page").then((m) => ({ default: m.DeskSettingsPage }))
);
const DeskActivatePage = lazy(() =>
  import("@/features/desk/pages/desk-activate-page").then((m) => ({ default: m.DeskActivatePage }))
);
const AdminCanhLuatPage = lazy(() =>
  import("@/features/admin/pages/admin-canh-luat-page").then((m) => ({ default: m.AdminCanhLuatPage }))
);
const AdminOrganizationsPage = lazy(() =>
  import("@/features/admin/pages/admin-organizations-page").then((m) => ({ default: m.AdminOrganizationsPage }))
);
const AdminAdminsPage = lazy(() =>
  import("@/features/admin/pages/admin-admins-page").then((m) => ({ default: m.AdminAdminsPage }))
);
const AdminAuditLogPage = lazy(() =>
  import("@/features/admin/pages/admin-audit-log-page").then((m) => ({ default: m.AdminAuditLogPage }))
);
const AdminMonitoringPage = lazy(() =>
  import("@/features/admin/pages/admin-monitoring-page").then((m) => ({ default: m.AdminMonitoringPage }))
);
const CalendarPage = lazy(() =>
  import("@/features/calendar/pages/calendar-page").then((m) => ({ default: m.CalendarPage }))
);
const AgentAssistantPage = lazy(() =>
  import("@/features/agent/pages/agent-assistant-page").then((m) => ({ default: m.AgentAssistantPage }))
);

function withSuspense(node: React.ReactNode) {
  return <Suspense fallback={null}>{node}</Suspense>;
}

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: withSuspense(<LoginPage />) },
      { path: "/register", element: withSuspense(<RegisterPage />) },
      { path: "/forgot-password", element: withSuspense(<ForgotPasswordPage />) },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: "/home", element: withSuspense(<HomePage />) },
          { path: "/calendar", element: withSuspense(<CalendarPage />) },
          { path: "/documents", element: withSuspense(<DocumentsPage />) },
          { path: "/contract", element: withSuspense(<ContractPage />) },
          { path: "/work-log", element: withSuspense(<WorkLogPage />) },
          { path: "/payguard", element: withSuspense(<PayguardPage />) },
          { path: "/salary-twin", element: withSuspense(<SalaryTwinPage />) },
          { path: "/cost-ledger", element: withSuspense(<CostLedgerPage />) },
          { path: "/debt-family", element: withSuspense(<DebtFamilyPage />) },
          { path: "/evidence", element: withSuspense(<EvidencePage />) },
          { path: "/rights-agent", element: withSuspense(<RightsAgentPage />) },
          { path: "/case-pack", element: withSuspense(<CasePackPage />) },
          { path: "/agent", element: withSuspense(<AgentAssistantPage />) },
          { path: "/legal-compass", element: withSuspense(<LegalCompassPage />) },
          { path: "/notifications", element: withSuspense(<NotificationsPage />) },
          { path: "/plan", element: withSuspense(<PlanPage />) },
          { path: "/settings", element: withSuspense(<SettingsPage />) },
          { path: "/components", element: withSuspense(<ComponentShowcasePage />) },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: "/admin", element: withSuspense(<AdminOverviewPage />) },
          { path: "/admin/law-pack", element: withSuspense(<AdminLawPackPage />) },
          { path: "/admin/canh-luat", element: withSuspense(<AdminCanhLuatPage />) },
          { path: "/admin/organizations", element: withSuspense(<AdminOrganizationsPage />) },
          { path: "/admin/admins", element: withSuspense(<AdminAdminsPage />) },
          { path: "/admin/audit-log", element: withSuspense(<AdminAuditLogPage />) },
          { path: "/admin/settings", element: withSuspense(<AdminSettingsPage />) },
          { path: "/admin/monitoring", element: withSuspense(<AdminMonitoringPage />) },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DeskLayout />,
        children: [
          { path: "/desk", element: withSuspense(<DeskListPage />) },
          { path: "/desk/case/:id", element: withSuspense(<DeskCaseDetailPage />) },
          { path: "/desk/notifications", element: withSuspense(<DeskNotificationsPage />) },
          { path: "/desk/settings", element: withSuspense(<DeskSettingsPage />) },
        ],
      },
    ],
  },
  { path: "/desk/activate", element: withSuspense(<DeskActivatePage />) },
  {
    element: <BlankLayout />,
    children: [{ path: "*", element: withSuspense(<NotFoundPage />) }],
  },
  { path: "/", element: <Navigate to="/home" replace /> },
]);
