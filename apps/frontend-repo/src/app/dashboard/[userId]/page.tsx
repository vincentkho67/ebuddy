'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import { RootState } from '@/store';
import { fetchUserStart, fetchUserSuccess, fetchUserFailure } from '@/store/slices/userSlice';
import { userApi } from '@/api/userApi';
import { UserDetailCard } from '@/components/molecules/UserDetailCard';
import { UserDetailHeader } from '@/components/molecules/UserDetailHeader';

export default function UserDetailPage() {
  const { userId } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: user, loading, error } = useSelector((state: RootState) => state.user);
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token || !userId) return;
      dispatch(fetchUserStart());
      try {
        const response = await userApi.fetchUserData(userId as string, token);
        if (response.data) {
          dispatch(fetchUserSuccess(response.data));
        }
      } catch (error) {
        dispatch(fetchUserFailure(error instanceof Error ? error.message : 'Failed to fetch user data'));
      }
    };
    fetchUserData();
  }, [dispatch, token, userId]);

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" variant="h6">{error}</Typography>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container>
        <Typography>User not found</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ py: 4 }}>
        <UserDetailHeader 
          onBack={() => router.back()} 
          userId={user.id} 
        />
        <UserDetailCard user={user} />
      </Box>
    </Container>
  );
}