import { Product } from '@/payload-types'
import { useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton'
import Link from 'next/link'
import { cn, formatPrice } from '../lib/utils'
import { boolean } from 'zod'
import Slider from './Slider'

interface Props {
    product: Product | null,
    index: number,
    category?: string,
    // key: string,
}

const PlaceHolder = () => {
    return (
        <div className='flex flex-col w-3/4 h-3/4'>
            
          <div className='relative bg-zinc-400 aspect-square w-full h-full overflow-hidden rounded-xl'>
            <Skeleton className='h-full w-full' />
          </div>
          <Skeleton className='mt-4 w-18 h-4 rounded-lg' />
          <Skeleton className='mt-2 w-2/3 h-4 rounded-lg' />
          <Skeleton className='mt-2 w-16 h-4 rounded-lg' />

        </div>
    )
}

const ProductListing = (props : Props) => {
    const { product, index, category } = props
    const [isVisible, setIsVisible] = useState(false)
    useEffect(() => {

        const timer = setTimeout( () => {
            setIsVisible(true) 
        }, index * 100)

        return () => clearTimeout(timer)

    }, [index])

    if (!product || !isVisible){ return <PlaceHolder/> }

    const urls = product.images.map( ({image}) => (
        typeof image === 'string' ? image : image.url
    )).filter(Boolean) as string[]

    if (isVisible && product){
        return (
            <Link
                className = { cn( 'invisible h-full w-full cursor-pointer group/main',
                                { 'visible animate-in fade-in-8': isVisible, }
                )}
                href={`/product/${product.id}`}>
                    
                <div className='flex flex-col w-full'>
                    <Slider urls={urls} />

                    <h3 className='mt-4 font-medium text-sm text-gray-700'>
                        {product.name}
                    </h3>

                    <p className='mt-1 text-sm text-gray-500'>
                        {/* @ts-ignore */}
                        {category ?? 'Estrenos'}
                    </p>

                    <p className='mt-1 font-medium text-sm text-gray-900'>
                        {formatPrice(product.price)}
                    </p>

                </div>  
          </Link>
        )
    }
}

export default ProductListing
