import api from '@/services/axios';

export const fetchUser = async (userId: string) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};
