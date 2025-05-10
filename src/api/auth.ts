// src/api/auth.ts
// import axios from 'axios';

// const api = axios.create({
//     baseURL: '/api',
// withCredentials: true,
// });

import api from "@/services/axios";

export interface SignupResponse {
    user: {
        id: string;
        email: string;
        type: string;
    };
    accessToken: string;
    refreshToken: string;
}

// Signup API call
export const signup = async (data: { email: string; password: string; name: string }): Promise<SignupResponse> => {
    const response = await api.post('/signup', data);
    return response.data;
};

export const login = async (data: { email: string; password: string }) => {
    const response = await api.post('/login', data);
    return response.data;
};

// export const fetchMe = async (): Promise<{ user: { id: string; email: string; type: string } }> => {
//     try {
//         const response = await api.get('/me');
//         store.dispatch(setUser(response.data.user));
//         store.dispatch(setLoading(false));
//         return response.data;
//     } catch (error) {
//         store.dispatch(setUser(null));
//         store.dispatch(setLoading(false));
//         throw error;
//     }
// };

export const logout = async () => {
    await api.post('/logout');
};