"use client"

import {trpc} from '@/trpc/client'
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { ArrowRight, TextSearch, CircleDollarSign } from "lucide-react"
import Link from "next/link"
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ZodError } from 'zod'
import { useRouter } from 'next/navigation'
import {toast} from 'sonner'
import { SignUpValidator, TypeSignUpValidator } from '@/lib/validators/signup-credentials-validator'
import Image from 'next/image'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"


const Page = () => {

    const { register, handleSubmit, formState: {errors}, } = useForm<TypeSignUpValidator>({
        resolver: zodResolver(SignUpValidator),
    })

    const router = useRouter()

    const {mutate, isLoading} = trpc.auth.createPayloadUser.useMutation({
      
      // manejar errores
      onError: (err) => {
        // error con el correo
        if (err.data?.code === 'CONFLICT') {
          toast.warning( 'Este correo ya se encuentra registrado.' )
          return
        }

        // error con el user
        if (err.data?.code === 'BAD_REQUEST') {
          toast.warning( 'Nombre de usuario ya registrado.' )
          return
        }

        // error con la pswd
        if (err instanceof ZodError) {
          toast.error(err.issues[0].message)
          return
        }

        // algun otro error con el servidor
        toast.error( 'Hubo un error en el servidor, porfavor intente de nuevo.' )
      },

      onSuccess: ({ sentToEmail }) => {
        toast.success( `Porfavor verifique su cuenta en ${sentToEmail}.` )
        router.push('/verify-email?to=' + sentToEmail)
      },

    })

    const onSubmit = ({ username, email, password, confirmPassword }: TypeSignUpValidator) => {
        mutate({username, email, password, confirmPassword})
    }

    return (
      <main className='lg:min-h-full'>
      <div className='hidden lg:block h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12'>
        <Image
            fill
            src='/sign-up.png'
            className='h-full w-full object-cover object-center'
            alt='sign-in'
        />
      </div>

      <div>
        <div className='mx-auto max-w-2xl px-6 py-4 sm:px-6 sm:py-4 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-19 lg:py-4 xl:gap-x-24'>
          <div className='lg:col-start-2'>


              <div className='flex flex-col items-center space-y-2 text-center'>
                <img src='/logo.png' width={115} height={45} alt="logo"/>
                <h1 className='text-2xl font-semibold tracking-tight'>
                  Registrar Cuenta
                </h1>
    
                <Link
                  className={buttonVariants({
                    variant: 'link',
                    className: 'gap-1.5',
                  })}
                  href='/sign-in'>
                  Ya estas registrado?  Inicia Sesion
                  <ArrowRight className='h-4 w-4' />
                </Link>
              </div>
    
              <div className='grid gap-6'>

                <form onSubmit={handleSubmit(onSubmit)}>

                  <div className='grid gap-1'>

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
                      <Label htmlFor='username'>Username</Label>
                      <Input
                        {...register('username')}
                        className={cn({
                          'focus-visible:ring-red-500':
                            errors.username,
                        })}
                        placeholder='Ingresa tu nombre de usuario'
                      />

                      {errors?.username && (
                        <p className='text-sm text-red-500'>
                          {errors.username.message}
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
                        placeholder='Ingresa tu contraseña'

                      />
                      {/* <div className='text-sm text-gray-600'>La contraseña ha de ser de almenos 8 caracteres.</div> */}
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
                        placeholder='Confirma tu contraseña'

                      />
                      {/* <div className='text-sm text-gray-600'>La contraseña ha de ser de almenos 8 caracteres.</div> */}
                      {errors?.confirmPassword && (
                        <p className='text-sm text-red-500'>
                          {errors.confirmPassword.message}
                        </p>
                      )}

                    </div>
                      
                    <hr className="border-t-8 border-white"></hr>
                    <hr className="border-t-1 border-gray-400"></hr>

                    <Button>Registrarse</Button>

                    <Dialog>

                      <DialogTrigger asChild>
                        <Button variant="ghost" className='gap-1.5 justify-end text-blue-700'>
                          <CircleDollarSign className='h-4 w-4' />
                          Politica de Pagos
                        </Button>
                      </DialogTrigger>


                      <DialogContent className="lg:max-w-[1000px] sm:max-w-[650px]">

                        <DialogHeader>
                          <DialogTitle>Tratamiento de Pagos y Moneda</DialogTitle>
                          <DialogDescription>
                            Su seguridad y privacidad financiera es lo más importante para nosotros.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-1.5 py-1.5">

                          <div>
                            Todos los precios publicados en la UwUteca son en Pesos Colombianos [COP].
                          </div>

                          <div>
                            Aceptamos como medio de pago tarjetas de crédito/débito.
                            Todos los pagos se procesan a través de un proveedor de servicios de pago seguro (Stripe) bajo la normativa PCI DSS a la fecha, para garantizar la seguridad de sus datos financieros.
                          </div>

                          <div>
                            Los pagos deben realizarse en su totalidad al momento de la compra. Una vez que se ha realizado el pago, comenzaremos a procesar su pedido. Por favor, tenga en cuenta que todos los precios están en Pesos Colombianos [COP] y que cualquier
                            tasa por conversión de moneda o compras internacionales es responsabilidad de su banco.
                          </div>

                        </div>

                        <hr className="border-t-1 border-gray-400"></hr>

                        <DialogFooter>
                          <div className='text-sm text-semibold text-gray-700'>
                            Al registrar una nueva cuenta, usted acepta nuestros terminos y condiciones para el tratamiento de datos.
                          </div>
                        </DialogFooter>

                      </DialogContent>

                    </Dialog>


                    <Dialog>

                      <DialogTrigger asChild>
                        <Button variant="ghost" className='gap-1.5 justify-end text-blue-700'>
                          <TextSearch className='h-4 w-4' />
                          Politica de Privacidad
                        </Button>
                      </DialogTrigger>


                      <DialogContent className="lg:max-w-[1000px] sm:max-w-[650px]">

                        <DialogHeader>
                          <DialogTitle>Recopilación de Información</DialogTitle>
                          <DialogDescription>
                            En la UwUteca, respetamos su privacidad y nos comprometemos a protegerla mediante el cumplimiento de esta política.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-1.5 py-1.5">

                          <div>
                            No compartimos su información personal con terceros,
                            excepto en los casos en que sea necesario para cumplir con la ley y proteger nuestros derechos o propiedad.
                          </div>

                          <div>
                            Podemos recopilar varios tipos de información acerca los usuarios de nuestro servicio, incluyendo:
                            correo, contraseña, nombre de usuario, compras y fechas de creacion y modificacion de cuenta e inicios de sesion.
                            Todas las contraseñas registradas son encirptadas y no se almacenan en texto plano.
                          </div>

                          <div>
                            Usamos la información que recopilamos para mantener, proporcionar y mejorar nuestro servicio; que incluye y no se limita a : Presentar nuestro sitio web y su contenido.
                            Proporcionar productos e información solicitada incluyendo facturación y cobro. Enviar correos de verificación y confirmacion.
                          </div>

                          <div>
                            Puedes revisar y cambiar tu información personal iniciando sesión
                            y visitando tu cuenta.
                          </div>

                          <div>
                            Cualquier cambio que hagamos en nuestra política de privacidad en esta página.
                            Si tienes alguna pregunta sobre esta Política de Privacidad, por favor contáctanos en: oilstockmanager@gmail.com
                          </div>


                        </div>

                        <hr className="border-t-1 border-gray-400"></hr>

                        <DialogFooter>
                          <div className='text-sm text-semibold text-gray-700'>
                            Al registrar una nueva cuenta, usted acepta nuestros terminos y condiciones para el tratamiento de datos.
                          </div>
                        </DialogFooter>

                      </DialogContent>

                    </Dialog>

                  </div>
                
                </form>

              </div>

            </div>
        </div>
      </div>

    </main>
    )
}

export default Page
