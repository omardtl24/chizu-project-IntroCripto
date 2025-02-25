import Image from 'next/image'
import { cookies } from 'next/headers'
import { getServerUser } from '@/lib/payload-utils'
import { getPayloadClient } from '@/getPayload'
import { notFound, redirect } from 'next/navigation'
import { Category, Product, User, ProductFile, Reward, Order, Tier } from "../../payload-types"
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import PaymentStatus from '../../components/PaymentStatus'
import CartClean from '../../components/CartClean'

interface PageProps {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

const TierThankYouPage = async ({ searchParams }: PageProps) => {
    const orderId = searchParams.orderId
    const paymentId = searchParams.payment_id // new
    const preferenceId = searchParams.preference_id // new
    const nextCookies = cookies()

    const { user } = await getServerUser(nextCookies)
    const payload = await getPayloadClient()

    const { docs: orders } = await payload.find({
        collection: "orders",
        depth: 2,
        where: {
            id: {
                equals: orderId,
            },
        },
    })
    const [order] = orders as unknown as Order[]

    if (!order) { return notFound() }

    const orderUserId =
        typeof order.user === 'string'
            ? order.user
            : (order.user as User).id

    if (orderUserId !== user?.id) {   //no autorizado
        return redirect(`/sign-in?origin=tier-thank-you?orderId=${order.id}`)
    }

    const orderTotal = order.total as number
    const tier = order.tiers as Tier

    return (
        <main className="relative lg:min-h-full">

            <div className="hidden lg:block h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
                <Image fill
                    src='/thank-you.webp'
                    className='h-full w-full object-cover object-center'
                    alt='Thank you for your Order :)' />
            </div>

            <div className='mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-16 xl:gap-x-24'>
                <div className='lg:col-start-2'>
                    <CartClean />

                    <h1 className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
                        Gracias por su Apoyo :3
                    </h1>
                    {order._isPaid ? <p className='mt-2 text-base text-gray-700'>
                        Su subscripción ha sido exitosa y ya puede acceder a sus recompensas. Le hemos enviamos un correo con los detalles a {' '}
                        {typeof order.user !== 'string' ? (
                            <span className='font-medium text-gray-900'>
                                {(order.user as User).email}
                            </span>
                        ) : null}

                    </p> : (<p className='mt-2 text-base text-gray-700'>
                        Estamos procesando su Subscripcion, esto tomará cerca de{' '}
                        <span className='font-medium text-gray-900'>30 segundos</span>. Le enviaremos una confirmación a su correo al finalizar.
                    </p>
                    )}
                    <div className='mt-10 text-sm font-medium'>
                        <div className='text-muted-foreground'>
                            Order No.
                        </div>
                        <div className='mt-2 text-gray-900'>
                            {order.id}
                        </div>

                        <ul className='mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-muted-foreground'>
                            {(tier.rewards as Reward[]).map((reward) => {
                                const label = reward.label //label del reward
                                const downloadUrl = reward.url as string

                                return (<li key={reward.id} className='flex space-x-6 py-6'>

                                    <div className='flex-auto flex flex-col justify-between'>
                                        <div className='space-y-1'>
                                            <h3 className='text-gray-900'>
                                                {/* nombre */}
                                                {label}
                                            </h3>

                                            <p className='my-1'>
                                                Tier: {tier.title}
                                            </p>
                                        </div>
                                        {/* descargar imgs*/}
                                        {order._isPaid ? (
                                            <a href={downloadUrl}
                                                download={label}
                                                className='text-teal-700 hover:underline-offset-2'>
                                                Descargar archivo
                                                {downloadUrl}
                                            </a>
                                        ) : null}
                                    </div>

                                </li>
                                )
                            })}
                        </ul>

                        <div className='space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-muted-foreground'>
                            {/* <div className='flex justify-between'>
                                <p>Descuentos</p>
                                <p className='text-gray-900'>{formatPrice(orderTotal)}</p>
                            </div> */}

                            <div className='flex items-center justify-between pt-4 text-gray-900'> {/*border-t border-gray-200 */}
                                <p className='text-base'>Total</p>
                                <p className='text-base'> {formatPrice(orderTotal)}</p>
                            </div>
                        </div>

                        <PaymentStatus
                            isPaid={Boolean(order._isPaid)}
                            orderEmail={(order.user as User).email}
                            orderId={String(order.id)}
                            paymentId={Array.isArray(paymentId) ? paymentId[0] : paymentId || ''}
                            order={order} />

                        <div className='mt-10 border-t border-gray-200 py-6 text-right'>
                            <Link href='/products' className='text-sm font-medium text-teal-700 hover:text-teal-600'>
                                Continuar comprando &rarr;
                            </Link>
                        </div>
                    </div>
                </div>

            </div>


        </main>
    )
}

export default TierThankYouPage
