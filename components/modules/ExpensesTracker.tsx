
import React, { useState, useEffect, useMemo } from 'react';
import { User, Transaction } from '../../types';

interface ExpensesTrackerProps {
  user: User;
}

const ExpensesTracker: React.FC<ExpensesTrackerProps> = ({ user }) => {
  const [expenses, setExpenses] = useState<Transaction[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const storedExpenses = localStorage.getItem(`expenses_${user.id}`);
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
  }, [user.id]);

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount.replace(',', '.'));
    if (description.trim() && !isNaN(parsedAmount) && parsedAmount > 0) {
      const newExpense: Transaction = {
        id: new Date().toISOString(),
        date: new Date().toISOString(),
        description: description.trim(),
        quantity: 1,
        unitPrice: parsedAmount,
        total: parsedAmount,
      };
      const updatedExpenses = [...expenses, newExpense];
      setExpenses(updatedExpenses);
      localStorage.setItem(`expenses_${user.id}`, JSON.stringify(updatedExpenses));
      setDescription('');
      setAmount('');
    }
  };

  const totalExpenses = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + expense.total, 0);
  }, [expenses]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-brand-brown/20 animate-fade-in-up">
      <h3 className="font-display text-2xl font-bold text-brand-brown mb-4">Controle de Gastos</h3>
      
      {/* Form */}
      <form onSubmit={handleAddExpense} className="mb-6 flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-grow w-full">
          <label htmlFor="expense-desc" className="block text-sm font-medium text-brand-brown/80 mb-1">Descrição do Gasto</label>
          <input
            id="expense-desc"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: Ingredientes, Embalagens"
            className="w-full px-4 py-2 border-2 border-brand-brown/30 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange"
          />
        </div>
        <div className="w-full sm:w-48">
          <label htmlFor="expense-amount" className="block text-sm font-medium text-brand-brown/80 mb-1">Valor (R$)</label>
          <input
            id="expense-amount"
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="25,50"
            className="w-full px-4 py-2 border-2 border-brand-brown/30 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange"
          />
        </div>
        <button type="submit" className="w-full sm:w-auto bg-brand-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md transition duration-300">
          Adicionar
        </button>
      </form>

      {/* Summary */}
      <div className="bg-red-100 border-l-4 border-brand-red text-red-800 p-4 rounded-md mb-6">
        <p className="font-bold text-lg">Total de Gastos: R$ {totalExpenses.toFixed(2).replace('.', ',')}</p>
      </div>

      {/* List */}
      <div className="space-y-3">
        <h4 className="font-bold text-lg text-brand-brown">Histórico de Gastos</h4>
        {expenses.length === 0 ? (
          <p className="text-brand-brown/70">Nenhum gasto registrado ainda.</p>
        ) : (
          <ul className="divide-y divide-brand-brown/20">
            {expenses.map(exp => (
              <li key={exp.id} className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{exp.description}</p>
                  <p className="text-sm text-brand-brown/60">{new Date(exp.date).toLocaleDateString('pt-BR')}</p>
                </div>
                <p className="font-bold text-brand-red">- R$ {exp.total.toFixed(2).replace('.', ',')}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExpensesTracker;