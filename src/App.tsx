import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import UrlShortenerForm from './components/UrlShortenerForm';
import LinkCard from './components/LinkCard';
import StatsOverview from './components/StatsOverview';
import EmptyState from './components/EmptyState';
import { Link } from './types/link';
import { saveLinks, getLinks, saveClick } from './utils/storage';

function App() {
  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    const storedLinks = getLinks();
    setLinks(storedLinks);
  }, []);

  const handleShorten = (newLink: Link) => {
    const updatedLinks = [newLink, ...links];
    setLinks(updatedLinks);
    saveLinks(updatedLinks);
  };

  const handleDelete = (id: string) => {
    const updatedLinks = links.filter(link => link.id !== id);
    setLinks(updatedLinks);
    saveLinks(updatedLinks);
  };

  const handleVisit = (shortCode: string) => {
    const updatedLinks = links.map(link => {
      if (link.shortCode === shortCode) {
        const updated = {
          ...link,
          clicks: link.clicks + 1,
          lastClicked: new Date().toISOString()
        };
        saveClick({
          timestamp: new Date().toISOString(),
          shortCode
        });
        return updated;
      }
      return link;
    });
    setLinks(updatedLinks);
    saveLinks(updatedLinks);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <UrlShortenerForm onShorten={handleShorten} />
          
          {links.length > 0 && (
            <StatsOverview links={links} />
          )}

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              Tautan Anda
              {links.length > 0 && (
                <span className="bg-purple-100 text-purple-700 text-sm font-semibold px-3 py-1 rounded-full">
                  {links.length}
                </span>
              )}
            </h2>
            
            {links.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="space-y-4">
                {links.map(link => (
                  <LinkCard
                    key={link.id}
                    link={link}
                    onDelete={handleDelete}
                    onVisit={handleVisit}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="max-w-6xl mx-auto px-4 py-8 mt-12">
        <div className="text-center text-gray-600 text-sm">
          <p>© 2025 Pemendek Link. Semua data tersimpan lokal di browser Anda.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
