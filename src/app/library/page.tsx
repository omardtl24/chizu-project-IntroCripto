'use client';
import React, { useState } from 'react';
import { GamepadIcon, ListFilter, Search, SparklesIcon } from 'lucide-react';
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

    const favoriteGames = getFavoriteItems().filter(item => item.type === 'game');
    const favoriteCampaigns = getFavoriteItems().filter(item => item.type === 'campaign');

    return (
        <div className="min-h-screen bg-[#FCFCFC] text-black p-6 sm:px-6 lg:px-12 xl:px-32">
            <Header activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="flex items-baseline justify-end border-b border-gray-400 py-6 mb-6">
                <div className="flex items-center">
                    {/* Barra de búsqueda */}
                    <div className="relative w-full text-gray-700">
                        <input
                            type="search"
                            name="search"
                            value={"dsa"}
                            onChange={(e) => { }}
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

                    <button
                        type="button"
                        className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                        onClick={() => { }}
                    >
                    </button>
                </div>
            </div>
            {/* Filters for Favorites */}
            {activeTab === 'favoritos' && (
                <div className="flex items-center my-6">
                    <div className="flex items-center rounded-lg">
                        <button
                            onClick={() => setFavoritesFilter('all')}
                            className={`px-4 py-2 rounded-md transition-colors ${favoritesFilter === 'all' ? 'bg-gray-200 text-black' : 'text-gray-600 hover:text-black'}`}
                        >
                            Todos
                        </button>
                        <button
                            onClick={() => setFavoritesFilter('games')}
                            className={`px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${favoritesFilter === 'games' ? 'bg-gray-200 text-black' : 'text-gray-600 hover:text-black'}`}
                        >
                            <GamepadIcon className="w-4 h-4" />
                            Juegos
                        </button>
                        <button
                            onClick={() => setFavoritesFilter('campaigns')}
                            className={`px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${favoritesFilter === 'campaigns' ? 'bg-gray-200 text-black' : 'text-gray-600 hover:text-black'}`}
                        >
                            <SparklesIcon className="w-4 h-4" />
                            Campañas
                        </button>
                    </div>
                </div>
            )}

            {activeTab === 'favoritos' && favoriteGames.length === 0 && favoriteCampaigns.length === 0 ? (
                <EmptyFavorites setActiveTab={setActiveTab} />
            ) : (
                <div>
                    {activeTab === 'favoritos' && favoriteGames.length > 0 && (
                        <>
                            <h2 className="text-xl font-bold mb-8">Juegos</h2>
                            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8`}>
                                {favoriteGames.map((game) => (
                                    <GameCard
                                        key={game.id}
                                        game={game}
                                        isFavorite={favorites.includes(game.id)}
                                        onToggleFavorite={() => toggleFavorite(game.id)}
                                        animationClass={getAnimationClass(game.id)}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                    {activeTab === 'favoritos' && favoriteCampaigns.length > 0 && (
                        <>
                            <h2 className="text-xl font-bold mb-8">Campañas</h2>
                            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6`}>
                                {favoriteCampaigns.map((campaign) => (
                                    <CampaignCard
                                        key={campaign.id}
                                        product={campaign}
                                        isFavorite={favorites.includes(campaign.id)}
                                        onToggleFavorite={() => toggleFavorite(campaign.id)}
                                        animationClass={getAnimationClass(campaign.id)}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Display non-favorite games and campaigns */}
            {activeTab !== 'favoritos' && (
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6`}>
                    {getFilteredItems().map((item) => {
                        if (item.type === 'campaign') {
                            return (
                                <CampaignCard
                                    key={item.id}
                                    product={item}
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
