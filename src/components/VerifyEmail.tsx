'use client'

import { trpc } from '@/trpc/client'
import Image from 'next/image'
import Link from 'next/link'
import { Loader2, MailCheck, XCircle } from 'lucide-react'
import { buttonVariants } from './ui/button'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'


interface VerifyEmailProps {
  token: string
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const router = useRouter()
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery( {token} )

  useEffect(() => {
    if (data?.success) {
      const redirectTimer = setTimeout(() => { router.push('/sign-in') }, 6150); // milisegundos
      // Limpiar el temporizador si el componente se desmonta antes de que se ejecute el temporizador
      return () => clearTimeout(redirectTimer);
    }
  }, [data?.success, router]);

  if (isError) {
    return (

      <div className='flex flex-col items-center gap-2'>

        <div className='relative mb-4 h-60 w-60 text-muted-foreground'>
            < Image 
                src='/verify/error.webp' alt='error-correo-img' 
                layout="responsive" height={35} width={50}
            />
        </div>

        <XCircle className='h-10 w-10 text-red-600' />

        <h3 className='font-semibold text-xl'>
          Verificacion Fallida
        </h3>

        <p className='text-gray-600 text-center'>
          Usted ya ha sido verificado previamente o su Token es invalido o ha expirado.
        </p>
        <Link
          className={buttonVariants({ variant : 'link' })}
          href='/sign-in'>
          Intentelo de Nuevo.
        </Link>

      </div>
    )

  }


  if (data?.success) {
    return (

      <div className='flex h-full flex-col items-center justify-center'>

        <div className='relative h-75 w-75 text-muted-foreground mt-10 mb-1'>
            < Image 
                src='/verify/success.webp' alt='success-correo-img' 
                layout="responsive" height={1077} width={780}
            />
        </div>

        <MailCheck className='h-10 w-10 text-green-600' />

        <h3 className='font-semibold text-2xl text-gray-900'>
          ¡Verificacion Exitosa!
        </h3>

        <p className='text-gray-800 text-center mt-1'>
          Gracias por registrarse en {' '}
          <span className='font-semibold text-teal-800' >Chizu</span>.
        </p>

        <hr></hr>
        <hr></hr>

        <Loader2 className='animate-spin h-4 w-4 text-zinc-400' />
        <p className='text-gray-600 text-center text-sm'>
          Seras redirigido en breve...
        </p>

        {/* <Link
          className={buttonVariants({ className: 'mt-4' })}
          href='/sign-in'>
          Ingresar
        </Link> */}

      </div>

    )
  }


  if (isLoading) {
    return (

      <div className='flex flex-col items-center gap-2 py-8'>
        <br></br>
        <br></br>
        <br></br>

        <Loader2 className='animate-spin h-11 w-11 text-zinc-400' />

        <h3 className='font-semibold text-xl'>
          Verificando...
        </h3>

        <p className='text-gray-600 text-sm'>
          Estamos terminando de verificar su nueva Cuenta. Esto tardara unos segundos más.
        </p>

      </div>

    )
  }


}

export default VerifyEmail
