import React, { useEffect } from 'react';
import { useTrips } from '../hooks/useTrips';
import HistoryList from '../components/trips/HistoryList';

const History = () => {
  const { getHistory, history, loading } = useTrips();
  useEffect(() => { getHistory(); }, []);
  if (loading) return <div>Carregando...</div>;
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Histórico de pesquisas</h1>
      {history.length === 0 ? (
        <p className="text-secondary">Você ainda não fez nenhuma pesquisa.</p>
      ) : <HistoryList history={history} />}
    </div>
  );
};

export default History;
