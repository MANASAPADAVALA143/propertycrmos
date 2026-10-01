import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from '@/components/AppLayout';
import LandingPage from '@/pages/LandingPage';
import DashboardPage from '@/pages/DashboardPage';
import UnitsPage from '@/pages/UnitsPage';
import BuyersPage from '@/pages/BuyersPage';
import PaymentsPage from '@/pages/PaymentsPage';
import ContractsPage from '@/pages/ContractsPage';
import RenewalsPage from '@/pages/RenewalsPage';
import CashFlowPage from '@/pages/CashFlowPage';
import IFRS16Page from '@/pages/IFRS16Page';
import DocumentsPage from '@/pages/DocumentsPage';
import SettingsPage from '@/pages/SettingsPage';
import PortalLoginPage from '@/pages/PortalLoginPage';
import PortalDashboardPage from '@/pages/PortalDashboardPage';
import InvoiceCommandCenter from '@/pages/InvoiceCommandCenter';
import APPayablesPage from '@/pages/APPayablesPage';
import ARReceivablesPage from '@/pages/ARReceivablesPage';
import InvoiceUploadPage from '@/pages/InvoiceUploadPage';
import VendorMasterPage from '@/pages/VendorMasterPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/portal/login" element={<PortalLoginPage />} />
        <Route path="/portal/dashboard" element={<PortalDashboardPage />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/units" element={<UnitsPage />} />
          <Route path="/buyers" element={<BuyersPage />} />
          <Route path="/payments" element={<PaymentsPage />} />
          <Route path="/contracts" element={<ContractsPage />} />
          <Route path="/renewals" element={<RenewalsPage />} />
          <Route path="/cashflow" element={<CashFlowPage />} />
          <Route path="/ifrs16" element={<IFRS16Page />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/invoices" element={<InvoiceCommandCenter />} />
          <Route path="/invoices/ap" element={<APPayablesPage />} />
          <Route path="/invoices/ar" element={<ARReceivablesPage />} />
          <Route path="/invoices/upload" element={<InvoiceUploadPage />} />
          <Route path="/invoices/vendors" element={<VendorMasterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
