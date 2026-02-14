
import React, { useState, useEffect } from 'react';
import { User, ScriptContent } from '../../types';

interface ScriptsManagerProps {
  user: User;
}

const ScriptsManager: React.FC<ScriptsManagerProps> = ({ user }) => {
  const [scripts, setScripts] = useState<ScriptContent[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const storedScripts = localStorage.getItem(`scriptsContent_${user.id}`);
    if (storedScripts) {
      setScripts(JSON.parse(storedScripts));
    }
  }, [user.id]);

  const handleAddScript = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      const newScript: ScriptContent = {
        id: new Date().toISOString(),
        title: title.trim(),
        content: content.trim(),
      };
      const updatedScripts = [...scripts, newScript];
      setScripts(updatedScripts);
      localStorage.setItem(`scriptsContent_${user.id}`, JSON.stringify(updatedScripts));
      setTitle('');
      setContent('');
    }
  };

  const handleDownloadScript = (script: ScriptContent) => {
    const blob = new Blob([script.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const fileName = `${script.title.replace(/\s+/g, '_').toLowerCase()}.txt`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-brand-brown/20 animate-fade-in-up">
      <h3 className="font-display text-2xl font-bold text-brand-brown mb-4">Gerenciador de Scripts</h3>
      
      <form onSubmit={handleAddScript} className="mb-8 p-4 border border-brand-brown/20 rounded-lg space-y-4">
        <h4 className="font-bold text-lg text-brand-brown">Adicionar Novo Script</h4>
        <div>
          <label htmlFor="script-title" className="block text-sm font-medium text-brand-brown/80 mb-1">Título do Script</label>
          <input
            id="script-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border-2 border-brand-brown/30 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange"
            required
          />
        </div>
        <div>
          <label htmlFor="script-content" className="block text-sm font-medium text-brand-brown/80 mb-1">Conteúdo do Script</label>
          <textarea
            id="script-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full px-4 py-2 border-2 border-brand-brown/30 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange"
            placeholder="Escreva aqui o seu script de vendas, mensagem motivacional, etc."
            required
          />
        </div>
        <button type="submit" className="bg-brand-orange hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-md transition duration-300">
          Adicionar Script
        </button>
      </form>

      <div className="space-y-4">
        <h4 className="font-bold text-lg text-brand-brown">Scripts Salvos</h4>
        {scripts.length === 0 ? (
          <p className="text-brand-brown/70">Nenhum script adicionado ainda.</p>
        ) : (
          scripts.map(script => (
            <div key={script.id} className="p-4 border border-brand-brown/20 rounded-lg">
              <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-bold text-brand-orange">{script.title}</h5>
                    <p className="text-sm text-brand-brown/80 my-1 whitespace-pre-wrap">{script.content}</p>
                  </div>
                  <button 
                    onClick={() => handleDownloadScript(script)}
                    className="ml-4 flex-shrink-0 bg-brand-green hover:bg-green-700 text-white font-bold py-1 px-3 text-sm rounded-md transition duration-300"
                  >
                    Baixar
                  </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ScriptsManager;
