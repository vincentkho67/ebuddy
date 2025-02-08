import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { RootState } from '@/store';
import { fetchUserStart, fetchUserSuccess, fetchUserFailure } from '@/store/slices/userSlice';
import { userApi } from '@/api/userApi';
import { UserInfoCard } from '@/components/molecules/UserInfoCard';

export const UserDashboard = () => {
  const dispatch = useDispatch();
  const { data: user, loading, error } = useSelector((state: RootState) => state.user);
  const { token } = useSelector((state: RootState) => state.auth);

  const handleFetchUser = async () => {
    if (!token) return;
    
    dispatch(fetchUserStart());
    try {
      const response = await userApi.fetchUserData('user1', token);
      if (response.data) {
        dispatch(fetchUserSuccess(response.data));
      }
    } catch (error) {
      dispatch(fetchUserFailure(error instanceof Error ? error.message : 'Failed to fetch user data'));
    }
  };

  const renderUserCard = () => {
    if (!user) return null;
    return <UserInfoCard user={user} />;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        User Dashboard
      </Typography>
      
      <Button 
        variant="contained" 
        onClick={handleFetchUser}
        disabled={loading}
        sx={{ mb: 3 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Fetch User Data'}
      </Button>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {renderUserCard()}
    </Box>
  );
};