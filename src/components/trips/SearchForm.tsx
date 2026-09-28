import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrips } from '../../hooks/useTrips';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

const SearchForm = () => {
  const navigate = useNavigate();
  const { searchTrip, loading } = useTrips();
  const [form, setForm] = useState({
    origin: '', destination: '', startDate: '', endDate: '',
    travelers: 1, budget: 5000, tripType: 'economia',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const result = await searchTrip({
        origin: form.origin, destination: form.destination,
        startDate: form.startDate, endDate: form.endDate,
        travelers: Number(form.travelers), budget: Number(form.budget),
        tripType: form.tripType,
      });
      navigate('/result', { state: { result } });
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Erro ao buscar viagens');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm space-y-4 max-w-3xl">
      {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Origem (ex: GRU)" name="origin" value={form.origin} onChange={handleChange} placeholder="GRU" required />
        <Input label="Destino (ex: MCO)" name="destination" value={form.destination} onChange={handleChange} placeholder="MCO" required />
        <Input label="Data de ida" type="date" name="startDate" value={form.startDate} onChange={handleChange} required />
        <Input label="Data de volta" type="date" name="endDate" value={form.endDate} onChange={handleChange} required />
        <Input label="Número de viajantes" type="number" name="travelers" value={form.travelers} onChange={handleChange} min={1} required />
        <Input label="Orçamento (R$)" type="number" name="budget" value={form.budget} onChange={handleChange} min={0} required />
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de viagem</label>
          <select name="tripType" value={form.tripType} onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none">
            <option value="economia">Economia</option>
            <option value="familia">Família</option>
            <option value="romantica">Romântica</option>
            <option value="aventura">Aventura</option>
          </select>
        </div>
      </div>
      <Button type="submit" className="w-full" loading={loading}>Encontrar melhor viagem</Button>
    </form>
  );
};

export default SearchForm;
