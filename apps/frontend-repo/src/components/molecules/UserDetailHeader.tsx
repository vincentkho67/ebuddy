import { Box, IconButton, Typography, useTheme, useMediaQuery } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface HeaderProps {
  onBack: () => void;
  userId: string;
}

export const UserDetailHeader = ({ onBack, userId }: HeaderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mb: 3,
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 1,
        boxShadow: 1,
      }}
    >
      <IconButton 
        onClick={onBack}
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          '&:hover': {
            bgcolor: 'primary.dark',
          },
          width: 40,
          height: 40,
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      
      <Typography variant={isMobile ? "h6" : "h5"} component="h1">
        User Details - {userId}
      </Typography>
    </Box>
  );
};