import React, { useState } from 'react';
import { Download } from 'lucide-react';
import TeamSection from './components/TeamSection';
import PartnersSection from './components/PartnersSection';

function App() {

    return (
        <div className="min-h-screen bg-[#FCFCFC]">
            <div className="flex items-center justify-center">
                <div className="text-center">
                </div>
            </div>
            <TeamSection />
            <PartnersSection />
        </div>
    );
}

export default App;