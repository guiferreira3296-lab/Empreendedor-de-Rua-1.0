
import React, { useState, useEffect, useMemo } from 'react';
import { User, Transaction } from '../../types';

interface IncomeTrackerProps {
  user: User;
}

const IncomeTracker: React.FC<IncomeTrackerProps> = ({ user }) => {
  const [income, setIncome] = useState<Transaction[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const storedIncome = localStorage.getItem(`income_${user.id}`);
    if (storedIncome) {
      setIncome(JSON.parse(storedIncome));
    }
  }, [user.id]);

  const handleAddIncome = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (description.trim() && !isNaN(parsedAmount) && parsedAmount > 0) {
      const newIncome: Transaction = {
        id: new Date().toISOString(),
        date: new Date().toISOString(),
        description: description.trim(),
        quantity: 1,
        unitPrice: parsedAmount,
        total: parsedAmount,
      };
      const updatedIncome = [...income, newIncome];
      setIncome(updatedIncome);
      localStorage.setItem(`income_${user.id}`, JSON.stringify(updatedIncome));
      setDescription('');
      setAmount('');
    }
  };

  const totalIncome = useMemo(() => {
    return income.reduce((sum, item) => sum + item.total, 0);
  }, [income]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-brand-brown/20 animate-fade-in-up">
      <h3 className="font-display text-2xl font-bold text-brand-brown mb-4">Controle de Ganhos</h3>
      
      {/* Form */}
      <form onSubmit={handleAddIncome} className="mb-6 flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-grow w-full">
          <label htmlFor="income-desc" className="block text-sm font-medium text-brand-brown/80 mb-1">Descrição do Ganho</label>
          <input
            id="income-desc"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: Venda de 10 brigadeiros"
            className="w-full px-4 py-2 border-2 border-brand-brown/30 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange"
          />
        </div>
        <div className="w-full sm:w-48">
          <label htmlFor="income-amount" className="block text-sm font-medium text-brand-brown/80 mb-1">Valor (R$)</label>
          <input
            id="income-amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="50,00"
            className="w-full px-4 py-2 border-2 border-brand-brown/30 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange"
          />
        </div>
        <button type="submit" className="w-full sm:w-auto bg-brand-green hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md transition duration-300">
          Adicionar
        </button>
      </form>

      {/* Summary */}
      <div className="bg-green-100 border-l-4 border-brand-green text-green-800 p-4 rounded-md mb-6">
        <p className="font-bold text-lg">Total de Ganhos: R$ {totalIncome.toFixed(2).replace('.', ',')}</p>
      </div>

      {/* List */}
      <div className="space-y-3">
        <h4 className="font-bold text-lg text-brand-brown">Histórico de Ganhos</h4>
        {income.length === 0 ? (
          <p className="text-brand-brown/70">Nenhum ganho registrado ainda.</p>
        ) : (
          <ul className="divide-y divide-brand-brown/20">
            {income.map(item => (
              <li key={item.id} className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.description}</p>
                  <p className="text-sm text-brand-brown/60">{new Date(item.date).toLocaleDateString('pt-BR')}</p>
                </div>
                <p className="font-bold text-brand-green">+ R$ {item.total.toFixed(2).replace('.', ',')}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default IncomeTracker;
