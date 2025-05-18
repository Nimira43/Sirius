import { Button } from '@/components/ui/button'
import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default function HomePage() {
  const { userId } = auth()
  
  if (userId != null ) redirect('/events')

  return (
    <div className='text-center container my-4 mx-auto'>
      <h1 className='text-5xl mb-4 text-main logo'>Sirius</h1>
      <div className='flex gap-2 justify-center'>
        <Button className='uppercase' asChild>
          <SignInButton />
        </Button>
        <Button className='uppercase' asChild>
          <SignUpButton />
        </Button>
        <UserButton />
      </div>
    </div>
  )
}
