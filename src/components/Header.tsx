import React from 'react';
import { Link2 } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 px-4 shadow-lg">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
            <Link2 className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Pemendek Link</h1>
            <p className="text-blue-100 text-sm md:text-base">Perpendek tautan Anda & lacak analitik</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
