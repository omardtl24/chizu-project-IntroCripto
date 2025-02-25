import React from 'react';
import { Search } from 'lucide-react';

export const SearchBar: React.FC = () => (
    <div className="relative w-full text-gray-700">
        <input
            type="search"
            name="search"
            value={"static"}
            onChange={(e) => (e.target.value)}
            placeholder="Busca tu campaña  :)"
            className="bg-white h-10 px-5 pr-10 w-full rounded-full text-sm focus:outline-none border border-gray-400 hover:border-gray-700 focus:border-gray-700"
        />
        <div className='absolute -left-8 top-0 mt-2 mr-4'>
            <Search
                aria-hidden='true'
                className='h-6 w-6 flex-shrink-0 text-gray-600'
            />
        </div>
    </div>
);
