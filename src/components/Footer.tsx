'use client'

import { usePathname } from 'next/navigation'
import MaxWidthWrapper from './MaxWidthWrapper'

import { CircleDollarSign, TextSearch } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"


const Footer = () => {
    const pathname = usePathname()
    const pathsToMinimize = [
        '/verify-email',
        '/sign-up',
        '/sign-in',
    ]

    return (
        <footer className='bg-white flex-grow-0'>
            <div className="lg:mx-24 md:mx-20 sm:mx-4">
                <div className='border-t border-gray-200'>
                    {pathsToMinimize.includes(pathname) ? null : (
                        <div className='pb-8 pt-8'>
                            <div className='flex justify-center'>
                                <img src='/logo.png' width={115} height={45} alt="logo" />
                            </div>
                        </div>
                    )}

                </div>

                <div className='py-5 md:flex md:items-center md:justify-between'>

                    <div className='text-center md:text-left'>
                        <div className='flex space-x-8'>
                            <Dialog>

                                <DialogTrigger asChild>
                                    <Button variant="ghost" className='gap-1.5 justify-end text-gray-600'>
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


                            <Dialog>

                                <DialogTrigger asChild>
                                    <Button variant="ghost" className='gap-1.5 justify-end text-gray-600'>
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
                        </div>
                    </div>

                    <div className='mt-0 flex items-center justify-center md:mt-0'>
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
