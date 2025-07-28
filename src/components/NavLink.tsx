'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps } from 'react'

export function NavLink({ className, ...props}: ComponentProps<typeof Link>) {
  const path = usePathname()
  const isActive = path == props.href
  
  return (
    <Link
      {...props}
      className={cn(
        'transition-colors uppercase font-medium',
        isActive
          ? 'text-main'
          : 'text-grey-dark hover:text-main',
        className
      )}
    >
    </Link>
  )
}