import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TripResult } from '../../types';
import { Button } from '../common/Button';
import { tripsApi } from '../../api/trips.api';
import { showSuccess, showError } from '../../utils/toast';

const ResultCard: React.FC<{ result: TripResult }> = ({ result }) => {
  const navigate = useNavigate();
  const [favoriting, setFavoriting] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const handleFavorite = async () => {
    if (!result.id) {
      showError('ID da pesquisa nao encontrado');
      return;
    }
    setFavoriting(true);
    try {
      await tripsApi.addFavorite(result.id);
      setFavorited(true);
      showSuccess('Viagem adicionada aos favoritos!');
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Erro ao favoritar';
      if (msg.toLowerCase().includes('ja')) {
        setFavorited(true);
        showError('Voce ja favoritou esta viagem');
      } else {
        showError(msg);
      }
    } finally {
      setFavoriting(false);
    }
  };

  const savingsPct = result.savings > 0 ? Math.round((result.savings / (result.totalPrice + result.savings)) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6 animate-[fadeIn_0.4s_ease]">
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold uppercase">{result.destination}</h2>
          <p className="text-secondary">
            {new Date(result.startDate).toLocaleDateString('pt-BR')} → {new Date(result.endDate).toLocaleDateString('pt-BR')}
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-primary">R$ {result.totalPrice.toFixed(2)}</p>
          {result.savings > 0 && (
            <span className="inline-block bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full mt-1">
              {savingsPct}% abaixo do orçamento
            </span>
          )}
        </div>
      </div>

      <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-700 flex items-center gap-2">
            <span className="text-xl">✈️</span> Voo
          </h3>
          <p className="text-sm"><span className="text-secondary">Companhia:</span> <strong>{result.flight.airline}</strong></p>
          <p className="text-sm"><span className="text-secondary">Preço:</span> R$ {result.flight.price.toFixed(2)}</p>
          <p className="text-sm"><span className="text-secondary">Escalas:</span> {result.flight.stops === 0 ? 'Direto' : result.flight.stops}</p>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-700 flex items-center gap-2">
            <span className="text-xl">🏨</span> Hotel
          </h3>
          <p className="text-sm"><span className="text-secondary">Nome:</span> <strong>{result.hotel.name}</strong></p>
          <p className="text-sm"><span className="text-secondary">Estrelas:</span> {result.hotel.stars} ⭐</p>
          <p className="text-sm"><span className="text-secondary">Nota:</span> {result.hotel.rating}/10</p>
          <p className="text-sm"><span className="text-secondary">Preço:</span> R$ {result.hotel.price.toFixed(2)}</p>
          {result.hotel.distanceToBeach !== undefined && (
            <p className="text-sm"><span className="text-secondary">Praia:</span> {result.hotel.distanceToBeach} km</p>
          )}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
        <p className="text-sm text-gray-700">
          <strong>🤖 Por que escolhemos esta opção:</strong> {result.aiJustification}
        </p>
      </div>

      <div className="flex gap-3 flex-wrap">
        <Button
          variant={favorited ? 'secondary' : 'primary'}
          onClick={handleFavorite}
          loading={favoriting}
          disabled={favorited}
        >
          {favorited ? '✓ Favoritado' : '♡ Favoritar'}
        </Button>
        <Button variant="outline" onClick={() => navigate('/')}>
          Nova pesquisa
        </Button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ResultCard;
