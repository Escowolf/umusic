import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { auth, googleProvider } from './firebaseConfig';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { database, ref, get, set } from './firebaseConfig';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentMusic, setCurrentMusic] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setCurrentUser(user);
                setIsAuthenticated(true);
            } else {
                setCurrentUser(null);
                setIsAuthenticated(false);
            }
        });

        return unsubscribe;
    }, []);

    const login = async (email, senha) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, senha);
            setCurrentUser(userCredential.user);
            setIsAuthenticated(true);
            navigate('/home');
        } catch (error) {
            throw error;
        }
    };

    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            setCurrentUser(result.user);
            setIsAuthenticated(true);
            navigate('/home');
        } catch (error) {
            console.error('Google login error:', error);
        }
    };

    const logout = () => {
        auth.signOut().then(() => {
            setIsAuthenticated(false);
            setCurrentUser(null);
            navigate('/');
        });
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout, loginWithGoogle, currentMusic, setCurrentMusic, database, ref, get, set }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
