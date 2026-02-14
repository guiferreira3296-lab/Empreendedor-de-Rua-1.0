
import React, { useState, useEffect, useMemo } from 'react';
import { User, Transaction } from '../../types';
import { MOTIVATIONAL_MESSAGES } from '../../constants';
import { BRAZILIAN_REAIS_BACKGROUND } from '../../assets';

interface IncomeTrackerProps {
  user: User;
}

const getWeekNumber = (d: Date): number => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return weekNo;
}

const getStartOfWeek = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const weekStartDate = new Date(d.setDate(diff));
    weekStartDate.setHours(0, 0, 0, 0);
    return weekStartDate;
};


const IncomeTracker: React.FC<IncomeTrackerProps> = ({ user }) => {
  const [income, setIncome] = useState<Transaction[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const storedIncome = localStorage.getItem(`income_${user.id}`);
    if (storedIncome) {
      setIncome(JSON.parse(storedIncome));
    }
  }, [user.id]);
  
  const showMotivationalModal = () => {
    const message = MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)];
    setModalMessage(message);
    setShowGoalModal(true);

    // Intensifica a animação de fundo
    document.body.classList.add('goal-achieved');
    // Reverte a animação ao normal após 4 segundos
    setTimeout(() => {
        document.body.classList.remove('goal-achieved');
    }, 4000);
  };

  const checkGoals = (updatedIncome: Transaction[]) => {
    const storedGoals = localStorage.getItem(`financialGoals_${user.id}`);
    if (!storedGoals) return;

    const goals = JSON.parse(storedGoals);
    if (Object.values(goals).every(g => g === 0)) return;

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = getStartOfWeek(new Date());
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const dailyIncome = updatedIncome.filter(i => new Date(i.date) >= todayStart).reduce((sum, i) => sum + i.total, 0);
    const weeklyIncome = updatedIncome.filter(i => new Date(i.date) >= weekStart).reduce((sum, i) => sum + i.total, 0);
    const monthlyIncome = updatedIncome.filter(i => new Date(i.date) >= monthStart).reduce((sum, i) => sum + i.total, 0);

    const todayStr = todayStart.toISOString().split('T')[0];
    const weekStr = `${weekStart.getFullYear()}-W${getWeekNumber(now)}`;
    const monthStr = `${monthStart.getFullYear()}-${monthStart.getMonth() + 1}`;

    const dailyGoalMetKey = `dailyGoalMet_${user.id}_${todayStr}`;
    if (goals.daily > 0 && dailyIncome >= goals.daily && !localStorage.getItem(dailyGoalMetKey)) {
        showMotivationalModal();
        localStorage.setItem(dailyGoalMetKey, 'true');
        return;
    }

    const weeklyGoalMetKey = `weeklyGoalMet_${user.id}_${weekStr}`;
    if (goals.weekly > 0 && weeklyIncome >= goals.weekly && !localStorage.getItem(weeklyGoalMetKey)) {
        showMotivationalModal();
        localStorage.setItem(weeklyGoalMetKey, 'true');
        return;
    }

    const monthlyGoalMetKey = `monthlyGoalMet_${user.id}_${monthStr}`;
    if (goals.monthly > 0 && monthlyIncome >= goals.monthly && !localStorage.getItem(monthlyGoalMetKey)) {
        showMotivationalModal();
        localStorage.setItem(monthlyGoalMetKey, 'true');
        return;
    }
  };

  const handleAddIncome = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount.replace(',', '.'));
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
      checkGoals(updatedIncome);
    }
  };

  const totalIncome = useMemo(() => {
    return income.reduce((sum, item) => sum + item.total, 0);
  }, [income]);

  return (
    <>
      {showGoalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
            <div className="bg-brand-sand p-8 rounded-lg shadow-2xl w-full max-w-md text-center animate-fade-in-up">
                <h2 className="font-display text-2xl font-bold mb-4 text-brand-green">Meta Alcançada!</h2>
                <p className="mb-6 text-brand-brown text-lg">{modalMessage}</p>
                <button
                    onClick={() => setShowGoalModal(false)}
                    className="bg-brand-orange hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-md transition duration-300"
                >
                    Continuar
                </button>
            </div>
        </div>
      )}
      <div 
        className="p-6 rounded-lg shadow-md border border-brand-brown/20 animate-fade-in-up relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${BRAZILIAN_REAIS_BACKGROUND})` }}
      >
        <div className="absolute inset-0 bg-white/85 z-0"></div>
        <div className="relative z-10">
            <h3 className="font-display text-2xl font-bold text-brand-brown mb-4">Controle de Ganhos</h3>
            
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
                  type="text"
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

            <div className="bg-green-100 border-l-4 border-brand-green text-green-800 p-4 rounded-md mb-6">
              <p className="font-bold text-lg">Total de Ganhos: R$ {totalIncome.toFixed(2).replace('.', ',')}</p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-lg text-brand-brown">Histórico de Ganhos</h4>
              {income.length === 0 ? (
                <p className="text-brand-brown/70">Nenhum ganho registrado ainda.</p>
              ) : (
                <ul className="divide-y divide-brand-brown/20">
                  {income.map(item => (
                    <li key={item.id} className="py-3 flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-brand-brown">{item.description}</p>
                        <p className="text-sm text-brand-brown/60">{new Date(item.date).toLocaleDateString('pt-BR')}</p>
                      </div>
                      <p className="font-bold text-brand-green">+ R$ {item.total.toFixed(2).replace('.', ',')}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
        </div>
      </div>
    </>
  );
};

export default IncomeTracker;