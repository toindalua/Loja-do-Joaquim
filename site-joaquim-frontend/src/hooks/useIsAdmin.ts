
import { useAuth } from '../context/AuthContext';

// Hook to easily check if current user is an admin
export const useIsAdmin = () => {
  const { user, isAuthenticated } = useAuth();
  return isAuthenticated && user?.type === 'admin';
};
