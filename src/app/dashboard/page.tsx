'use client';

import { Suspense } from 'react';
import ProductDashboard from '@/components/dashboard/ProductDashboard';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Loading from '@/components/Loading';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardPage() {
  useAuth(true);
  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader />
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<Loading />}>
            <ProductDashboard />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
