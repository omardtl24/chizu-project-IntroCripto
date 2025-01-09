"use client"
import { useState } from 'react'; // Importa useState
import { trpc } from '@/trpc/client';
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight, KeyRound } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthCredentialsValidator, TAuthCredentialsValidator } from "@/lib/validators/account-credentials-validator";
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import Image from 'next/image';

const Page = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const isAdmin = searchParams.get('as') === 'admin';
  const origin = searchParams.get('origin');

  const { register, handleSubmit, formState: { errors } } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const [isLoading, setIsLoading] = useState(false); // Estado para gestionar el loading

  const { mutate: signIn } = trpc.auth.signIn.useMutation({

    
    onSuccess: async () => {
      setTimeout(() => {}, 10000);
      toast.success('Inicio de Sesion existoso.');
      // router.refresh();

      if (origin) {
        window.location.href = `/${origin}`;
        return;
      }
      if (isAdmin) {
        router.push('/panel');
        return;
      }
      

      // router.push('/');
      // router.refresh();
      setIsLoading(false); // Restablece el estado de loading después del éxito
    },

    onError: (e) => {
      if (e.data?.code === 'UNAUTHORIZED') {
        toast.error('Correo o Contraseña incorrectos.');
      }

      if (e.data?.code === 'BAD_REQUEST') {
        toast.error('Se han registrado muchos intentos de inicio de sesion, su cuenta ha sido bloqueada por seguridad. Por favor contacte al administrador.');
      }

      setIsLoading(false); // Restablece el estado de loading en caso de error
    },
  });

  const onSubmit = ({ email, password, }: TAuthCredentialsValidator) => {
    setIsLoading(true); // Cambia el estado a loading al hacer submit
    signIn({ email, password });
  };

  const asAdmin = () => { router.push('?as=admin'); };
  const asUser = () => { router.replace('/sign-in', undefined); };

  return (
    <main className='lg:min-h-full'>
      <div className='hidden lg:block h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12'>
        <Image
<<<<<<< HEAD
          fill
          src='/sign-in2.jpg'
          className='h-full w-full object-cover object-center'
          alt='sign-in'
=======
            fill
            src='/sign-in2.webp'
            className='h-full w-full object-cover object-center'
            alt='sign-in-cover'
>>>>>>> 4afa6d11cb0d1a4f0f2e2a8246802c3b05522323
        />
      </div>

      <div>
        <div className='mx-auto max-w-2xl px-6 py-4 sm:px-6 sm:py-4 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-19 lg:py-4 xl:gap-x-24'>
          <div className='lg:col-start-2'>
            <div className='flex flex-col items-center space-y-2 text-center'>
              <img src='/logo.png' width={115} height={45} alt="logo" />
              <h1 className='text-2xl font-semibold tracking-tight'>
                Iniciar Sesion
              </h1>

              <Link
                className={buttonVariants({
                  variant: 'link',
                  className: 'gap-1',
                })}
                href='/sign-up'>
                No tienes Cuenta? Registrate
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
                        'focus-visible:ring-red-500': errors.email,
                      })}
                      placeholder='nombre@example.com'
                    />

<<<<<<< HEAD
                    {errors?.email && (
                      <p className='text-sm text-red-500'>
                        {errors.email.message}
                      </p>
                    )}
=======
              <div className='flex flex-col items-center space-y-3 text-center mt-10'>
                <img src='/logo.png' width={115} height={50} alt="logo"/>
                <h1 className='text-2xl font-semibold tracking-tight'>
                  Iniciar Sesion
                </h1>
    
                <Link
                  className={buttonVariants({
                    variant: 'link',
                    className: 'gap-1',
                  })}
                  href='/sign-up'>
                  No tienes Cuenta?  Registrate
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
                      {/* <div className='text-sm text-gray-600'>La contraseña ha de ser de almenos 8 caracteres.</div> */}
                      {errors?.password && (
                        <p className='text-sm text-red-500'>
                          {errors.password.message}
                        </p>
                      )}


                    </div>
                      
                    <Link   className= 'text-right text-sm text-semibold text-gray-600 flex items-end gap-1.5 justify-end' href='/pswd-forgot'>
                        Recuperar Contraseña 
                        <KeyRound className='h-3.5 w-3.5' />
                    </Link>

                    <hr className="border-t-5 border-white"></hr>
                    <hr className="border-t-5 border-white"></hr>
                    <hr className="border-t-1 border-gray-400"></hr>

                    <Button>Iniciar Sesion</Button>

>>>>>>> 4afa6d11cb0d1a4f0f2e2a8246802c3b05522323
                  </div>

                  <div className='grid gap-1 py-2'>
                    <Label htmlFor='password'>Contraseña</Label>
                    <Input
                      {...register('password')}
                      type='password'
                      className={cn({
                        'focus-visible:ring-red-500': errors.password,
                      })}
                      placeholder='contraseña'
                    />
                    {errors?.password && (
                      <p className='text-sm text-red-500'>
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <Link className='text-right text-sm text-semibold text-gray-600 flex items-end gap-1.5 justify-end' href='/pswd-forgot'>
                    Recuperar Contraseña
                    <KeyRound className='h-3.5 w-3.5' />
                  </Link>

                  <hr className="border-t-5 border-white"></hr>
                  <hr className="border-t-5 border-white"></hr>
                  <hr className="border-t-1 border-gray-400"></hr>

                  <Button isLoading={isLoading}>Iniciar Sesion</Button>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
