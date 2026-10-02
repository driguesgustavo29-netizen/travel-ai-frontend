import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrips } from '../../hooks/useTrips';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { showError, showSuccess } from '../../utils/toast';

const SearchForm = () => {
  const navigate = useNavigate();
  const { searchTrip, loading } = useTrips();
  const [form, setForm] = useState({
    origin: '',
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    budget: 5000,
    tripType: 'economia',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.origin || form.origin.length < 3) {
      newErrors.origin = 'Informe o aeroporto de origem (ex: GRU)';
    }
    if (!form.destination || form.destination.length < 3) {
      newErrors.destination = 'Informe o aeroporto de destino (ex: MCO)';
    }
    if (!form.startDate) newErrors.startDate = 'Informe a data de ida';
    if (!form.endDate) newErrors.endDate = 'Informe a data de volta';

    if (form.startDate && form.endDate) {
      const start = new Date(form.startDate);
      const end = new Date(form.endDate);
      if (end <= start) {
        newErrors.endDate = 'A data de volta deve ser depois da ida';
      }
    }

    if (form.travelers < 1) newErrors.travelers = 'Mínimo 1 viajante';
    if (form.budget < 100) newErrors.budget = 'Orçamento mínimo: R$ 100';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showError('Corrija os campos destacados');
      return;
    }

    try {
      const result = await searchTrip({
        origin: form.origin.toUpperCase(),
        destination: form.destination.toUpperCase(),
        startDate: form.startDate,
        endDate: form.endDate,
        travelers: Number(form.travelers),
        budget: Number(form.budget),
        tripType: form.tripType,
      });
      showSuccess('Melhor viagem encontrada!');
      navigate('/result', { state: { result } });
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Erro ao buscar viagens';
      showError(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm space-y-4 max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Origem (ex: GRU)"
          name="origin"
          value={form.origin}
          onChange={handleChange}
          placeholder="GRU"
          error={errors.origin}
        />
        <Input
          label="Destino (ex: MCO)"
          name="destination"
          value={form.destination}
          onChange={handleChange}
          placeholder="MCO"
          error={errors.destination}
        />
        <Input
          label="Data de ida"
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          error={errors.startDate}
        />
        <Input
          label="Data de volta"
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          error={errors.endDate}
        />
        <Input
          label="Número de viajantes"
          type="number"
          name="travelers"
          value={form.travelers}
          onChange={handleChange}
          min={1}
          error={errors.travelers}
        />
        <Input
          label="Orçamento (R$)"
          type="number"
          name="budget"
          value={form.budget}
          onChange={handleChange}
          min={0}
          error={errors.budget}
        />
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de viagem</label>
          <select
            name="tripType"
            value={form.tripType}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          >
            <option value="economia">💰 Economia</option>
            <option value="familia">👨‍👩‍👧 Família</option>
            <option value="romantica">💕 Romântica</option>
            <option value="aventura">🏔️ Aventura</option>
          </select>
        </div>
      </div>
      <Button type="submit" className="w-full" loading={loading}>
        Encontrar melhor viagem
      </Button>
    </form>
  );
};

export default SearchForm;
