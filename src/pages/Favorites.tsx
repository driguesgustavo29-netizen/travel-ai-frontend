import React, { useEffect } from 'react';
import { useTrips } from '../hooks/useTrips';

const Favorites = () => {
  const { getFavorites, favorites, loading } = useTrips();

  useEffect(() => {
    getFavorites();
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Viagens favoritas</h1>
      {favorites.length === 0 ? (
        <p className="text-secondary">Voce ainda nao favoritou nenhuma viagem.</p>
      ) : (
        <div className="space-y-4">
          {favorites.map((f) => (
            <div key={f.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <p className="font-medium">{f.origin} - {f.destination}</p>
              <p className="text-sm text-secondary">
                {new Date(f.startDate).toLocaleDateString('pt-BR')} - {new Date(f.endDate).toLocaleDateString('pt-BR')}
              </p>
              <p className="text-primary font-bold">R$ {Number(f.totalPrice).toFixed(2)}</p>
              <p className="text-sm text-gray-600 mt-2">{f.aiJustification}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
