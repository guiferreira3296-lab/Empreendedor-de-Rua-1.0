
import React, { useState, useEffect } from 'react';
import { User, VideoContent } from '../../types';

interface ContentManagerProps {
  user: User;
}

const ContentManager: React.FC<ContentManagerProps> = ({ user }) => {
  const [videos, setVideos] = useState<VideoContent[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedVideos = localStorage.getItem(`videoContent_${user.id}`);
    if (storedVideos) {
      setVideos(JSON.parse(storedVideos));
    }
  }, [user.id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('O arquivo excede o limite de 5MB para o armazenamento no navegador.');
        setVideoFile(null);
      } else {
        setError('');
        setVideoFile(file);
      }
    }
  };
  
  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim() && videoFile) {
      const reader = new FileReader();
      reader.readAsDataURL(videoFile);
      reader.onload = () => {
        const newVideo: VideoContent = {
          id: new Date().toISOString(),
          title: title.trim(),
          description: description.trim(),
          videoData: reader.result as string,
          fileName: videoFile.name,
          fileType: videoFile.type,
        };
        const updatedVideos = [...videos, newVideo];
        setVideos(updatedVideos);
        localStorage.setItem(`videoContent_${user.id}`, JSON.stringify(updatedVideos));
        
        // Reset form
        setTitle('');
        setDescription('');
        setVideoFile(null);
        setError('');
        // Reset file input visually
        const fileInput = document.getElementById('video-file') as HTMLInputElement;
        if(fileInput) fileInput.value = '';
      };
      reader.onerror = () => {
        setError('Falha ao ler o arquivo de vídeo.');
      };
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-brand-brown/20 animate-fade-in-up">
      <h3 className="font-display text-2xl font-bold text-brand-brown mb-4">Gerenciador de Conteúdo</h3>
      
      <form onSubmit={handleAddVideo} className="mb-8 p-4 border border-brand-brown/20 rounded-lg space-y-4">
        <h4 className="font-bold text-lg text-brand-brown">Adicionar Novo Vídeo</h4>
        <div>
          <label htmlFor="video-title" className="block text-sm font-medium text-brand-brown/80 mb-1">Título do Vídeo</label>
          <input
            id="video-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border-2 border-brand-brown/30 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange"
            required
          />
        </div>
        <div>
          <label htmlFor="video-desc" className="block text-sm font-medium text-brand-brown/80 mb-1">Descrição</label>
          <textarea
            id="video-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border-2 border-brand-brown/30 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange"
            required
          />
        </div>
        <div>
          <label htmlFor="video-file" className="block text-sm font-medium text-brand-brown/80 mb-1">Arquivo de Vídeo</label>
          <input
            id="video-file"
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full text-sm text-brand-brown file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brand-orange/20 file:text-brand-orange hover:file:bg-brand-orange/30"
            required
          />
          {videoFile && <p className="text-xs text-brand-brown/70 mt-1">Selecionado: {videoFile.name}</p>}
          {error && <p className="text-sm text-brand-red mt-1">{error}</p>}
        </div>
        <button type="submit" className="bg-brand-orange hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-md transition duration-300 disabled:bg-gray-400" disabled={!videoFile || !!error}>
          Adicionar Conteúdo
        </button>
      </form>

      <div className="space-y-4">
        <h4 className="font-bold text-lg text-brand-brown">Conteúdo Existente</h4>
        {videos.length === 0 ? (
          <p className="text-brand-brown/70">Nenhum conteúdo adicionado ainda.</p>
        ) : (
          videos.map(video => (
            <div key={video.id} className="p-4 border border-brand-brown/20 rounded-lg">
              <h5 className="font-bold text-brand-orange">{video.title}</h5>
              <p className="text-sm text-brand-brown/80 my-2">{video.description}</p>
              <video controls className="w-full max-w-sm rounded-md mt-2">
                <source src={video.videoData} type={video.fileType} />
                Seu navegador não suporta a tag de vídeo.
              </video>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContentManager;
