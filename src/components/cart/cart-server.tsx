import { getServerUser } from '@/lib/payload-utils'
import { cookies } from 'next/headers'
import CartClient from './cart-client'

const CartServer = async () => {
    const cookie = cookies()
    const { user } = await getServerUser(cookie)
    if (!user) {
        return <div>User not found</div>
    }

    return (
        <CartClient user={user} />
    )
}

export default CartServer
