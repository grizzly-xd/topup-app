import {
  signInWithEmailAndPassword,
  signOut,
  onIdTokenChanged,
  type User,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from './firebase';

export class AuthConfigError extends Error {
  constructor() {
    super('Firebase belum dikonfigurasi. Isi VITE_FIREBASE_* pada environment.');
  }
}

export async function loginWithEmail(email: string, password: string): Promise<User> {
  if (!auth) throw new AuthConfigError();
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function logout(): Promise<void> {
  if (!auth) return;
  await signOut(auth);
}

export function subscribeAuth(cb: (user: User | null) => void): () => void {
  if (!auth) {
    cb(null);
    return () => {};
  }
  return onIdTokenChanged(auth, cb);
}

export async function getIdToken(forceRefresh = false): Promise<string | null> {
  if (!auth?.currentUser) return null;
  try {
    return await auth.currentUser.getIdToken(forceRefresh);
  } catch {
    return null;
  }
}

export { isFirebaseConfigured };
