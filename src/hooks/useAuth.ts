import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export const useAuth = (requireAuth: boolean = true) => {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      router.push('/login');
    } else if (!requireAuth && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [requireAuth, router, isAuthenticated]);

  return { isAuthenticated };
};
