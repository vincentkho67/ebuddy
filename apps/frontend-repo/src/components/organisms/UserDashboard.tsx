import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@mui/material';
import { RootState } from '@/store';
import { User } from '@ebuddy/shared';
import { userApi } from '@/api/userApi';

export const UserDashboard = () => {
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.auth);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastDoc, setLastDoc] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchUsers = async (isLoadingMore = false) => {
    if (!token) return;
    setLoading(true);
    setError(null);

    try {
      const response = await userApi.fetchAllUsers(
        token,
        10,
        isLoadingMore ? lastDoc?.toString() : undefined
      );

      if (response.data) {
        if (isLoadingMore) {
          setUsers(prevUsers => [...prevUsers, ...response.data!]);
        } else {
          setUsers(response.data);
          // Set initial total count
          setTotalCount(response.data.length);
        }
        
        // Only update lastDoc if we got new data
        if (response.data.length > 0) {
          setLastDoc(response.pagination?.lastDoc ?? null);
        } else {
          setLastDoc(null);
        }
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const handleLoadMore = () => {
    if (!loading && lastDoc) {
      fetchUsers(true);
    }
  };

  const handleViewUser = (userId: string) => {
    router.push(`/dashboard/${userId}`);
  };

  if (loading && users.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  const shouldShowLoadMore = lastDoc !== null && users.length < totalCount;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        User Dashboard
      </Typography>
      
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Average Weight Ratings</TableCell>
              <TableCell>Number of Rents</TableCell>
              <TableCell>Last Active</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.totalAverageWeightRatings}</TableCell>
                <TableCell>{user.numberOfRents}</TableCell>
                <TableCell>
                  {new Date(user.recentlyActive * 1000).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleViewUser(user.id)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {shouldShowLoadMore && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Button
            variant="contained"
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Load More'}
          </Button>
        </Box>
      )}
    </Box>
  );
};