import React from 'react';
import { SearchHistory } from '../../types';
import { Link } from 'react-router-dom';

const HistoryList: React.FC<{ history: SearchHistory[] }> = ({ history }) => (
  <div className="space-y-4">
    {history.map((item) => (
      <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <p className="font-medium">{item.origin} → {item.destination}</p>
            <p className="text-sm text-secondary">
              {new Date(item.startDate).toLocaleDateString('pt-BR')} - {new Date(item.endDate).toLocaleDateString('pt-BR')}
            </p>
            <p className="text-sm">Orçamento: R$ {item.budget} | Viajantes: {item.travelers}</p>
          </div>
          <div className="text-right">
            {item.resultSummary && (
              <>
                <p className="text-primary font-bold">R$ {item.resultSummary.totalPrice?.toFixed(2)}</p>
                <Link to="/result" state={{ result: item.resultSummary }} className="text-sm text-primary hover:underline">
                  Ver resultado
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default HistoryList;
