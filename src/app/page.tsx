import { Button } from '@/components/ui/button'
import { SignInButton, SignUpButton } from '@clerk/nextjs'

export default function Sirius() {
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
      </div>
    </div>
  )
}
