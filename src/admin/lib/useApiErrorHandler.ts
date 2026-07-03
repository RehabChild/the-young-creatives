import { useNavigate } from 'react-router-dom';
import { ApiError } from '../lib/api';
import { useAdminAuth } from '../context/AdminAuthContext';

export function useApiErrorHandler() {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  return (err: unknown): string => {
    if (err instanceof ApiError) {
      if (err.status === 401) {
        logout();
        navigate('/admin/login');
      }
      return err.message;
    }
    return 'Something went wrong. Please try again.';
  };
}
