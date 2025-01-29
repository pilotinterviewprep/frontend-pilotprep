import { app } from './firebase-config';
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, OAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const appleProvider = new OAuthProvider('apple.com');
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    return user;
  } catch (error) {
    console.error('Error during sign in with Google:', error);
    throw error;
  }
};

export const signInWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    const user = result.user;
    return user;
  } catch (error) {
    console.error('Error during sign in with Facebook:', error);
    throw error;
  }
}

export const signInWithApple = async () => {
  try {
    const result = await signInWithPopup(auth, appleProvider);
    const user = result.user;
    return user;
  } catch (error) {
    console.error('Error during sign in with Apple:', error);
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
