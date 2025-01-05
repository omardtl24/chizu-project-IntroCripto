import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

const MaxWidthWrapper = ({
    className,
    children
} : {
    className?: string
    children?: ReactNode
}) => {
  return (
    <div className= { cn('w-full max-w-screen-xl px-2.5 xl:mx-28 lg:mx-24 md:mx-20 sm:mx-4', className) } >
        {children}
    </div>
  )
}

export default MaxWidthWrapper
