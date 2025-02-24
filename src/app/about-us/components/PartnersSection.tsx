import React from 'react';
import PartnerLogo from './PartnerLogo';

interface Partner {
    id: string;
    name: string;
    logo: string;
    url: string;
    description?: string;
}

const partners: Partner[] = [
    {
        id: '1',
        name: 'PlanifiKlub',
        logo: 'https://planifiklub.netlify.app/static/media/LogoGolden.2a1c1634119241956d17.gif',
        url: 'https://planifiklub.netlify.app',
        description: 'Apoyo en la gestión del proyecto'
    },
    {
        id: '1',
        name: 'LimitLess',
        logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=200&fit=crop&q=80',
        url: 'https://example.com/designstudio',
        description: ''
    },
    {
        id: '3',
        name: 'Zaikodo',
        logo: 'https://zaikodo.com/static/images/Imagotipo.png',
        url: 'https://zaikodo.com',
        description: 'Asesoría en Scrum'
    }
];

const PartnersSection: React.FC = () => {
    return (
        <section className="py-4">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Nuestros Socios y Colaboradores
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Agradecemos a todas las personas y grupos que han contribuido al éxito de este proyecto
                        con su experiencia y recomendaciones, especialmente a .
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 justify-center">
                    {partners.map((partner, index) => (
                        <div
                            key={partner.id}
                            className="animate-fade-in"
                            style={{
                                animationDelay: `${index * 100}ms`,
                            }}
                        >
                            <PartnerLogo {...partner} />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default PartnersSection;