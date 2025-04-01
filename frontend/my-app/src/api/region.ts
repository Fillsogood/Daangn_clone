import api from './axios';

export interface Region {
  id: number;
  name: string;
}

export const fetchRegions = async (): Promise<Region[]> => {
  const res = await api.get<{ regions: Region[] }>('/regions');
  return res.data.regions;
};
