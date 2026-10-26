import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PublicLayout } from '@/layouts/PublicLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { TopUpPage } from '@/pages/TopUpPage';
import { PaymentStatusPage } from '@/pages/PaymentStatusPage';
import { TransactionHistoryPage } from '@/pages/TransactionHistoryPage';
import { TransactionDetailPage } from '@/pages/TransactionDetailPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { HelpPage } from '@/pages/HelpPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/help', element: <HelpPage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: '/dashboard', element: <DashboardPage /> },
          { path: '/topup', element: <TopUpPage /> },
          { path: '/payment/:orderId', element: <PaymentStatusPage /> },
          { path: '/transactions', element: <TransactionHistoryPage /> },
          { path: '/transactions/:id', element: <TransactionDetailPage /> },
          { path: '/profile', element: <ProfilePage /> },
        ],
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
  // Redirect default
  { path: '/home', element: <Navigate to="/" replace /> },
]);
