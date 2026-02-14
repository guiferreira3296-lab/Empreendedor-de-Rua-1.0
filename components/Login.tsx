
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (email: string, pass: string) => boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = onLogin(email, password);
    if (!success) {
      setError('E-mail ou senha inválidos. Verifique seus dados.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-brown p-4">
      <div className="w-full max-w-md bg-brand-sand p-8 rounded-lg shadow-2xl border-4 border-brand-orange/50">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-brown">
            Empreendedor de Rua
          </h1>
          <p className="text-brand-brown/80 mt-2">Seu cérebro financeiro na palma da mão.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-brand-brown font-bold mb-2">E-mail de Acesso</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border-2 border-brand-brown/30 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange"
              placeholder="seu-email@exemplo.com"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-brand-brown font-bold mb-2">Sua Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border-2 border-brand-brown/30 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange"
              placeholder="********"
              required
            />
          </div>
          {error && <p className="text-brand-red text-sm text-center mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Entrar
          </button>
        </form>
        <p className="text-xs text-center text-brand-brown/60 mt-6">
          Acesso exclusivo para clientes. Use o e-mail da sua compra.
        </p>
      </div>
    </div>
  );
};

export default Login;
