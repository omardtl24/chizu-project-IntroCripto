import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export const useAuth = () => {
  const router = useRouter()

  const signOut = async () => {

    try {

      const res = await fetch( `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`, 
        {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', },
        }
      )

      if (!res.ok) throw new Error()

      toast.success('Cierre de Sesion exitoso.')

      router.push('/sign-in')
      router.refresh()

    } 
    catch (e) {
      toast.error("Hubo un error en el cierre de Sesion, porfavor intente de nuevo.")
    }

  }

  return { signOut }
}
