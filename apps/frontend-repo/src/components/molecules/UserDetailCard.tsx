import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Button, 
  TextField,
  Box,
  Snackbar,
  Alert
} from '@mui/material';
import { User } from '@ebuddy/shared';
import { userApi } from '@/api/userApi';
import { RootState } from '@/store';
import { updateUserSuccess } from '@/store/slices/userSlice';

interface UserDetailCardProps {
  user: User;
}

export const UserDetailCard = ({ user }: UserDetailCardProps) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  const handleUpdate = async () => {
    try {
      if (!token) return;

      const response = await userApi.updateUserData({
        userId: user.id,
        data: {
          totalAverageWeightRatings: editedUser.totalAverageWeightRatings,
          numberOfRents: editedUser.numberOfRents,
          recentlyActive: editedUser.recentlyActive
        }
      }, token);

      if (response.data) {
        dispatch(updateUserSuccess(response.data));
        setSnackbar({
          open: true,
          message: 'User updated successfully',
          severity: 'success'
        });
        setIsEditing(false);
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to update user',
        severity: 'error'
      });
    }
  };

  return (
    <>
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5">User Details</Typography>
            <Button 
              variant="contained" 
              onClick={() => isEditing ? handleUpdate() : setIsEditing(true)}
            >
              {isEditing ? 'Save Changes' : 'Edit User'}
            </Button>
          </Box>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="textSecondary">
                Average Weight Ratings
              </Typography>
              {isEditing ? (
                <TextField
                  fullWidth
                  type="number"
                  value={editedUser.totalAverageWeightRatings}
                  onChange={(e) => setEditedUser({
                    ...editedUser,
                    totalAverageWeightRatings: parseFloat(e.target.value)
                  })}
                  margin="dense"
                />
              ) : (
                <Typography variant="body1">
                  {user.totalAverageWeightRatings}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="textSecondary">
                Number of Rents
              </Typography>
              {isEditing ? (
                <TextField
                  fullWidth
                  type="number"
                  value={editedUser.numberOfRents}
                  onChange={(e) => setEditedUser({
                    ...editedUser,
                    numberOfRents: parseInt(e.target.value)
                  })}
                  margin="dense"
                />
              ) : (
                <Typography variant="body1">
                  {user.numberOfRents}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="textSecondary">
                Last Active
              </Typography>
              <Typography variant="body1">
                {new Date(user.recentlyActive * 1000).toLocaleString()}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};