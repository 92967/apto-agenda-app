import { Layout } from '@/components/Layout';
import { Dashboard } from '@/components/Dashboard';

export default function ReservationsApp() {
  return (
    <Layout currentPage="dashboard" userRole="admin">
      <Dashboard />
    </Layout>
  );
}