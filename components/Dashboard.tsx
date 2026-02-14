
import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import ModuleNavigation, { Module } from './ModuleNavigation';
import ExpensesTracker from './modules/ExpensesTracker';
import IncomeTracker from './modules/IncomeTracker';
import FinancialGoals from './modules/FinancialGoals';
import ContentManager from './modules/ContentManager';
import ScriptsManager from './modules/ScriptsManager';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [businessType, setBusinessType] = useState('');
  const [showBusinessModal, setShowBusinessModal] = useState(false);
  const [activeModule, setActiveModule] = useState<Module>('expenses');

  useEffect(() => {
    const storedBusinessType = localStorage.getItem(`businessType_${user.id}`);
    if (storedBusinessType) {
      setBusinessType(storedBusinessType);
    } else {
      setShowBusinessModal(true);
    }
  }, [user.id]);

  const handleBusinessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedBusinessType = businessType.trim();
    if (trimmedBusinessType) {
      localStorage.setItem(`businessType_${user.id}`, trimmedBusinessType);
      setBusinessType(trimmedBusinessType);
      setShowBusinessModal(false);
    }
  };

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'expenses':
        return <ExpensesTracker user={user} />;
      case 'income':
        return <IncomeTracker user={user} />;
      case 'goals':
        return <FinancialGoals user={user} />;
      case 'content':
        return <ContentManager user={user} />;
      case 'scripts':
        return <ScriptsManager user={user} />;
      default:
        return <ExpensesTracker user={user} />;
    }
  };

  const welcomeMessage = businessType 
    ? `Seu painel para: ${businessType}`
    : `Bem-vindo(a), Empreendedor(a)!`;

  return (
    <div className="container mx-auto">
      {showBusinessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
          <div className="bg-brand-sand p-8 rounded-lg shadow-2xl w-full max-w-md animate-fade-in-up">
            <h2 className="font-display text-2xl font-bold mb-4 text-brand-brown">Qual o seu ramo de negócio?</h2>
            <p className="mb-6 text-brand-brown/80">Para começar, me diga com o que você trabalha. Isso ajuda a personalizar sua experiência no app.</p>
            <form onSubmit={handleBusinessSubmit}>
              <label htmlFor="businessType" className="sr-only">Tipo de negócio</label>
              <input
                id="businessType"
                type="text"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full px-4 py-2 border-2 border-brand-brown/30 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange"
                placeholder="Ex: Brigadeiros, Salgados, Artesanato"
                required
              />
              <button
                type="submit"
                className="w-full mt-4 bg-brand-orange hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-md transition duration-300 transform hover:scale-105"
              >
                Salvar e Começar
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white/50 p-6 rounded-lg shadow-md border border-brand-brown/20 mb-8">
        <h2 className="font-display text-3xl font-bold">{welcomeMessage}</h2>
        <p className="mt-2 text-lg text-brand-brown/90">
          Aqui você controla as finanças, metas e conteúdos do seu negócio.
        </p>
      </div>
      
      <ModuleNavigation activeModule={activeModule} setActiveModule={setActiveModule} />

      <div className="mt-6">
        {renderActiveModule()}
      </div>
      
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Dashboard;
