import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from './Button';

interface LayoutProps { children: React.ReactNode; }

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary">TravelAI</Link>
          <div className="flex items-center gap-3">
            {user && (
              <>
                <span className="text-sm text-gray-600 hidden md:inline">{user.name}</span>
                <Button variant="secondary" size="sm" onClick={() => navigate('/history')}>Histórico</Button>
                <Button variant="secondary" size="sm" onClick={() => navigate('/favorites')}>Favoritos</Button>
                <Button variant="outline" size="sm" onClick={() => { logout(); navigate('/login'); }}>Sair</Button>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-8 px-6">{children}</main>
    </div>
  );
};

export default Layout;
