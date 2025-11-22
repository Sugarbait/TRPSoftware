import React, { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useLocation, Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();
  const [shouldRedirect, setShouldRedirect] = React.useState(false);

  useEffect(() => {
    // Only redirect if we're fully loaded and not signed in
    if (isLoaded && !isSignedIn && location.pathname !== '/login') {
      setShouldRedirect(true);
    }
  }, [isLoaded, isSignedIn, location.pathname]);

  // Show loading state while checking authentication
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-background-light dark:bg-background-dark">
        <div className="text-center">
          <div className="inline-flex items-center justify-center size-12 rounded-full bg-primary/10 mb-4">
            <span className="size-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not signed in
  if (!isSignedIn && shouldRedirect) {
    return <Navigate to="/login" replace />;
  }

  // If loaded but not signed in yet, show loading
  if (isLoaded && !isSignedIn) {
    return (
      <div className="flex items-center justify-center h-screen bg-background-light dark:bg-background-dark">
        <div className="text-center">
          <div className="inline-flex items-center justify-center size-12 rounded-full bg-primary/10 mb-4">
            <span className="size-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
