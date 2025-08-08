import { NavLink } from '@/components/NavLink'
import { UserButton } from '@clerk/nextjs'
import { ReactNode } from 'react'
import { GiPolarStar } from 'react-icons/gi'

export default function PrivateLayout({ children }: { children: ReactNode} ) {
  return (
    <>
      <header className='flex py-2 border-b bg-card'>
        <nav className='font-medium flex items-center gap-6 container'>
          <div className='flex items-center gap-2 font-medium mr-auto'>
            <GiPolarStar className='size-10 text-main'/>
            <span className='logo text-main text-3xl'>Sirius</span>
          </div>
          <NavLink
            href='/events' 
          >
            Events
          </NavLink>
          <NavLink
            href='/schedule' 
          >
            Schedule
          </NavLink>
          <div className='ml-auto size-10'>
            <UserButton 
              appearance={{ 
                elements: {
                  userButtonAvatarBox: 'size-full'
                } 
              }}
            />
          </div>
        </nav>
      </header>
      <main className='container my-6'>
        {children} 
      </main>
    </>
  )
}