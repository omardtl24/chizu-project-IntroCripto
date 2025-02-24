import React from 'react';
import TeamMember from './TeamMember';

interface TeamMemberData {
    id: string;
    name: string;
    role: string;
    image: string;
    linkedin?: string;
    github?: string;
    email?: string;
}

const teamMembers: TeamMemberData[] = [
    {
        id: '1',
        name: 'Juan Gomez',
        role: 'Backend/Database Developer',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
        linkedin: 'https://www.linkedin.com/in/juan-pablo-g%C3%B3mez-rangel-91720928b',
        github: 'https://github.com/flash1001',
        email: 'jugomezra@unal.edu.co'
    },
    {
        id: '2',
        name: 'Juan Garavito',
        role: 'API Junior Breaker',
        image: 'https://media.licdn.com/dms/image/v2/D4E03AQG5FwXuwUpkyw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1701311368420?e=1746057600&v=beta&t=qTaMq33es6-EGk5_slhteo2rdhxAvLaL27Jn3upi4z0',
        linkedin: 'https://www.linkedin.com/in/juancarlosgaravito',
        github: 'https://github.com/jgaravitoh',
        email: 'jgaravitoh@unal.edu.co'
    },
    {
        id: '3',
        name: 'Juan Garcia',
        role: 'Payload Hater Developer',
        image: 'https://media.licdn.com/dms/image/v2/D4E03AQEodNTaHPhvkA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1691877434271?e=1746057600&v=beta&t=rxxqdPIrnHcqbxCd4pUs1GK-JTKhqTB1MQCLbrrfNEY',
        linkedin: 'https://www.linkedin.com/in/juangarcia264/',
        github: 'https://github.com/JuanNaCl',
        email: 'jgarciaot@unal.edu.co'
    },
    {
        id: '4',
        name: 'Julian Osorio',
        role: 'Payload Development Enthusiast',
        image: 'https://media.licdn.com/dms/image/v2/D4E03AQHmTDX5Z9J8VQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1708362012601?e=1746057600&v=beta&t=ytlunmFjSGBXOzO9Kicy2YQkPIu0iGCbtd2AqGUGA0U',
        linkedin: 'https://www.linkedin.com/in/julian-david-osorio-789301288/',
        github: 'https://github.com/Juosorioca420',
        email: 'juosorioca@unal.edu.co'
    }
];

const TeamSection: React.FC = () => {
    return (
        <section className="py-16">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Nuestro Equipo
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Conoce al talentoso equipo detrás de este proyecto. Cada miembro aporta su experiencia única
                        y pasión por esta idea.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <div
                            key={member.id}
                            className="animate-fade-in"
                            style={{
                                animationDelay: `${index * 150}ms`,
                            }}
                        >
                            <TeamMember {...member} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;