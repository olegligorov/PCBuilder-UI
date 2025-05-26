import { Component } from '@/interfaces';
import api from '@/services/axios';

export interface ComponentsResponse {
  items: Component[];
  total_count: number;
}

export const fetchItems = async (itemType: string): Promise<ComponentsResponse> => {
  const response = await api.get(`/${itemType}`);
  return response.data;
};
