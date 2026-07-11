import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import api from '../api/api';

const AuthContext = createContext();

const decodeStoredToken = (storedToken) => {
    try {
        const payload = JSON.parse(atob(storedToken));
        if (!payload || (!payload.usuario && !payload.usuarioId)) {
            return null;
        }

        return payload;
    } catch (error) {
        return null;
    }
};

const normalizeUser = (user) => {
    if (!user) {
        return user;
    }

    return {
        ...user,
        displayName: user.displayName || user.nome || user.username || user.email || 'Usuário',
    };
};

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);
    const [authLoading, setAuthLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(null);
    const [currentMusic, setCurrentMusic] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const storedToken = localStorage.getItem('token');

        const finishLoading = (authenticated) => {
            if (isMounted) {
                setIsAuthenticated(authenticated);
                setAuthLoading(false);
            }
        };

        if (storedToken) {
            const payload = decodeStoredToken(storedToken);

            if (payload) {
                setToken(storedToken);
                const userFromToken = payload.usuario ?? null;
                const userId = userFromToken?.id ?? payload.usuarioId ?? null;

                if (userFromToken && !userId) {
                    if (userFromToken?.email) {
                        api.get(`/usuarios?email=${encodeURIComponent(userFromToken.email)}`)
                            .then(({ data }) => {
                                const matchedUser = Array.isArray(data) && data.length > 0 ? data[0] : null;
                                if (!isMounted) return;
                                setCurrentUser(normalizeUser(matchedUser || userFromToken));
                                finishLoading(true);
                            })
                            .catch(() => {
                                if (!isMounted) return;
                                setCurrentUser(normalizeUser(userFromToken));
                                finishLoading(true);
                            });
                    } else {
                        setCurrentUser(normalizeUser(userFromToken));
                        finishLoading(true);
                    }
                    return () => {
                        isMounted = false;
                    };
                }

                if (userId) {
                    api.get(`/usuarios/${userId}`)
                        .then(({ data }) => {
                            if (!isMounted) return;
                            setCurrentUser(normalizeUser(data));
                            finishLoading(true);
                        })
                        .catch(() => {
                            if (!isMounted) return;
                            setCurrentUser(normalizeUser(userFromToken));
                            finishLoading(Boolean(userFromToken));
                        });
                    return () => {
                        isMounted = false;
                    };
                }

                setCurrentUser(normalizeUser(userFromToken));
                finishLoading(Boolean(userFromToken));
            } else {
                localStorage.removeItem('token');
                finishLoading(false);
            }
        } else {
            finishLoading(false);
        }

        return () => {
            isMounted = false;
        };
    }, []);

    const login = (usuario) => {
        const normalizedUser = normalizeUser(usuario);
        const payload = { usuario: normalizedUser, usuarioId: normalizedUser?.id };
        const token = btoa(JSON.stringify(payload)); // Gera um token base64 (não seguro)

        setIsAuthenticated(true);
        setCurrentUser(normalizedUser);
        setToken(token);
        localStorage.setItem('token', token);
        navigate('/home');
    };

    const logout = () => {
        setIsAuthenticated(false);
        setCurrentUser(null);
        setToken(null);
        localStorage.removeItem('token');
        navigate('/');
    };

    const updateCurrentUser = (nextUser) => {
        const normalizedUser = normalizeUser(nextUser);
        setCurrentUser(normalizedUser);

        if (!normalizedUser) {
            return;
        }

        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            return;
        }

        try {
            const payload = decodeStoredToken(storedToken);
            if (!payload) {
                return;
            }

            const nextPayload = {
                ...payload,
                usuario: normalizedUser,
                usuarioId: normalizedUser?.id ?? payload.usuarioId,
            };

            const nextToken = btoa(JSON.stringify(nextPayload));
            setToken(nextToken);
            localStorage.setItem('token', nextToken);
        } catch {
            // ignore token persistence issues
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, authLoading, currentUser, updateCurrentUser, login, logout, token, currentMusic, setCurrentMusic }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
