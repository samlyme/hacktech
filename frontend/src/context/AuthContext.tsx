import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    user: any;
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        if (token) {
            // Optionally decode token here to get user info
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUser(payload);
        } else {
            setUser(null);
        }
    }, [token]);

    const login = (newToken: string) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    const value: AuthContextType = {
        user,
        token,
        isAuthenticated: !!token,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
