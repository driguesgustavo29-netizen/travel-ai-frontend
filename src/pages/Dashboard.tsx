import React from 'react';
import SearchForm from '../components/trips/SearchForm';

const Dashboard = () => (
  <div>
    <h1 className="text-3xl font-bold text-gray-800 mb-2">Planeje sua viagem</h1>
    <p className="text-secondary mb-8">Responda algumas perguntas e nossa IA encontrará a melhor opção para você.</p>
    <SearchForm />
  </div>
);

export default Dashboard;
