import React, { useState } from 'react';
import { Link2, Sparkles } from 'lucide-react';
import { isValidUrl, formatUrl, generateShortCode } from '../utils/urlShortener';
import { Link } from '../types/link';

interface UrlShortenerFormProps {
  onShorten: (link: Link) => void;
}

const UrlShortenerForm: React.FC<UrlShortenerFormProps> = ({ onShorten }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!url.trim()) {
      setError('Silakan masukkan URL');
      return;
    }

    const formattedUrl = formatUrl(url.trim());

    if (!isValidUrl(formattedUrl)) {
      setError('URL tidak valid. Contoh: https://example.com');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const newLink: Link = {
        id: Date.now().toString(),
        originalUrl: formattedUrl,
        shortCode: generateShortCode(),
        clicks: 0,
        createdAt: new Date().toISOString(),
      };

      onShorten(newLink);
      setUrl('');
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-6 h-6 text-purple-600" />
        <h2 className="text-2xl font-bold text-gray-800">Perpendek Tautan Anda</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
            Masukkan URL panjang
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Link2 className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/tautan-panjang-anda"
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
            />
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Memproses...
            </>
          ) : (
            <>
              <Link2 className="w-5 h-5" />
              Perpendek Sekarang
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default UrlShortenerForm;
