import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { 
  signInWithPopup, 
  signOut, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { auth, provider, isFirebaseConfigured } from '../firebase';

interface AuthContextType {
  user: any | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser: any) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      if (isFirebaseConfigured) {
        await signInWithPopup(auth, provider);
      } else {
        // Simulated sign in fallback
        const mockUser = {
          uid: 'mock-user-123',
          displayName: 'Google Sandbox User',
          email: 'sandbox@cvaura.dev',
          photoURL: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Aura',
        };
        auth._simulateLogin(mockUser);
      }
    } catch (error) {
      console.error("Authentication failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      if (isFirebaseConfigured) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Simulated email sign in
        const mockUser = {
          uid: 'mock-user-123',
          displayName: email.split('@')[0],
          email: email,
          photoURL: `https://api.dicebear.com/7.x/adventurer/svg?seed=${email}`,
        };
        auth._simulateLogin(mockUser);
      }
    } catch (error) {
      console.error("Email authentication failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, password: string, displayName: string) => {
    setLoading(true);
    try {
      if (isFirebaseConfigured) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName });
        // Force state refresh
        setUser({ ...userCredential.user });
      } else {
        // Simulated email sign up
        const mockUser = {
          uid: `mock-user-${Date.now()}`,
          displayName: displayName,
          email: email,
          photoURL: `https://api.dicebear.com/7.x/adventurer/svg?seed=${displayName}`,
        };
        auth._simulateLogin(mockUser);
      }
    } catch (error) {
      console.error("Email sign up failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      if (isFirebaseConfigured) {
        await signOut(auth);
      } else {
        auth._simulateLogout();
      }
    } catch (error) {
      console.error("Sign out failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signInWithEmail, signUpWithEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
