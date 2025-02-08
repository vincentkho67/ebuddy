import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

const firebaseConfig = {
    apiKey: "fake-api-key",
    authDomain: "ebuddy-e0146.firebaseapp.com",
    projectId: "ebuddy-e0146",
    storageBucket: "ebuddy-e0146.appspot.com",
    messagingSenderId: "000000000000",
    appId: "1:000000000000:web:0000000000000000000000"
};

  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const functions = getFunctions(app);

if (process.env.NODE_ENV === 'development') {
    connectAuthEmulator(auth, 'http://127.0.0.1:9099');
    connectFunctionsEmulator(functions, '127.0.0.1', 5001);
}