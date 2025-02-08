import { useDispatch, useSelector } from 'react-redux';
import { LoginForm } from '@/components/molecules/LoginForm';
import { RootState } from '@/store';
import { loginFailure, loginStart, loginSuccess } from '@/store/slices/authSlice';
import { LoginCredentials } from '@ebuddy/shared';
import { useRouter } from 'next/navigation';
import { loginWithFirebase } from '@/service/auth';

export const LoginContainer = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading } = useSelector((state: RootState) => state.auth);
  
    const handleLogin = async (credentials: LoginCredentials) => {
      dispatch(loginStart());
      try {
        const authResult = process.env.NODE_ENV === 'development' 
          ? { token: 'test-token', expiresAt: Date.now() + 3600000 }
          : await loginWithFirebase(credentials);
          
        dispatch(loginSuccess(authResult));
        router.push('/dashboard');
      } catch (error) {
        dispatch(loginFailure(error instanceof Error ? error.message : 'Login failed'));
      }
    };
  
    return <LoginForm onSubmit={handleLogin} loading={loading} />;
  };