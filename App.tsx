
import React from 'react';
import { User, UserRole } from './types';
import { USERS } from './constants';
import Dashboard from './components/Dashboard';
import Header from './components/Header';

const App: React.FC = () => {
  // Hardcode the creator user, assuming they are always present in constants.
  const creatorUser: User = USERS.find(u => u.role === UserRole.CRIADOR)!;

  if (!creatorUser) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-brand-sand p-4">
            <p className="text-brand-red font-bold text-center">Erro de configuração: Usuário Criador não foi encontrado.</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-sand text-brand-brown font-sans">
      <Header />
      <main className="p-4 md:p-8">
        <Dashboard user={creatorUser} />
      </main>
    </div>
  );
};

export default App;
