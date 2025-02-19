import React from 'react';
import { Search } from 'lucide-react';

export const SearchBar: React.FC = () => (
    <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
            type="text"
            placeholder="Título"
            className="w-full bg-white/5 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-white/20"
        />
    </div>
);
