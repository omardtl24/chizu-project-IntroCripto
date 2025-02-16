import React from 'react';
import { Product } from '../types';
import { Tag } from 'lucide-react';

interface ProductCardProps {
    product: Product;
    style: 'cosmic-origami-blue';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const cardStyle = 'bg-gradient-to-br from-[#007373] via-[#007373] to-[#007373] p-6 rounded-lg text-white shadow-[0_0_10px_rgba(0,115,115,0.3)] stars-bg hover:shadow-[0_0_16px_rgba(0,115,115,0.5)] hover:scale-[1.03] transition-shadow transition-transform transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:rotate-1';

    const imageStyle = 'rounded-lg h-48 w-full object-cover mb-4 opacity-80 ';
    const titleStyle = 'text-lg font-bold mb-2 text-[#007373]';

    return (
        <div className={cardStyle}>
            <img
                src={product.banner_filename}
                alt={product.title}
                className={imageStyle}
            />
            <h3 className={titleStyle}>{product.title}</h3>
            <div className="flex items-center gap-2 mb-2">
                <Tag size={16} className="text-[hsl(180,100%,22.5%)]" />
                <span className="text-sm text-gray-900">{product.category}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-700">Por {product.user}</span>
                <span className={`text-xs px-2 py-1 rounded ${product.status === 'activa' ? 'bg-blue-100 text-blue-800' : product.status === 'suspendida' ? 'bg-red-100 text-red-800': 'bg-green-100 text-green-800'
                    }`}>
                    {product.status}
                </span>
            </div>
            <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-800">
                    Desde ${product.min_price ?? 0}
                </span>
                <span className="text-sm font-semibold text-gray-900">
                    Hasta ${product.max_price ?? 0}
                </span>
            </div>
        </div>
    );
};