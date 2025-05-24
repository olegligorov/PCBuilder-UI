// src/routes/routeConfig.tsx
import { JSX } from 'react';
import LoginPage from '../pages/auth/LoginPage';
import HomePage from '@/pages/HomePage';
import SignupPage from '@/pages/auth/SignupPage';
import BuildPage from '@/pages/Build/BuildPage';
// import DashboardPage from '../pages/DashboardPage';
// import SettingsPage from '../pages/SettingsPage';
// import ProjectsPage from '../pages/ProjectsPage';

export interface AppRoute {
  path: string;
  element: JSX.Element;
  protected: boolean;
}

export const authRoutes: AppRoute[] = [
  {
    path: '/login',
    element: <LoginPage />,
    protected: false,
  },
  {
    path: '/signup',
    element: <SignupPage />,
    protected: false,
  },
];

export const routeConfig: AppRoute[] = [
  {
    path: '/',
    element: <HomePage />,
    protected: false,
  },
  {
    path: '/build',
    element: <BuildPage />,
    protected: false,
  },
  // {
  //   path: '/dashboard',
  //   element: <DashboardPage />,
  //   protected: true,
  // },
  // {
  //   path: '/settings',
  //   element: <SettingsPage />,
  //   protected: true,
  // },
  // {
  //   path: '/projects',
  //   element: <ProjectsPage />,
  //   protected: true,
  // },
];
