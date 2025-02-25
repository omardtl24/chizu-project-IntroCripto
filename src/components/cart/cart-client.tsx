"use client"

import { useCart } from "@/hooks/use-cart"
import { cn } from "@/lib/utils"
import Image from 'next/image'
import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import { formatPrice } from "@/lib/utils"
import { Button, buttonVariants } from "../../components/ui/button";
import { Check, Loader2, X } from "lucide-react"
import { Category } from "../../payload-types"
import { trpc } from '@/trpc/client'
import { useRouter } from 'next/navigation'
import { toast } from "sonner"
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import {User} from '../../payload-types'
import { set } from "zod"


initMercadoPago('APP_USR-93cf7930-b88d-4a34-84c2-760b75083b99');
const CartClient = ({user} : { user : User}) => {
    

    const [preferenceId, setPreferenceId] = useState<string | null>(null);

    interface Product {
        id: string;
        title: string;
        quantity: number;
        unit_price: number;
        picture_url: string;
    }
    const createPreference = async () => {
        try {
            const products: Product[] = items.map(item => {
                const imageUrl = typeof item.product.image_logo === 'string' 
                    ? item.product.image_logo 
                    : item.product.image_logo.url || '';
                return {
                    user_id: user.id,
                    id: item.product.id,
                    title: item.product.name,
                    quantity: item.product.qty,
                    unit_price: item.product.price,
                    picture_url: imageUrl,
                    isProduct: true,
                };
            });

            const response = await fetch("/api/create_preference", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(products),
            });
    
            if (!response.ok) {
                throw new Error("Error en la respuesta del servidor");
            }
    
            const data = await response.json();
            const { id } = data;
            return id;
        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(() => {
        setPreferenceId(null);
        handleBuy();
    }
    , []);

    const handleBuy = async () => {
        const id = await createPreference();
        if (id) {
            setPreferenceId(id);
        }
        console.log(preferenceId)
    }
    const router = useRouter()

    const { items, removeItem, clearCart } = useCart()

    const { mutate: stripe_session, isLoading } = trpc.payment.createSession.useMutation({
        onSuccess: ({ url }) => {
            if (url) { router.push(url) }
        }
    })

    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const cartTotal = items.reduce((total, { product, qty }) => total + (product.price * (qty ?? 1)), 0)

    const products_info = items.map((item) => [item.product.id.toString(), item.qty] as [string, number])

    return (
        <div className='bg-white'>
            <div className='mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8'>
                <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                    Carrito de Compras
                </h1>
                <div className='mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16'>
                    <div className={cn("lg:col-span-7", {
                        'rounded-lg border-2 border-dashed border-zinc-300 p-12':
                            isMounted && items.length === 0,
                    })}>
                        <h2 className='sr-only'>
                            Juegos en tu carrito
                        </h2>

                        {isMounted && items.length === 0 ? (
                            <div className='flex h-full flex-col items-center justify-center space-y-1'>
                                <div
                                    aria-hidden="true"
                                    className='relative mb-4 h-60 w-60 text-muted-foreground'>
                                    <Image
                                        src='/cart/empty-cart.webp'
                                        fill
                                        loading='eager'
                                        alt='meow-dormido'
                                    />
                                </div>
                                <h3 className='font-semibold text-2xl'>Meow sigue dormido.</h3>
                                <p className='text-muted-foreground text-center'>
                                    Coloca algo aquí para despertar a Meow
                                </p>

                                <Link
                                    href='/products'
                                    className={buttonVariants({
                                        variant: 'link',
                                        size: 'sm',
                                        className:
                                            'text-sm text-muted-foreground',
                                    })}>
                                    Añade productos al Carrito
                                </Link>
                            </div>
                        ) : null}

                        {items.length > 0 ? (
                            <div className="flex-shrink-0 flex justify-normal mr-2">
                                <button
                                    className="text-gray-700 hover:text-red-700 mb-2 inline-flex items-center"
                                    onClick={
                                        () => {
                                            clearCart()
                                        }
                                    }
                                >
                                    <X className="w-4 h-4 mt-1 mr-1" /> Vaciar
                                </button>
                            </div>
                        ) : null}

                        <ul
                            className={cn({
                                'divide-y divide-gray-300 border-b border-t border-gray-300':
                                    isMounted && items.length > 0,
                            })}>

                            {isMounted &&
                                items.map((item) => {
                                    const [category] = item.product.category as Category[]
                                    const label = category.name

                                    const { image } = item.product.images[0]

                                    return (
                                        <li
                                            key={item.product.id}
                                            className='flex py-6 sm:py-10'>
                                            <div className='flex-shrink-0 flex flex-col items-center'>
                                                <div className='relative h-24 w-24'>
                                                    {typeof image !== 'string' &&
                                                        image.url ? (
                                                        <Link href={`/product/${item.product.id}`}>
                                                            <Image
                                                                fill
                                                                src={image.url}
                                                                alt='product image'
                                                                className='h-full w-full rounded-md object-cover object-center sm:h-48 sm:w-48'
                                                            />
                                                        </Link>
                                                    ) : null}
                                                </div>
                                                {/* <QuantityController item={item} /> */}
                                            </div>

                                            <div className='ml-4 flex flex-1 flex-col justify-between sm:ml-6'>
                                                <div className='relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0'>
                                                    <div>
                                                        <div className='flex justify-between'>
                                                            <h3 className='text-sm'>
                                                                <Link
                                                                    href={`/product/${item.product.id}`}
                                                                    className='font-medium text-gray-900 hover:text-blue-800'>
                                                                    {item.product.name}
                                                                </Link>
                                                            </h3>
                                                        </div>

                                                        <div className='mt-1 flex text-sm'>
                                                            <p className='text-gray-700'>
                                                                Categoria: {label}
                                                            </p>
                                                        </div>

                                                        <p className='mt-1 text-sm font-medium text-gray-900'>
                                                            {formatPrice(item.product.price)}
                                                        </p>

                                                        <p className='mt-4 flex space-x-2 text-sm text-gray-700'>
                                                            <Check className='h-5 w-5 flex-shrink-0 text-green-500' />

                                                            <span>
                                                                IVA incluido.
                                                            </span>
                                                        </p>
                                                    </div>

                                                    <div className='mt-4 sm:mt-0 sm:pr-9 w-20'>
                                                        <div className='absolute right-0 top-0'>
                                                            <Button
                                                                aria-label='remove product'
                                                                onClick={() => {
                                                                    removeItem(item.product.id)
                                                                }
                                                                }
                                                                variant='ghost'>
                                                                <X
                                                                    className='h-5 w-5 text-gray-700'
                                                                    aria-hidden='true'
                                                                />
                                                            </Button>

                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </li>
                                    )
                                })}
                        </ul>

                    </div>


                    <section className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
                        <h2 className='text-lg font-medium text-gray-900'>Resumen de la Orden</h2>
                        <div className='mt-6 space-y-4'>
                            <div className='flex items-center justify-between'>
                                <p className='text-sm text-gray-600'>Subtotal</p>
                                <p className='text-sm fotn-medium text-gray-900'>
                                    {isMounted ? (
                                        formatPrice(cartTotal)
                                    ) : (
                                        <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
                                    )}
                                </p>
                            </div>

                            <div className='flex items-center justify-between border-t border-gray-400 pt-4'>
                                <div className='text-base font-medium text-gray-900'>
                                    Total de la Orden
                                </div>
                                <div className='text-base font-medium text-gray-900'>
                                    {isMounted ? (
                                        formatPrice(cartTotal)
                                    ) : (
                                        <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className='mt-6'>
                            <Button className='w-full' size='lg'
                                onClick={
                                    () => {
                                        if (items.length > 0) {
                                            stripe_session({ products_info: products_info });
                                            // clearCart();
                                        }
                                        else { toast.warning('Añade productos al Carrito antes de ingresar a la Pasarela de Pagos.') }
                                    }
                                }

                                disabled={items.length === 0 || isLoading}
                            >
                                {isLoading ? (<Loader2 className='h-4 w-4 animate-spin mr-1.5 ml-1.5' />) : null}
                                Finalizar Compra
                            </Button>

                            
                            {/* <Button className='w-full mt-4' size='lg' onClick={handleBuy}> Comprar con Mercado Pago</Button> */}
                            {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} customization={{ texts:{ valueProp: 'smart_option'}}} />}
                            
                        </div>

                    </section>
                </div>
            </div>
        </div>
    )
}

export default CartClient
