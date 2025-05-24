import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAppSelector } from '@/hooks/storeHooks';
import { useSignup } from '@/hooks/useAuth';
import { Label } from '@radix-ui/react-label';
import { useRef } from 'react';
import { Navigate } from 'react-router-dom';

const SignupPage: React.FC = () => {
  const signupMutation = useSignup();
  const { user, error, loading } = useAppSelector((state) => state.auth);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    signupMutation.mutate({
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      firstName: firstNameRef.current?.value || '',
      lastName: lastNameRef.current?.value || '',
    });
  };

  if (user) return <Navigate to="/" replace />;

  return (
    <div className="h-screen flex items-center justify-center bg-muted">
      <Card className="w-full max-w-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-2xl">Sign Up</CardTitle>
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
            <div className="my-2 flex gap-4 w-full">
              <div className="w-1/2">
                <Label htmlFor="firstName" className="mb-2">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  type="name"
                  placeholder="First Name"
                  ref={firstNameRef}
                  required
                />
              </div>
              <div className="w-1/2">
                <Label htmlFor="lastName" className="mb-2">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  type="name"
                  placeholder="Last Name"
                  ref={lastNameRef}
                  required
                />
              </div>
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
              {loading ? 'Creating profile...' : 'Sign Up'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignupPage;
