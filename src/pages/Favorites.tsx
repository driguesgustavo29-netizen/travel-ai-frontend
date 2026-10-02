import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrips } from '../hooks/useTrips';
import { SkeletonList } from '../components/common/Skeleton';
import { Button } from '../components/common/Button';

const Favorites = () => {
  const navigate = useNavigate();
  const { getFavorites, favorites, loading } = useTrips();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    getFavorites().finally(() => setInitialLoad(false));
  }, []);

  if (loading && initialLoad) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Viagens favoritas</h1>
        <SkeletonList count={2} />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Viagens favoritas</h1>
      {favorites.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl shadow-sm text-center">
          <div className="text-5xl mb-4">💙</div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Nenhum favorito ainda</h2>
          <p className="text-secondary mb-6">Favorite as viagens que você mais gostou para acessá-las facilmente.</p>
          <Button onClick={() => navigate('/')}>Explorar viagens</Button>
        </div>
      ) : (
        <div className="space-y-4">
          {favorites.map((f: any) => (
            <div
              key={f.id}
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow animate-[fadeIn_0.3s_ease]"
            >
              <div className="flex justify-between items-start flex-wrap gap-3">
                <div>
                  <p className="font-semibold text-lg uppercase">
                    {f.origin} → {f.destination}
                  </p>
                  <p className="text-sm text-secondary">
                    {new Date(f.startDate).toLocaleDateString('pt-BR')} - {new Date(f.endDate).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <p className="text-primary font-bold text-xl">R$ {Number(f.totalPrice).toFixed(2)}</p>
              </div>
              <p className="text-sm text-gray-600 mt-3 pt-3 border-t">{f.aiJustification}</p>
            </div>
          ))}
        </div>
      )}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Favorites;
