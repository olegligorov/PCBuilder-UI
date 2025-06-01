// src/components/Navbar.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { useLogout } from '@/hooks/useAuth';

const Navbar: React.FC = () => {
  const { signedIn } = useSelector((state: RootState) => state.auth);

  const logout = useLogout();

  const handleLogoutClick = async () => {
    logout.mutate();
  };

  return (
    <nav className="w-full border-b bg-background">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold tracking-tight">
            PCBuilder
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link to="/build">Build</Link>
            <Link to="/build">My Builds</Link>
            <Link to="#">Parts</Link>
            <Link to="#">Support</Link>
          </div>
        </div>

        {/* Right side: Login/Signup */}
        {signedIn ? (
          <>
            <Button onClick={() => handleLogoutClick()} size="sm">
              Logout
            </Button>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
