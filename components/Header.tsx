
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-brand-brown text-brand-sand shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <h1 className="font-display text-2xl font-bold">Empreendedor de Rua</h1>
      </div>
    </header>
  );
};

export default Header;
