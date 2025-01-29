"use client";
import React, { useState } from 'react';
import { Check } from 'lucide-react';

function App() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
    const [status, setStatus] = useState<'Completada' | 'Terminada' | 'En curso'>('Terminada');

    const plans = [
        {
            name: 'Bronce',
            price: 0,
            features: [
                "Agradecimientos en créditos", 
                "Imagenes de desarrollo"],
            current: true,
        },
        {   
            name: 'Oro',
            price: 12,
            features: [
                "Agradecimientos en créditos",
                "Imágenes dedesarrollo",
                "Invitación al grupo de Discord"],
            current: false,
        },
        {
            name: 'Diamante',
            price: 24,
            features: [
                "Agradecimientos en créditos",
                "Imágenes de desarrollo",
                "Invitacion a Discord",
                "Descargable de la última versión del Juego"
            ],
            current: false,
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completada':
                return 'text-green-500';
            case 'Terminada':
                return 'text-red-500';
            case 'En curso':
                return 'text-blue-500';
            default:
                return 'text-gray-500';
        }
    };

    return (
        <div className="min-h-screen bg-radial-gradient flex items-center justify-center p-6">
            <div className="max-w-6xl w-full backdrop-blur-xl bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20">

                {/* Nueva sección para el logo y la información del juego */}
                <div className="flex justify-center items-center mb-12">
                    <div>
                        <img src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2021/04/zero-two-feature.jpg" alt="Logo del Juego" className="h-48 rounded-3xl" />
                    </div>
                    <div className="text-left pl-12">
                        <h2 className="text-2xl font-bold">Halo Zero</h2>
                        <p className="text-gray-600">Creador: Juan Gomez</p>
                    </div>
                </div>

                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-black mb-4">Descripción de la campaña</h1>
                    <p className="text-gray-800 max-w-2xl mx-auto text-justify">
                        Elije el plan que más te convenga, todos los planes incluyen agradecimientos en los créditos del juego. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto delectus amet excepturi ratione nisi quasi minima tempora numquam. Recusandae aliquid consequuntur obcaecati mollitia dolor sit illo ex officiis harum! Assumenda!
                    </p>
                </div>

                {/* Nueva sección para el estado */}
                <div className="text-center mb-12">
                    <span className={`text-xl font-bold ${getStatusColor(status)}`}>
                        {status}
                    </span>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className="relative bg-transparent rounded-2xl p-1 hover:border-indigo-500/50 transition-all duration-300 hover:transform hover:-translate-y-1 subscription-card"
                        >
                            <div className="bg-white rounded-xl border hover:border-transparent p-4 h-full flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-semibold text-black mb-4">{plan.name}</h3>
                                    <div className="flex items-baseline mb-6">
                                        <span className="text-3xl font-bold text-black">$</span>
                                        <span className="text-5xl font-bold text-black">{plan.price}</span>
                                        <span className="text-gray-400 ml-2">/Por mes</span>
                                    </div>
                                    <ul className="space-y-4 mb-8">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex items-center text-gray-800">
                                                <Check className="h-5 w-5 text-green-400 mr-2" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <button
                                    className={`w-full py-3 rounded-xl transition-all ${plan.current
                                        ? 'bg-gray-500 text-gray-300 cursor-default'
                                        : 'bg-[#007373] hover:bg-[#009c9c] text-white'
                                    }`}
                                >
                                    {plan.current ? 'Current Plan' : 'Select Plan'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
