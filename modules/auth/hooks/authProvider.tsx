'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// ====================================================================
// 1. INTERFACES
// ====================================================================

// Define the User Interface based on your backend structure
interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
}

// Define the Context Type, specifying the contracts for the provider value
interface AuthContextType {
    user: User | null; 
    isLoading: boolean;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    login: (userData: User) => Promise<void>;
    logout: () => Promise<void>;
}

// Define props for the Provider component
interface AuthProviderProps {
    children: ReactNode;
}

// ====================================================================
// 2. CONTEXT & DEFAULT VALUE
// ====================================================================

const defaultContextValue: AuthContextType = {
    user: null,
    isLoading: true,
    // Placeholder functions defined for type safety, the provider will override these
    setUser: () => {}, 
    login: async () => {}, 
    logout: async () => {}, 
};

// Create the context instance
export const AuthContext = createContext<AuthContextType>(defaultContextValue);

// ====================================================================
// 3. API SIMULATION / UTILITIES
// ====================================================================

// Utility function to simulate checking for a current session (e.g., via token)
const fetchCurrentUser = async (): Promise<User | null> => {
    // Simulate an API call delay
    await new Promise(resolve => setTimeout(resolve, 50)); 
    
    // Replace this logic with your actual secure fetch call
    /*
    try {
        const response = await fetch('/api/user/current-user'); 
        if (response.ok) {
            const data = await response.json();
            return data.user as User;
        }
        return null;
    } catch (error) {
        console.error("Error fetching current user:", error);
        return null; 
    }
    */
    
    return null; // No user found by default
};

// ====================================================================
// 4. AUTH PROVIDER COMPONENT
// ====================================================================

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Effect to initialize authentication state on component mount
    useEffect(() => {
        const initializeAuth = async () => {
            const currentUser = await fetchCurrentUser();
            setUser(currentUser);
            setIsLoading(false);
        };
        initializeAuth();
    }, []);

    const logout = async () => {
        // Perform server-side cleanup if necessary
        setUser(null);
        console.log("User logged out successfully.");
    };

    const login = async (userData: User) => {
        // Perform server-side login confirmation if necessary
        setUser(userData);
        console.log("User logged in.");
    };

    const contextValue: AuthContextType = {
        user,
        isLoading,
        setUser,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {!isLoading ? children : (
                <div className="flex items-center justify-center min-h-screen text-xl text-gray-600">
                    Loading Authentication...
                </div>
            )}
        </AuthContext.Provider>
    );
};

// ====================================================================
// 5. CUSTOM HOOK
// ====================================================================

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        // CRITICAL: Throw an error if the hook is used outside the provider
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};