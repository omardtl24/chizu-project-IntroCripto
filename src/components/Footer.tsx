'use client'

import { usePathname } from 'next/navigation'
import MaxWidthWrapper from './MaxWidthWrapper'

import { CircleDollarSign, TextSearch, Compass } from "lucide-react"
import { Button} from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Instagram, Twitter, Github } from 'lucide-react';



const Footer = () => {
    const pathname = usePathname()
    const pathsToMinimize = [
        '/verify-email',
        '/sign-up',
        '/sign-in',
        '/pswd-forgot',
        '/pswd-reset',
    ]

    return (
        <footer className='bg-white flex-grow-0'>
            <div className="lg:mx-24 md:mx-20 sm:mx-4">
                <div className='border-t border-gray-200'>
                    {pathsToMinimize.includes(pathname) ? null : (
                        <div className='pb-8 pt-8'>
                            <div className='flex justify-center'>
                                <img src='/logos/logo_chizu.svg' width={115} height={45} alt="logo" />
                            </div>
                        </div>
                    )}

                </div>

                <div className="py-5 flex flex-col md:flex-row md:items-center">

                    <div className='text-center md:text-left'>
                        {pathsToMinimize.includes(pathname) ? null : (
                            <div className='flex space-x-8'>
                            <Button
                                variant="ghost"
                                className="gap-1.5 justify-end text-gray-600"
                                onClick={() => (window.location.href = "/landing")}
                            >
                            <Compass className="h-5 w-5" />
                                Descubre más sobre Chizu
                            </Button>
                             {/* Iconos de redes sociales */}
                    <div className="flex justify-center md:justify-end items-center">
                        <Button
                            variant="ghost"
                            className="text-gray-600"
                            onClick={() => window.open('https://instagram.com/chizu_games', '_blank')}
                        >
                        <Instagram className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            className="text-gray-600"
                            onClick={() => window.open('https://twitter.com/ChizuGames', '_blank')}
                        >
                        <Twitter className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            className="text-gray-600"
                            onClick={() => window.open('https://github.com/Juosorioca420/chizu-project', '_blank')}
                        >
                        <Github className="h-5 w-5" />
                        </Button>
                    </div>
                        </div>
                        )}
                    </div>

                    <div className='mt-4 md:mt-0 text-center md:text-right md:ml-4'>
                        <p className='text-sm text-gray-600'>
                            &copy; {new Date().getFullYear()} All Rights Reserved
                        </p>
                    </div>

                </div>
            </div>
        </footer>
    )
}

export default Footer
