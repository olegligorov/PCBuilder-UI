// src/api/auth.ts
import { setLoading, setUser } from '@/features/auth/authSlice';
import { store } from '@/store';
import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    withCredentials: true, // Necessary to send cookies with requests
});

// Define the expected shape of the response from the signup API call
export interface SignupResponse {
    user: {
        id: string;
        email: string;
        type: string;
    };
    // Add any additional properties as needed
}

// Signup API call
export const signup = async (data: { email: string; password: string; name: string }): Promise<SignupResponse> => {
    const response = await api.post('/signup', data);
    return response.data; // Assuming response.data contains the user object
};

export const login = async (data: { email: string; password: string }) => {
    const response = await api.post('/login', data);
    return response.data;
};

export const fetchMe = async (): Promise<{ user: { id: string; email: string; type: string } }> => {
    try {
        const response = await api.get('/me');
        store.dispatch(setUser(response.data.user));
        store.dispatch(setLoading(false));
        return response.data;
    } catch (error) {
        store.dispatch(setUser(null));
        store.dispatch(setLoading(false));
        throw error;
    }
};

export const logout = async () => {
    await api.post('/logout');
};