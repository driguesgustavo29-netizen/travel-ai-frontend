import React, { useState } from 'react';
import { TripResult } from '../../types';
import { Button } from '../common/Button';
import { tripsApi } from '../../api/trips.api';

const ResultCard: React.FC<{ result: TripResult }> = ({ result }) => {
  const [favoriting, setFavoriting] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [error, setError] = useState('');

  const handleFavorite = async () => {
    if (!result.id) {
      setError('Nao foi possivel favoritar: ID da pesquisa nao encontrado.');
      return;
    }
    setError('');
    setFavoriting(true);
    try {
      await tripsApi.addFavorite(result.id);
      setFavorited(true);
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Erro ao favoritar';
      if (msg.toLowerCase().includes('ja')) {
        setFavorited(true);
      } else {
        setError(msg);
      }
    } finally {
      setFavoriting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold">{result.destination}</h2>
          <p className="text-secondary">
            {new Date(result.startDate).toLocaleDateString('pt-BR')} - {new Date(result.endDate).toLocaleDateString('pt-BR')}
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-primary">R$ {result.totalPrice.toFixed(2)}</p>
          <p className="text-sm text-green-600">Economia: R$ {result.savings.toFixed(2)}</p>
        </div>
      </div>

      <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Voo</h3>
          <p><span className="text-secondary">Companhia:</span> {result.flight.airline}</p>
          <p><span className="text-secondary">Preco:</span> R$ {result.flight.price.toFixed(2)}</p>
          <p><span className="text-secondary">Escalas:</span> {result.flight.stops}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Hotel</h3>
          <p><span className="text-secondary">Nome:</span> {result.hotel.name}</p>
          <p><span className="text-secondary">Estrelas:</span> {result.hotel.stars}</p>
          <p><span className="text-secondary">Nota:</span> {result.hotel.rating}</p>
          <p><span className="text-secondary">Preco:</span> R$ {result.hotel.price.toFixed(2)}</p>
          {result.hotel.distanceToBeach !== undefined && (
            <p><span className="text-secondary">Distancia da praia:</span> {result.hotel.distanceToBeach} km</p>
          )}
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
        <p className="text-sm text-gray-700">
          <strong>Por que escolhemos esta opcao:</strong> {result.aiJustification}
        </p>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm">{error}</div>}

      <div className="flex gap-3 flex-wrap">
        <Button
          variant={favorited ? 'secondary' : 'primary'}
          onClick={handleFavorite}
          loading={favoriting}
          disabled={favorited}
        >
          {favorited ? 'Favoritado' : 'Favoritar'}
        </Button>
        <Button variant="outline" onClick={() => (window.location.href = '/')}>
          Nova pesquisa
        </Button>
      </div>
    </div>
  );
};

export default ResultCard;
