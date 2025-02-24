import React from 'react';

export const LoadingCard: React.FC = () => {
    return (
        <div className="group relative p-4 bg-gradient-to-br rounded-lg shadow-xl">
            {/* Image container with same dimensions as GameCard */}
            <div className="w-full h-64 rounded-lg relative bg-gray-200 animate-pulse">
                {/* Favorite button placeholder */}
                <div className="absolute top-2 right-2 w-9 h-9 rounded-full bg-gray-300 animate-pulse" />
            </div>
            
            {/* Content section */}
            <div className="mt-4 space-y-3">
                {/* Title placeholder */}
                <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
                
                {/* Creator placeholder */}
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                
                {/* Download button placeholder */}
                <div className="h-4 bg-gray-200 rounded animate-pulse w-24 mt-2" />
            </div>
        </div>
    );
};