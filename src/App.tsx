import { JSX } from 'react';
import './App.css';

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ThemeProvider } from './components/theme-provider';
import { AppRoute, authRoutes, routeConfig } from './routes/routeConfig';
import { RootState } from './store';
import LoadingPage from './pages/LoadingPage';

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  // TODO Fix the protected routes
  const { user, loading } = useSelector((state: RootState) => state.auth);

  console.log(user);
  if (loading) return <LoadingPage />;

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          {authRoutes.map((route: AppRoute) => {
            const element = route.protected ? (
              <ProtectedRoute>{route.element}</ProtectedRoute>
            ) : (
              route.element
            );
            return <Route key={route.path} path={route.path} element={element} />;
          })}
          <Route element={<Layout />}>
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
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
