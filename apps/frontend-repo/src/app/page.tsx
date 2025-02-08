'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Box, CircularProgress } from '@mui/material';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Short delay to ensure smooth transition
    const timeout = setTimeout(() => {
      router.push(isAuthenticated ? '/dashboard' : '/login');
    }, 100);

    return () => clearTimeout(timeout);
  }, [isAuthenticated, router]);

  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default'
      }}
    >
      <CircularProgress />
    </Box>
  );
}