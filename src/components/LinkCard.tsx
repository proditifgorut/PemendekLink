import React, { useState } from 'react';
import { Copy, ExternalLink, TrendingUp, Calendar, Check, Trash2 } from 'lucide-react';
import { Link } from '../types/link';

interface LinkCardProps {
  link: Link;
  onDelete: (id: string) => void;
  onVisit: (shortCode: string) => void;
}

const LinkCard: React.FC<LinkCardProps> = ({ link, onDelete, onVisit }) => {
  const [copied, setCopied] = useState(false);
  
  const shortUrl = `${window.location.origin}/${link.shortCode}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Gagal menyalin:', err);
    }
  };

  const handleVisit = () => {
    onVisit(link.shortCode);
    window.open(link.originalUrl, '_blank');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-3 mb-3">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Tautan Pendek
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <code className="text-blue-600 font-mono text-sm md:text-base bg-blue-50 px-3 py-1 rounded-lg truncate">
                  {shortUrl}
                </code>
              </div>
              <p className="text-sm text-gray-600 truncate" title={link.originalUrl}>
                <span className="font-medium">Original: </span>
                {link.originalUrl}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="font-semibold text-gray-800">{link.clicks}</span>
              <span>klik</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>{formatDate(link.createdAt)}</span>
            </div>
          </div>
        </div>

        <div className="flex md:flex-col gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
            title="Salin tautan"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span className="hidden sm:inline">Tersalin</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span className="hidden sm:inline">Salin</span>
              </>
            )}
          </button>
          
          <button
            onClick={handleVisit}
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors font-medium"
            title="Kunjungi tautan"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline">Kunjungi</span>
          </button>

          <button
            onClick={() => onDelete(link.id)}
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
            title="Hapus tautan"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Hapus</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkCard;
