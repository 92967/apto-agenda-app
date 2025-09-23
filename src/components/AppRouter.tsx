import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Dashboard } from '@/components/Dashboard';
import { CalendarView } from '@/components/CalendarView';
import { ClientsView } from '@/components/ClientsView';
import { EmployeesView } from '@/components/EmployeesView';
import { SettingsView } from '@/components/SettingsView';

type Page = 'dashboard' | 'calendar' | 'clients' | 'employees' | 'settings';

export function AppRouter() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [userRole] = useState<'admin' | 'employee'>('admin');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'calendar':
        return <CalendarView />;
      case 'clients':
        return <ClientsView />;
      case 'employees':
        return <EmployeesView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <Dashboard />;
    }
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page as Page);
  };

  return (
    <Layout currentPage={currentPage} userRole={userRole} onPageChange={handlePageChange}>
      {renderPage()}
    </Layout>
  );
}