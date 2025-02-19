"use client"
import React, { useState } from 'react';
import { GamepadIcon, SparklesIcon } from 'lucide-react';
import { Header } from './components/header';
import { SearchBar } from './components/SearchBar';
import { GameCard } from './components/GameCard';
import { CampaignCard } from './components/CampaignCard';
import { EmptyFavorites } from './components/EmptyFavorites';
import { useFavorites } from './hooks/useFavorites';
import { games, campaigns } from './data/items';
import { ActiveTab, FavoritesFilter } from './types';

function App() {
    const [activeTab, setActiveTab] = useState<ActiveTab>('todos');
    const [favoritesFilter, setFavoritesFilter] = useState<FavoritesFilter>('all');
    const { favorites, toggleFavorite, getAnimationClass } = useFavorites();

    const getFavoriteItems = () => {
        const favoriteGames = games.filter(game => favorites.includes(game.id));
        const favoriteCampaigns = campaigns.filter(campaign => favorites.includes(campaign.id));

        if (favoritesFilter === 'games') return favoriteGames;
        if (favoritesFilter === 'campaigns') return favoriteCampaigns;
        return [...favoriteGames, ...favoriteCampaigns];
    };

    const getFilteredItems = () => {
        if (activeTab === 'favoritos') {
            return getFavoriteItems();
        }
        if (activeTab === 'campanas') {
            return campaigns;
        }
        return games;
    };

    return (
        <div className="min-h-screen bg-[#121212] text-white p-6">
            <Header activeTab={activeTab} setActiveTab={setActiveTab} />
            
            {/* Filters for Favorites */}
            {activeTab === 'favoritos' && (
                <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center bg-white/5 rounded-lg p-1">
                        <button
                            onClick={() => setFavoritesFilter('all')}
                            className={`px-4 py-2 rounded-md transition-colors ${
                                favoritesFilter === 'all' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            Todos
                        </button>
                        <button
                            onClick={() => setFavoritesFilter('games')}
                            className={`px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
                                favoritesFilter === 'games' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            <GamepadIcon className="w-4 h-4" />
                            Juegos
                        </button>
                        <button // App.tsx (continuación del return statement)
                            onClick={() => setFavoritesFilter('campaigns')}
                            className={`px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
                                favoritesFilter === 'campaigns' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            <SparklesIcon className="w-4 h-4" />
                            Campañas
                        </button>
                    </div>
                </div>
            )}

            <SearchBar />

            {activeTab === 'favoritos' && getFavoriteItems().length === 0 ? (
                <EmptyFavorites setActiveTab={setActiveTab} />
            ) : (
                <div className={`grid ${
                    activeTab !== 'campanas' && activeTab !== 'favoritos'
                        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5'
                        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                    } gap-6`}
                >
                    {getFilteredItems().map((item) => {
                        if ('description' in item) {
                            return (
                                <CampaignCard
                                    key={item.id}
                                    campaign={item}
                                    isFavorite={favorites.includes(item.id)}
                                    onToggleFavorite={() => toggleFavorite(item.id)}
                                    animationClass={getAnimationClass(item.id)}
                                />
                            );
                        } else {
                            return (
                                <GameCard
                                    key={item.id}
                                    game={item}
                                    isFavorite={favorites.includes(item.id)}
                                    onToggleFavorite={() => toggleFavorite(item.id)}
                                    animationClass={getAnimationClass(item.id)}
                                />
                            );
                        }
                    })}
                </div>
            )}
        </div>
    );
}

export default App;