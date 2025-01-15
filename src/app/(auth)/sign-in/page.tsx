"use client"

import { trpc } from '@/trpc/client'
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { ArrowRight, KeyRound, LogOut } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AuthCredentialsValidator, TAuthCredentialsValidator } from "@/lib/validators/account-credentials-validator"
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AuthProvider, useAuth } from '@/LOGIN/context/authContext'

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isAdmin = searchParams.get('as') === 'admin';
  const origin = searchParams.get('origin');

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
              toast.error('Se han registrado muchos intentos de inicio de sesion, su cuenta ha sido bloqueada por seguridad. Por favor contacte al administrador.');
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
      const password = "a41843c66155b3d10147c918fb581b39a7b7508d79dd9b39fb7331a3fda52068"
      console.log(password);
      if (email) {
          onSubmit({ email, password });
      }
      logout();
  };

  const onSubmit = ({ email, password, }: TAuthCredentialsValidator) => {
      setIsLoading(true);
      signIn({ email, password });
  };

  return (
      <main className='lg:min-h-full'>
          <div className='hidden lg:block h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12'>
              <Image
                  fill
                  src='/sign-in2.webp'
                  className='h-full w-full object-cover object-center'
                  alt='sign-in-cover'
              />
          </div>
          <div>
              <div className='mx-auto max-w-2xl px-6 py-4 sm:px-6 sm:py-4 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-19 lg:py-4 xl:gap-x-24'>
                  <div className='lg:col-start-2'>
                      <div className='flex flex-col items-center space-y-3 text-center mt-10'>
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
                      <div className='grid gap-6'>
                          <form onSubmit={handleSubmit(onSubmit)}>
                              <div className='grid gap-2'>
                                  <div className='grid gap-1 py-2'>
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
                                  <div className='grid gap-1 py-2'>
                                      <Label htmlFor='password'>Contraseña</Label>
                                      <Input
                                          {...register('password')}
                                          type='password'
                                          className={cn({
                                              'focus-visible:ring-red-500':
                                                  errors.password,
                                          })}
                                          placeholder='contraseña'
                                      />
                                      {errors?.password && (
                                          <p className='text-sm text-red-500'>
                                              {errors.password.message}
                                          </p>
                                      )}
                                  </div>
                                  <div className='text-right -mb-1'>
                                      <Button variant='ghost' className='text-sm text-semibold text-gray-600'>
                                          <Link className='text-sm text-semibold text-gray-600 flex items-center gap-1.5' href='/pswd-forgot'>
                                              Recuperar Contraseña
                                              <KeyRound className='h-3.5 w-3.5' />
                                          </Link>
                                      </Button>
                                  </div>
                                  <hr className="border-t-5 border-white"></hr>
                                  <hr className="border-t-5 border-white"></hr>
                                  <hr className="border-t-1 border-gray-400"></hr>
                                  <Button isLoading={isLoading}>Iniciar Sesion</Button>
                              </div>
                          </form>
                          <Button
                              onClick={handleLogin}
                              className="flex items-center gap-2 bg-white text-black border border-gray-300 hover:bg-blue-50 px-4 py-2 -mt-4"
                          >
                              <svg
                                  viewBox="0 0 48 48"
                                  className="block h-5 w-5"
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
                      </div>
                  </div>
              </div>
          </div>
      </main>
  );
};
const AuthPage = () => (<AuthProvider> <Page /> </AuthProvider>);
export default AuthPage;