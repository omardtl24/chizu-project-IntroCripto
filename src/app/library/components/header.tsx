import React from 'react';
import { RefreshCw } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeaderProps {
    activeTab: ActiveTab;
    setActiveTab: (tab: ActiveTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => (
    <header className="mb-8">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold flex items-center gap-2">
                Biblioteca
            </h1>
        </div>
        <nav className="flex items-center space-x-6 mb-6">
            <a
                href="#"
                onClick={() => setActiveTab('todos')}
                className={`pb-2 ${activeTab === 'todos' ? 'text-black border-b-2 border-black' : 'text-gray-600 hover:text-black transition-colors'}`}
            >
                Juegos
            </a>
            <a
                href="#"
                onClick={() => setActiveTab('favoritos')}
                className={`pb-2 ${activeTab === 'favoritos' ? 'text-black border-b-2 border-black' : 'text-gray-600 hover:text-black transition-colors'}`}
            >
                Favoritos
            </a>
            <a
                href="#"
                onClick={() => setActiveTab('campanas')}
                className={`pb-2 ${activeTab === 'campanas' ? 'text-black border-b-2 border-black' : 'text-gray-600 hover:text-black transition-colors'}`}
            >
                Campañas
            </a>
        </nav>
    </header>
);
