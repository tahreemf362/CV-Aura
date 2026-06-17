import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute = ({ children }: { children?: ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 flex flex-col items-center justify-center gap-4">
        {/* Sleek B&W Loading Spinner */}
        <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-black dark:border-neutral-800 dark:border-t-white animate-spin" />
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500 dark:text-neutral-400">
          Syncing Aura Auth...
        </span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children ? <>{children}</> : null;
};

export default ProtectedRoute;
