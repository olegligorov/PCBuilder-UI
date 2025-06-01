// src/api/auth.ts
// import axios from 'axios';

// const api = axios.create({
//     baseURL: '/api',
// withCredentials: true,
// });

import { User } from '@/interfaces';
import api, { rawApi } from '@/services/axios';

export interface SignupResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// Signup API call
export const signup = async (data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}): Promise<SignupResponse> => {
  const response = await api.post('/users/signup', data);
  return response.data;
};

export const login = async (data: { email: string; password: string }) => {
  const response = await api.post('/users/login', data);
  return response.data;
};

export const logout = async () => {
  const accessToken = localStorage.getItem('accessToken');
  await rawApi.post(
    '/users/logout',
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
};
