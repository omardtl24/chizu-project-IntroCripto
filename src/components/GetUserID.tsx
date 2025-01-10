import { getServerUser } from '@/lib/payload-utils'
import { cookies } from 'next/headers'

const GetUserID = async () => {
  const cookie = cookies()
  const {user} = await getServerUser(cookie)
  return user?.id;
}
export default GetUserID