// src/pages/LoginPage.tsx
import React, { useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAppSelector } from '@/hooks/storeHooks';
import { useLogin } from '@/hooks/useAuth';

const LoginPage: React.FC = () => {
  const loginMutation = useLogin();

  const { user, error, loading } = useAppSelector((state) => state.auth);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
    });
  };

  if (user) return <Navigate to="/" replace />;

  return (
    <div className="h-screen flex items-center justify-center bg-muted">
      <Card className="w-full max-w-sm shadow-md">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
          </CardHeader>
          <CardContent className="my-4">
            <div className="my-2">
              <Label htmlFor="email" className="mb-2">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                ref={emailRef}
                required
              />
            </div>
            <div className="my-2">
              <Label htmlFor="password" className="mb-2">
                Password
              </Label>
              <Input id="password" type="password" ref={passwordRef} required />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
