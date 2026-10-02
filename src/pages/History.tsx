import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrips } from '../hooks/useTrips';
import HistoryList from '../components/trips/HistoryList';
import { SkeletonList } from '../components/common/Skeleton';
import { Button } from '../components/common/Button';

const History = () => {
  const navigate = useNavigate();
  const { getHistory, history, loading } = useTrips();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    getHistory().finally(() => setInitialLoad(false));
  }, []);

  if (loading && initialLoad) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Histórico de pesquisas</h1>
        <SkeletonList count={3} />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Histórico de pesquisas</h1>
      {history.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl shadow-sm text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Nenhuma pesquisa ainda</h2>
          <p className="text-secondary mb-6">Comece agora e encontre a viagem perfeita para você.</p>
          <Button onClick={() => navigate('/')}>Fazer primeira pesquisa</Button>
        </div>
      ) : (
        <HistoryList history={history} />
      )}
    </div>
  );
};

export default History;
