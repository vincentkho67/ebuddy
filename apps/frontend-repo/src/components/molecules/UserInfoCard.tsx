import { Card, CardContent, Typography, Grid } from '@mui/material';
import { User } from '@ebuddy/shared';

interface UserInfoCardProps {
  user: User;
}

export const UserInfoCard = ({ user }: UserInfoCardProps) => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              User Information
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Average Weight Ratings
            </Typography>
            <Typography variant="body1">
              {user.totalAverageWeightRatings}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Number of Rents
            </Typography>
            <Typography variant="body1">
              {user.numberOfRents}
            </Typography>
          </Grid>

          <Grid item xs={12}>
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
  );
};