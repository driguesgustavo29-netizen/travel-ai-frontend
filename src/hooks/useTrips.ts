import { useState } from 'react';
import { tripsApi } from '../api/trips.api';
import { TripResult, SearchHistory } from '../types';

interface SearchParams {
  origin: string; destination: string; startDate: string; endDate: string;
  travelers: number; budget: number; tripType: string;
}

export const useTrips = () => {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<SearchHistory[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);

  const searchTrip = async (params: SearchParams): Promise<TripResult> => {
    setLoading(true);
    try {
      const res = await tripsApi.search(params);
      return res.data;
    } finally { setLoading(false); }
  };

  const getHistory = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const res = await tripsApi.getHistory(page, limit);
      setHistory(res.data);
      return res.data;
    } finally { setLoading(false); }
  };

  const getFavorites = async () => {
    setLoading(true);
    try {
      const res = await tripsApi.getFavorites();
      setFavorites(res.data);
      return res.data;
    } finally { setLoading(false); }
  };

  const addFavorite = async (tripId: string) => {
    await tripsApi.addFavorite(tripId);
    await getFavorites();
  };

  const removeFavorite = async (tripId: string) => {
    await tripsApi.removeFavorite(tripId);
    await getFavorites();
  };

  return { loading, searchTrip, getHistory, getFavorites, addFavorite, removeFavorite, history, favorites };
};
