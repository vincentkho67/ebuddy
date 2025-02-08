'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { Container } from '@mui/material';
import { RootState } from '@/store';
import { UserDashboard } from '@/components/organisms/UserDashboard';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Container maxWidth="lg">
      <UserDashboard />
    </Container>
  );
}