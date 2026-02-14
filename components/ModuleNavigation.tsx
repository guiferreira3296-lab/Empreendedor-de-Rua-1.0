
import React from 'react';

export type Module = 'expenses' | 'income' | 'goals' | 'content' | 'scripts';

interface ModuleNavigationProps {
  activeModule: Module;
  setActiveModule: (module: Module) => void;
}

const NavButton: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => {
  const baseClasses = "flex flex-col sm:flex-row items-center justify-center sm:justify-start text-center sm:text-left gap-2 p-3 rounded-lg transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-brand-orange";
  const activeClasses = "bg-brand-brown text-white shadow-lg scale-105";
  const inactiveClasses = "bg-white text-brand-brown hover:bg-brand-brown/10";
  
  return (
    <button onClick={onClick} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`} aria-pressed={isActive}>
      {icon}
      <span className="font-bold">{label}</span>
    </button>
  );
};


const ModuleNavigation: React.FC<ModuleNavigationProps> = ({ activeModule, setActiveModule }) => {
  const modules: { id: Module, label: string, icon: React.ReactNode }[] = [
    { id: 'expenses', label: 'Gastos', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 10v-1m0 0a2.5 2.5 0 000-5m0 5a2.5 2.5 0 010-5m0 0V7m0 0a2.5 2.5 0 012.5-2.5M12 7a2.5 2.5 0 00-2.5-2.5M6 12a6 6 0 016-6m0 12a6 6 0 01-6-6m0 0H4.5M18 12h1.5" /></svg> },
    { id: 'income', label: 'Ganhos', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 10v-1m0 0a2.5 2.5 0 000-5m0 5a2.5 2.5 0 010-5m0 0V7m0 0a2.5 2.5 0 012.5-2.5M12 7a2.5 2.5 0 00-2.5-2.5M6 12a6 6 0 016-6m0 12a6 6 0 01-6-6m0 0H4.5M18 12h1.5" /></svg> },
    { id: 'goals', label: 'Metas', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M12 12a5 5 0 110-10 5 5 0 010 10z" /></svg> },
    { id: 'content', label: 'Conteúdo', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { id: 'scripts', label: 'Scripts', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> }
  ];

  return (
    <nav className="grid grid-cols-2 sm:grid-cols-5 gap-4">
      {modules.map(module => (
        <NavButton
          key={module.id}
          label={module.label}
          icon={module.icon}
          isActive={activeModule === module.id}
          onClick={() => setActiveModule(module.id)}
        />
      ))}
    </nav>
  );
};

export default ModuleNavigation;
