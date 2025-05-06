import { JSX } from 'react'
import './App.css'

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routeConfig, { AppRoute } from './routes/routeConfig';
import { RootState } from './store';
import LoadingPage from './pages/LoadingPage';
import { ThemeProvider } from './components/theme-provider';
// import LoadingPage from './pages/auth/LoginPage';

// import LoginPage from './pages/LoginPage';
// import DashboardPage from './pages/DashboardPage';
// import LoadingPage from './pages/LoadingPage';

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user, loading } = useSelector((state: RootState) => state.auth);

  if (loading) return <LoadingPage />;

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          {routeConfig.map((route: AppRoute) => {
            const element = route.protected ? (
              <ProtectedRoute>{route.element}</ProtectedRoute>
            ) : (
              route.element
            );
            return <Route key={route.path} path={route.path} element={element} />;
          })}
          {/* Fallback to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App
