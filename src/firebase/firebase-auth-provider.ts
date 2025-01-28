import { app } from './firebase-config';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user;
  } catch (error) {
    console.error('Error during sign in with Google:', error);
    throw error;
  }
};

export const firebaseSignout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};
