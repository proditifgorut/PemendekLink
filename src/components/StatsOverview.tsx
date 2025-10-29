import React from 'react';
import { Link2, TrendingUp, MousePointerClick } from 'lucide-react';
import { Link } from '../types/link';

interface StatsOverviewProps {
  links: Link[];
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ links }) => {
  const totalLinks = links.length;
  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);
  const avgClicks = totalLinks > 0 ? (totalClicks / totalLinks).toFixed(1) : '0';

  const stats = [
    {
      label: 'Total Tautan',
      value: totalLinks,
      icon: Link2,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      label: 'Total Klik',
      value: totalClicks,
      icon: MousePointerClick,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      label: 'Rata-rata Klik',
      value: avgClicks,
      icon: TrendingUp,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className={`${stat.bgColor} p-3 rounded-lg`}>
              <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
            </div>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;
