'use client'

import { useEffect } from "react"
import { useCart } from "../hooks/use-cart"
        
const CartClean = () => {
    const { items, clearCart } = useCart()

    useEffect(() => {
        if (items.length > 0) {
            clearCart() // Limpiar el carrito solo después de que el componente se monte
        }
    }, [items, clearCart])

    return (
        <p className='text-sm font-medium text-teal-700'>
            Orden Completada
        </p>
    )
}

export default CartClean
