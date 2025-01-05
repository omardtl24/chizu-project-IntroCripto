import VerifyEmail from "@/components/VerifyEmail"
import Image from "next/image"

interface PageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}

const VerifyEmailPage = ( {searchParams} : PageProps ) => {
    const token = searchParams.token
    const new_email = searchParams.to

    return(

        <div className='container relative flex pt-16 flex-col items-center justify-center lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>

          {token && typeof token === 'string' ? (

            <div className='grid gap-6'>
              <VerifyEmail token = {token} />
            </div>

          ) : (

            <div className='flex h-full flex-col items-center justify-center space-y-1'>

              <div className='relative mb-4 h-60 w-60 text-muted-foreground'>
                < Image 
                    src='/verify/verify-mail.png' alt='verificar-correo-img' 
                    layout="responsive" height={500} width={680}
                />
              </div>

              <br></br>
              <br></br>
  
              <h3 className='font-semibold text-2xl text-gray-900'>
                Verifica tu Cuenta
              </h3>

              {new_email ? (

                <p className='text-gray-700 text-center'>
                  Hemos enviado un enlace de verificacion a {' '}
                  <span className='font-semibold text-gray-800'> {new_email} </span>
                </p>

              ) : (

                <p className='text-gray-700 text-center'>
                  Hemos enviado un enlace de verificacion por correo.
                </p>

              )}

            </div>

          )}

        </div>
      </div>

    )

}

export default VerifyEmailPage
