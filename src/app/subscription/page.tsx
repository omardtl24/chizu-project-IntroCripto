"use client"
import React, { useState } from 'react';
import { Check } from 'lucide-react';

function App() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

    const plans = [
        {
            name: 'Basic',
            price: 0,
            features: ['Basic access', 'Limited storage', 'Email support'],
            current: true,
        },
        {
            name: 'Standard',
            price: 12,
            features: ['Everything in Basic', 'Advanced features', 'Priority support'],
            current: false,
        },
        {
            name: 'Professional',
            price: 24,
            features: ['Everything in Standard', 'Custom integrations', '24/7 support'],
            current: false,
        },
    ];

    return (
        <div className="min-h-screen bg-radial-gradient flex items-center justify-center p-6">
            <div className="max-w-6xl w-full backdrop-blur-xl bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">Subscription Plans</h1>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        Upgrade to access User Roles and Permissions, Mobile accessibility, Integration with AI Tools and Standard Customer support.
                    </p>
                </div>

                {/* Por si se quiere agregar un switch para cambiar entre mensual y anual */}
                {/* <div className="flex justify-center mb-12">
                    <div className="bg-gray-900/50 p-1 rounded-xl">
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-6 py-2 rounded-lg transition-all ${billingCycle === 'monthly'
                                ? 'bg-indigo-600 text-white'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle('annual')}
                            className={`px-6 py-2 rounded-lg transition-all ${billingCycle === 'annual'
                                ? 'bg-indigo-600 text-white'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Annual
                        </button>
                    </div>
                </div> */}

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            // className="relative bg-transparent rounded-2xl p-1 backdrop-blur-sm border border-white/10 hover:border-indigo-500/50 transition-all duration-300 hover:transform hover:-translate-y-1 subscription-card"
                            className="relative bg-transparent rounded-2xl p-1 hover:border-indigo-500/50 transition-all duration-300 hover:transform hover:-translate-y-1 subscription-card"
                        >
                            <div className="inset-1 bg-gray-900 rounded-2xl p-4">
                                <h3 className="text-xl font-semibold text-white mb-4">{plan.name}</h3>
                                <div className="flex items-baseline mb-6">
                                    <span className="text-3xl font-bold text-white">$</span>
                                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                                    <span className="text-gray-400 ml-2">/Per user<br />/Per month</span>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center text-gray-300">
                                            <Check className="h-5 w-5 text-indigo-400 mr-2" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    className={`w-full py-3 rounded-xl transition-all ${plan.current
                                        ? 'bg-gray-700 text-gray-300 cursor-default'
                                        : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                                        }`}
                                >
                                    {plan.current ? 'Current Plan' : 'Select Plan'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <p className="text-gray-400 mb-6">100% secure payment method with money back guarantee.</p>
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl transition-all">
                        Upgrade now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;