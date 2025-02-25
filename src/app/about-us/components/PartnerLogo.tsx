import React from 'react';

interface PartnerLogoProps {
    name: string;
    logo: string;
    url: string;
    description?: string;
}

const PartnerLogo: React.FC<PartnerLogoProps> = ({
    name,
    logo,
    url,
    description
}) => {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
            <img
                src={logo}
                alt={`${name} logo`}
                className="h-16 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
            />
            <h3 className="mt-3 text-sm font-medium text-gray-700 group-hover:text-teal-600 transition-colors">
                {name}
            </h3>
            {description && (
                <p className="mt-1 text-xs text-gray-500 text-center">
                    {description}
                </p>
            )}
        </a>
    );
};

export default PartnerLogo;