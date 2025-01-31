"use client"
import React, { useState } from 'react';
import { Check } from 'lucide-react';

function App() {
    const [billingCycle, setBillingCycle] = useState('monthly');
    // const [status, setStatus] = useState('En curso');
    // const [status, setStatus] = useState('Completada');
    const [status, setStatus] = useState('Terminada');

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
                return 'bg-green-100 text-green-800 border-green-200';
            case 'Terminada':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'En curso':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="min-h-screen bg-radial-gradient flex items-center justify-center p-6">
            <div className="max-w-6xl w-full backdrop-blur-xl bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20">
                {/* Container with relative positioning for status tag */}
                <div className="relative">
                    {/* Status tag positioned absolutely in the top-right corner */}
                    <div className={`absolute -top-2 -right-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(status)}`}>
                        {status}
                    </div>

                    {/* Game logo and info section */}
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

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {plans.map((plan) => (
                            <div
                                key={plan.name}
                                className="relative bg-transparent rounded-xl p-[2px] hover:border-indigo-500/50 transition-all duration-300 hover:transform hover:-translate-y-1 subscription-card"
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
        </div>
    );
}

export default App;