// components/Header.tsx
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
                <RefreshCw className="w-5 h-5" />
            </h1>
        </div>
        <nav className="flex items-center space-x-6 mb-6">
            <a
                href="#"
                onClick={() => setActiveTab('todos')}
                className={`pb-2 ${activeTab === 'todos' ? 'text-white border-b-2 border-white' : 'text-gray-400 hover:text-white transition-colors'}`}
            >
                Todos
            </a>
            <a
                href="#"
                onClick={() => setActiveTab('favoritos')}
                className={`pb-2 ${activeTab === 'favoritos' ? 'text-white border-b-2 border-white' : 'text-gray-400 hover:text-white transition-colors'}`}
            >
                Favoritos
            </a>
            <a
                href="#"
                onClick={() => setActiveTab('campanas')}
                className={`pb-2 ${activeTab === 'campanas' ? 'text-white border-b-2 border-white' : 'text-gray-400 hover:text-white transition-colors'}`}
            >
                Campañas
            </a>
            <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <span className="text-xl font-bold">+</span>
            </button>
        </nav>
    </header>
);