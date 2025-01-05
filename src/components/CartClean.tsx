'use client'

import { useCart } from "../hooks/use-cart"
import { trpc } from '@/trpc/client'

const CartClean = () => {
    const { items, clearCart } = useCart()
    const { mutate: updateQty } = trpc.auth.updateQty.useMutation({
        onSuccess: () => { }
    })

    if (items.length > 0){
        items.forEach(item => {
            updateQty({ id: item.product.id.toString(), new_qty: -1 * (item?.qty ?? 1) });
        })
        clearCart();
    }

    return (
        <p className='text-sm font-medium text-blue-600'>
            Orden Completada
        </p>
    )
}

export default CartClean
