import React from 'react';
import { Linkedin, Github, Mail } from 'lucide-react';

interface TeamMemberProps {
    name: string;
    role: string;
    image: string;
    linkedin?: string;
    github?: string;
    email?: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({
    name,
    role,
    image,
    linkedin,
    github,
    email
}) => {
    return (
        <div className="group relative bg-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="relative w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full ring-4 ring-teal-500/20">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
            </div>
            <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{name}</h3>
                <p className="text-teal-600 font-medium mb-4">{role}</p>
                <div className="flex justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {linkedin && (
                        <a
                            href={linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-teal-600 transition-colors"
                        >
                            <Linkedin size={20} />
                        </a>
                    )}
                    {github && (
                        <a
                            href={github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-teal-600 transition-colors"
                        >
                            <Github size={20} />
                        </a>
                    )}
                    {email && (
                        <a
                            href={`mailto:${email}`}
                            className="text-gray-600 hover:text-teal-600 transition-colors"
                        >
                            <Mail size={20} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeamMember;