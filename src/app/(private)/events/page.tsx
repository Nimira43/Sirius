import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { BsCalendarCheck } from 'react-icons/bs'

export default function EventsPage() {
  return (
    <>
      <div>
        <h1 className='text-3xl lg:text-4xl xl:text-5xl uppercase font-medium text-main mb-6'>Events</h1>
        <Button asChild>
          <Link 
            className='uppercase'
            href='/events/new'
          >
            <BsCalendarCheck className='mr-2 size-6' />
            New Event
          </Link>
        </Button>
      </div>
    </>   
  )
}