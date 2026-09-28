import { api } from './client';
import { TripResult, SearchHistory, FavoriteTrip } from '../types';

interface SearchParams {
  origin: string; destination: string; startDate: string; endDate: string;
  travelers: number; budget: number; tripType: string;
}

export const tripsApi = {
  search: (params: SearchParams) => api.post<TripResult>('/trips/search', params),
  getHistory: (page = 1, limit = 10) => api.get<SearchHistory[]>(`/trips/history?page=${page}&limit=${limit}`),
  getFavorites: () => api.get<FavoriteTrip[]>('/trips/favorites'),
  addFavorite: (tripId: string) => api.post(`/trips/favorites/${tripId}`),
  removeFavorite: (tripId: string) => api.delete(`/trips/favorites/${tripId}`),
};
