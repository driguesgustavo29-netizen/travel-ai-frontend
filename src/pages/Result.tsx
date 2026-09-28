import React from 'react';
import { useLocation } from 'react-router-dom';
import { TripResult } from '../types';
import ResultCard from '../components/trips/ResultCard';

const Result = () => {
  const location = useLocation();
  const result = location.state?.result as TripResult;
  if (!result) return <div>Nenhum resultado. Faça uma pesquisa.</div>;
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">A melhor viagem para você</h1>
      <ResultCard result={result} />
    </div>
  );
};

export default Result;
