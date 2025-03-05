"use client"

import { trpc } from '@/trpc/client'
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { ArrowRight, KeyRound, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AuthCredentialsValidator, TAuthCredentialsValidator } from "@/lib/validators/account-credentials-validator"
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AuthProvider, useAuth } from '@/LOGIN/context/authContext'
import { ButtonPusheable } from '@/components/button_pusheable'
import ReCAPTCHA from 'react-google-recaptcha'

const Page = () => {
    const [recaptchaToken, setRecaptchaToken] = useState<string>('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const isAdmin = searchParams?.get('as') === 'admin';
    const origin = searchParams?.get('origin');
    const returnUrl = searchParams?.get('returnUrl');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
    const { register, handleSubmit, formState: { errors }, } = useForm<TAuthCredentialsValidator>({
        resolver: zodResolver(AuthCredentialsValidator),
    });

    const [isLoading, setIsLoading] = useState(false);

    const { mutate: signIn } = trpc.auth.signIn.useMutation({
        onSuccess: async () => {
            toast.success('Inicio de Sesion existoso.');
            router.refresh();
            if (origin) {
                window.location.href = `/${origin}`;
                return;
            }
            if (returnUrl) {
                router.push(returnUrl);
                return;
            }
            if (isAdmin) {
                router.push('/panel');
                return;
            }
            router.push('/');
            router.refresh();
            setIsLoading(false);
        },
        onError: (e) => {
            if (e.data?.code === 'UNAUTHORIZED') {
                toast.error('Correo o Contraseña incorrectos.');
            }
            if (e.data?.code === 'BAD_REQUEST') {
                toast.error('Por favor completa el Captcha');
            }
            setIsLoading(false);
        },
    });

    const { login, logout, user } = useAuth();

    useEffect(() => {
        if (user) {
            // router.push('/landing');
        }
    }, [user, router]);

    const handleLogin = async () => {
        const email = (await login()).email;
        const password = "a41843c66155b3d10147c918fb581b39a7b7508d79dd9b39fb7331a3fda52068A"
        if (email) {
            onSubmit({ email, password });
        }
        logout();
    };

    const handleRecaptchaChange = (token: string | null) => {
        if (token) {
            setRecaptchaToken(token);
        }
    };

    const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
        setIsLoading(true);
        signIn({ email, password , recaptchaToken});
    };

    return (
        <div className="grid min-h-screen lg:grid-cols-2">
            <div className="hidden lg:block relative">
                <Image
                    fill
                    src='/sign-in2.webp'
                    className='object-cover'
                    alt='sign-in-cover'
                />
            </div>
            
            <div className="px-4 py-20 lg:px-8">
                <div className="max-w-md mx-auto">
                    <div className='flex flex-col items-center space-y-3 text-center mb-8'>
                        <img src='/logo.png' width={115} height={50} alt="logo" />
                        <h1 className='text-2xl font-semibold tracking-tight'>
                            Iniciar Sesion
                        </h1>
                        <Link
                            className={buttonVariants({
                                variant: 'link',
                                className: 'gap-1',
                            })}
                            href='/sign-up'>
                            No tienes Cuenta? Registrate {user?.email}
                            <ArrowRight className='h-4 w-4' />
                        </Link>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='space-y-4'>
                            <div className='space-y-1'>
                                <Label htmlFor='email'>E-mail</Label>
                                <Input
                                    {...register('email')}
                                    className={cn({
                                        'focus-visible:ring-red-500':
                                            errors.email,
                                    })}
                                    placeholder='nombre@example.com'
                                />
                                {errors?.email && (
                                    <p className='text-sm text-red-500'>
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div className='space-y-1'>
                                <Label htmlFor='password'>Contraseña</Label>
                                <div className='relative'>
                                    <Input
                                        {...register('password')}
                                        type={showPassword ? 'text' : 'password'}
                                        className={cn({
                                            'focus-visible:ring-red-500': errors.password,
                                        })}
                                        placeholder='Contraseña'
                                    />
                                    <button
                                        type='button'
                                        onClick={togglePasswordVisibility}
                                        className='absolute right-2 top-1/2 transform -translate-y-1/2 text-zinc-400'
                                    >
                                        {showPassword ? <EyeOff /> : <Eye />}
                                    </button>
                                </div>
                                {errors?.password && (
                                    <p className='text-sm text-red-500'>
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            <div className='m-auto my-2'>
                                <ReCAPTCHA
                                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                                    onChange={handleRecaptchaChange}
                                />
                            </div>

                            <div className='text-right'>
                                <Button variant='ghost' className='text-sm font-semibold text-gray-600'>
                                    <Link className='flex items-center gap-1.5' href='/pswd-forgot'>
                                        Recuperar Contraseña
                                        <KeyRound className='h-3.5 w-3.5' />
                                    </Link>
                                </Button>
                            </div>

                            <ButtonPusheable isLoading={isLoading} className='w-full'>
                                Iniciar Sesion
                            </ButtonPusheable>

                            <hr className="border-gray-400" />
                        </div>
                    </form>

                    <Button
                        onClick={handleLogin}
                        className="w-full mt-4 flex items-center justify-center gap-2 bg-white text-black border border-gray-300 hover:bg-blue-50"
                    >
                        <svg
                            viewBox="0 0 48 48"
                            className="h-5 w-5"
                            fill="none"
                        >
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                            <path fill="none" d="M0 0h48v48H0z" />
                        </svg>
                        Continuar con Google
                    </Button>
                    <p className="text-sm text-gray-500 mt-2">
                        *Requiere registro previo
                    </p>
                </div>
            </div>
        </div>
    );
};

const AuthPage = () => (<AuthProvider><Page /></AuthProvider>);
export default AuthPage;
