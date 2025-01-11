'use client'

import { useEffect } from "react"
import { useCart } from "../hooks/use-cart"

// import { trpc } from '@/trpc/client'
// const { mutate: updateQty } = trpc.auth.updateQty.useMutation({
//     onSuccess: () => { }
// })
        // items.forEach(item => {
        //     updateQty({ id: item.product.id.toString(), new_qty: -1 * (item?.qty ?? 1) });
        // })
        
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
