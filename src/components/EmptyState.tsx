import React from 'react';
import { LinkIcon } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-100">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-4">
        <LinkIcon className="w-10 h-10 text-purple-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Belum Ada Tautan
      </h3>
      <p className="text-gray-600 max-w-md mx-auto">
        Mulai perpendek tautan Anda dan lihat statistiknya di sini. Semua data tersimpan lokal di browser Anda.
      </p>
    </div>
  );
};

export default EmptyState;
