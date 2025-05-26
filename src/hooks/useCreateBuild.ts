import api from '@/services/axios';
import { useMutation } from '@tanstack/react-query';

type Build = {
  name: string;
  components: Record<string, string>;
};

const createBuild = async (newBuild: Build) => {
  const response = await api.post('/builds', newBuild);
  return response.data;
};

export function useCreateBuild() {
  return useMutation({
    mutationFn: createBuild,
    onSuccess: (data) => {
      console.log('Build created:', data);
    },

    onError: (error) => {
      console.error('Failed to create build:', error);
    },
  });
}
