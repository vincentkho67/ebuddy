import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { LoginCredentials } from '@ebuddy/shared';

export const loginWithFirebase = async ({ email, password }: LoginCredentials) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const token = await userCredential.user.getIdToken();
  return {
    token,
    expiresAt: Date.now() + 3600000
  };
};