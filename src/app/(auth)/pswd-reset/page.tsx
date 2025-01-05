"use client"

import {trpc} from '@/trpc/client'
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { ArrowLeft, ArrowRight, Lock, LockOpen, MailPlus, Minus } from "lucide-react"
import Link from "next/link"
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {ZodEffects, ZodError, z} from 'zod'
import Image from "next/image"
import { use, useCallback, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {toast} from 'sonner'
import { ResetValidator, TypeResetValidator } from '@/lib/validators/reset-paswd-validator'


const Page = () => {

    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const[ success, setSuccess ] = useState(false)
    const[ fail, setFail ] = useState(false)

    const { register, handleSubmit, formState: {errors}, } = useForm<TypeResetValidator>({
        resolver: zodResolver(ResetValidator),
    })

    const {mutate, isLoading} = trpc.auth.resetUserPassword.useMutation({
      
      // manejar errores
      onError: (err) => {
        // error con el correo
        if (err.data?.code === 'BAD_REQUEST') {
          toast.error( 'Token invalido o caducado.' )
          setFail(true)
          return
        }
        // error con el formato
        if (err instanceof ZodError) {
          toast.error('Contraseña Invalida.')
          setFail(true)
          return
        }
        // algun otro error con el servidor INTERNAL_SERVER_ERROR
        toast.error( 'Hubo un error en el servidor, porfavor intente de nuevo.' )
      },

      onSuccess: () => {
        setSuccess(true)
        toast.success( `Su contraseña ha sido actualizada.` )
      },

    })

    const onSubmit = ({ password, confirmPassword }: TypeResetValidator) => {
        mutate({password, token})
    }


    if (success){
        return(
            <>
                  
            <div className='flex h-full flex-col items-center justify-center space-y-1'>

            <div className='relative mb-4 h-60 w-60 text-muted-foreground'>
              < Image 
                  src='/verify/reset-success.png' alt='verificar-correo-img' 
                  height={1280} width={1280}
              />
            </div>

            <br></br>
            <br></br>

            <Lock className='h-8 w-8 text-green-700'/>

            <h3 className='font-semibold text-2xl text-gray-900'>
            Contraseña Restablecida Exitosamente
            </h3>


              <p className='text-gray-600 text-center text-semibold'>
                Su contraseña ha sido actulizada correctamente, ya es posible Iniciar Sesion.
              </p>

              <Link
                  className={buttonVariants({
                    variant: 'link',
                    className: 'gap-1.5',
                  })}
                  href='/sign-in'>
                  <ArrowLeft className='h-4 w-4' />
                  Volver
            </Link>


            </div>

          </>
        )
    }

    else if (fail){
        return(
            <>
            <div className='container relative flex pt-12 flex-col items-center justify-center lg:px-0'>
            <div className='flex h-full flex-col items-center justify-center space-y-1'>

            <div className='relative mb-4 h-60 w-60 text-muted-foreground'>
              < Image 
                  src='/verify/reset-fail.png' alt='verificar-correo-img' 
                  height={1651} width={1800}
              />
            </div>

            <br></br>

            <LockOpen className='h-8 w-8 text-red-700'/>

            <h3 className='font-semibold text-2xl text-gray-900'>
            Fallo en Restablecimiento de Contraseña
            </h3>


              <p className='text-gray-600 text-center text-semibold'>
                Su contraseña no se ha podido actualizar, el token de acceso es invalido o ha caducado.
              </p>

              <Link
                  className={buttonVariants({
                    variant: 'link',
                    className: 'gap-1.5',
                  })}
                  href='/pswd-forgot'>
                  <ArrowLeft className='h-4 w-4' />
                  Volver
            </Link>


            </div>
            </div>

          </>
        )
    }
    
    else{ 
        return (
          <>
            <div className='container relative flex pt-12 flex-col items-center justify-center lg:px-0'>
              <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>

                <div className='flex flex-col items-center space-y-2 text-center'>
                  <img src='/logo.png' width={115} height={45} alt="logo"/>

                  <h1 className='text-2xl font-semibold tracking-tight'>
                    Restablecer Contraseña
                  </h1>

                  <Link
                    className={buttonVariants({
                      variant: 'link',
                      className: 'gap-1.5',
                    })}
                    href='/sign-in'>
                    <ArrowLeft className='h-4 w-4' />
                    Recordaste la contraseña? Inicia Sesion
                  </Link>
                </div>
      
                <div className='grid gap-6'>

                  <form onSubmit={handleSubmit(onSubmit)}>

                    <div className='grid gap-2'>

                      <div className='grid gap-1 py-2'>
                        <Label htmlFor='clave'>Contraseña</Label>
                        <Input
                          {...register('password')}
                          type='password'
                          className={cn({
                            'focus-visible:ring-red-500':
                              errors.password,
                          })}
                          placeholder='Ingresa la nueva contraseña'
                        />

                        {errors?.password && (
                          <p className='text-sm text-red-500'>
                            {errors.password.message}
                          </p>
                        )}

                      </div>

                      <div className='grid gap-1 py-2'>
                        <Label htmlFor='confirmacion'>Confirmacion</Label>
                        <Input
                          {...register('confirmPassword')}
                          type='password'
                          className={cn({
                            'focus-visible:ring-red-500':
                              errors.confirmPassword,
                          })}
                          placeholder='Confirma la nueva contraseña'
                        />

                        {errors?.confirmPassword && (
                          <p className='text-sm text-red-500'>
                            {errors.confirmPassword.message}
                          </p>
                        )}

                      </div>

                        
                      <hr className="border-t-5 border-white"></hr>
                      <hr className="border-t-1 border-gray-400"></hr>

                      <Button>Recuperar</Button>

                    </div>
                  </form>
                </div>

              </div>
            </div>
          </>
        )
    }

}

export default Page
