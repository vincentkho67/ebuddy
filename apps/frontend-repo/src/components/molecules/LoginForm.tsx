import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Input } from '@/components/atoms/Input';
import { LoginCredentials } from '@ebuddy/shared';

interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => void;
  loading: boolean;
}

export const LoginForm = ({ onSubmit, loading }: LoginFormProps) => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(credentials);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        maxWidth: 400,
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Login
      </Typography>
      
      <Input
        label="Email"
        type="email"
        value={credentials.email}
        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        required
      />
      
      <Input
        label="Password"
        type="password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        required
      />
      
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </Button>
    </Box>
  );
};