"use client"

import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { useCart } from "@/hooks/use-cart"
import { Product } from "@/payload-types"
import { toast } from "sonner"


const AddCartButton = ({product}: {product: Product}) => {

    const { addItem, items } = useCart()
    const [isSuccess, setIsSuccess] = useState<boolean>(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsSuccess(false)
        }, 2000)

        return () => clearTimeout(timeout)
    }, [isSuccess])

    return (
        <Button 
                onClick={  () => {

                    const in_cart = items.some((item) => item.product.id === product.id)

                    if (in_cart){
                        toast.warning('Este producto ya se encuentra en el Carrito.')
                        return
                    }
                    
                    else if (product.qty <= 0){
                        toast.error('No hay unidades disponibles para este producto.')
                        return
                    }

                    else{        
                        addItem(product)
                        setIsSuccess(true)
                        toast.success('Producto añadido al Carrito.')
                    }

                }}

                size='lg' 
                className='w-full'
                disabled={product.qty <= 0}
            >
            {isSuccess ? "¡Añadido!" : "Añadir al carrito"}
        </Button>
    )
}

export default AddCartButton
