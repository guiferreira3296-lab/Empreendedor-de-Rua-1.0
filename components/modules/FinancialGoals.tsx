
import React, { useState, useEffect } from 'react';
import { User, Goal } from '../../types';

interface FinancialGoalsProps {
  user: User;
}

const FinancialGoals: React.FC<FinancialGoalsProps> = ({ user }) => {
  const [goals, setGoals] = useState<Goal>({ daily: 0, weekly: 0, monthly: 0 });
  const [formState, setFormState] = useState<Goal>({ daily: 0, weekly: 0, monthly: 0 });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const storedGoals = localStorage.getItem(`financialGoals_${user.id}`);
    if (storedGoals) {
      const parsedGoals = JSON.parse(storedGoals);
      setGoals(parsedGoals);
      setFormState(parsedGoals);
    }
  }, [user.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };
  
  const handleSaveGoals = (e: React.FormEvent) => {
    e.preventDefault();
    setGoals(formState);
    localStorage.setItem(`financialGoals_${user.id}`, JSON.stringify(formState));
    setSuccessMessage('Metas salvas com sucesso!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-brand-brown/20 animate-fade-in-up">
      <h3 className="font-display text-2xl font-bold text-brand-brown mb-4">Metas Financeiras</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-orange-100 p-4 rounded-lg text-center">
          <p className="text-sm font-bold text-orange-800">META DIÁRIA</p>
          <p className="text-2xl font-bold text-brand-brown">R$ {goals.daily.toFixed(2).replace('.', ',')}</p>
        </div>
        <div className="bg-orange-100 p-4 rounded-lg text-center">
          <p className="text-sm font-bold text-orange-800">META SEMANAL</p>
          <p className="text-2xl font-bold text-brand-brown">R$ {goals.weekly.toFixed(2).replace('.', ',')}</p>
        </div>
        <div className="bg-orange-100 p-4 rounded-lg text-center">
          <p className="text-sm font-bold text-orange-800">META MENSAL</p>
          <p className="text-2xl font-bold text-brand-brown">R$ {goals.monthly.toFixed(2).replace('.', ',')}</p>
        </div>
      </div>
      
      <form onSubmit={handleSaveGoals} className="space-y-4">
        <h4 className="font-bold text-lg text-brand-brown border-b border-brand-brown/20 pb-2">Definir Novas Metas</h4>
        <div>
          <label htmlFor="daily" className="block text-sm font-medium text-brand-brown/80 mb-1">Meta Diária (R$)</label>
          <input
            id="daily"
            name="daily"
            type="number"
            value={formState.daily}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border-2 border-brand-brown/30 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange"
          />
        </div>
        <div>
          <label htmlFor="weekly" className="block text-sm font-medium text-brand-brown/80 mb-1">Meta Semanal (R$)</label>
          <input
            id="weekly"
            name="weekly"
            type="number"
            value={formState.weekly}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border-2 border-brand-brown/30 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange"
          />
        </div>
        <div>
          <label htmlFor="monthly" className="block text-sm font-medium text-brand-brown/80 mb-1">Meta Mensal (R$)</label>
          <input
            id="monthly"
            name="monthly"
            type="number"
            value={formState.monthly}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border-2 border-brand-brown/30 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange"
          />
        </div>
        <div className="flex items-center gap-4">
          <button type="submit" className="bg-brand-orange hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-md transition duration-300">
            Salvar Metas
          </button>
          {successMessage && <p className="text-brand-green font-semibold">{successMessage}</p>}
        </div>
      </form>
    </div>
  );
};

export default FinancialGoals;
