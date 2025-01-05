import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'
import Image from 'next/image'
import { Icons } from './Icons'
import NavItems from './NavItems'
import { buttonVariants } from './ui/button'
import Cart from './Cart'
import { getServerUser } from '@/lib/payload-utils'
import { cookies } from 'next/headers'
import UserNav from './UserNav'

const Navbar = async () => {
    
    const cookie = cookies()
    const {user} = await getServerUser(cookie)

    return (
        <div className='bg-white sticky z-50 top-0 inset-x-0 h-20'>

            <header className='relative bg-white'>

                <div className='xl:mx-28 lg:mx-24 md:mx-20 sm:mx-4'>
                    {/* border-b border-gray-300 */}
                    <div className=''> 

                        <div className='flex h-20 items-center'>
                            

                            <div className='ml-0 flex lg:ml-0'>
                                <Link href='/'> 
                                    < Image src='/head-icon.png' alt='logo' width={155} height={45}/>
                                </Link>
                            </div>

                            <div className='lg:ml-8 lg:block lg:self-stretch sm:text-sm'>
                                <NavItems />
                            </div>

                            
                            <div className='ml-auto flex items-center sm:text-sm md:text-sm'>

                                <div className='flex flex-1 items-center justify-end lg:space-x-6'>

                                <Link
                                    href='/products'
                                    className={buttonVariants({
                                        variant: 'ghost',
                                        size: 'sm'
                                    })}>
                                    Catalogo
                                </Link>
                                <span
                                    className='h-6 w-px bg-gray-300'
                                    aria-hidden='true'
                                />

                                {user ? null : (
                                    <Link
                                    href='/sign-in'
                                    className={buttonVariants({
                                        variant: 'default', 
                                        size : 'sm'
                                    })}
                                    >
                                    Iniciar Sesion
                                    </Link>
                                )}

                                {user ? null : (
                                    <span
                                    className='h-6 w-px bg-gray-300'
                                    aria-hidden='true'
                                    />
                                )}

                                {user ? (
                                    <UserNav user={user} />
                                ) : (
                                    <Link
                                    href='/sign-up'
                                    className={buttonVariants({
                                        variant: 'ghost',
                                        size: 'sm'
                                    })}>
                                    Registrarse
                                    </Link>
                                )}

                                {user ? (
                                    <span
                                    className='h-6 w-px bg-gray-300'
                                    aria-hidden='true'
                                    />
                                ) : null}

                                {user ? null : (
                                    <div className='flex lg:ml-6'>
                                    <span
                                        className='h-6 w-px bg-gray-300'
                                        aria-hidden='true'
                                    />
                                    </div>
                                )}

                                <div className='ml-4 flow-root lg:ml-6'>
                                    <Cart />
                                </div>

                                </div>

                            </div>

                        </div>

                    </div>
                </div>


            </header>

            <hr className="border-t-1.8 border-gray-300" />

        </div>
    )
}

export default Navbar
