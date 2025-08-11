import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { authApiService } from '../services/AuthApi';  // ← Serviço da API
import { apiClient } from '../services/api';
import { AuthContextData, LoginCredentials, RegisterData, User } from '../types/auth';

// Chaves de armazenamento
const STORAGE_KEYS = {
    USER: '@MedicalApp:user',
    TOKEN: '@MedicalApp:token',
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStoredUser();
        loadRegisteredUsers();
    }, []);

    const loadStoredUser = async () => {
        try {
            const storedToken = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
            const storedUser = await AsyncStorage.getItem(STORAGE_KEYS.USER);
            if (storedToken && storedUser) {
                // Configura o token no cliente da API  ← NOVO!
                apiClient.setToken(storedToken);
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error('Erro ao carregar usuário:', error);
            // Se houver erro, limpa os dados armazenados  ← NOVO!
            await AsyncStorage.removeItem(STORAGE_KEYS.USER);
            await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
        } finally {
            setLoading(false);
        }
    };

    const loadRegisteredUsers = async () => {
        try {
            await authApiService.loadRegisteredUsers(); // ← Correção aqui!
        } catch (error) {
            console.error('Erro ao carregar usuários registrados:', error);
        }
    };

    const signIn = async (credentials: LoginCredentials) => {
        try {
            const response = await authApiService.signIn(credentials);  // ← Login real!
            setUser(response.user);
            await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
            await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
        } catch (error) {
            throw error;
        }
    };

    const register = async (data: RegisterData) => {
        try {
            const response = await authApiService.register(data); // ← Correção aqui!
            setUser(response.user);
            await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
            await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
        } catch (error) {
            throw error;
        }
    };

    const signOut = async () => {
        try {
            await authApiService.signOut();  // ← Correção aqui!
            setUser(null);
            await AsyncStorage.removeItem(STORAGE_KEYS.USER);
            await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, signIn, register, signOut }}>
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