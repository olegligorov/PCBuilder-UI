import { Loader2 } from 'lucide-react';

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-4 text-muted-foreground">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <p className="text-sm">Loading...</p>
    </div>
  );
};

export default LoadingPage;
