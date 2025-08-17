import { Button } from '@/components/ui/button'
import { db } from '@/drizzle/db'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import { BsCalendarCheck, BsCalendar3 } from 'react-icons/bs'

export default async function EventsPage() {
  const { userId, redirectToSignIn } = auth()

  if (userId == null) return redirectToSignIn()

  const events = await db.query.EventTable.findMany({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
    orderBy: ({ createdAt }, { desc }) => desc(createdAt),
  })

  return (
    <>
      <div className='flex gap-4 items-baseline'>
        <h1 className='text-3xl lg:text-4xl xl:text-5xl font-medium text-dark mb-6'>Events</h1>
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
      {events.length > 0 
        ? (<h1>Events</h1>) 
        : (
          <div className='flex flex-col items-center gap-4'>
            <BsCalendar3 className='size-16 mx-auto' />
            <span>There are currently no events to show. Create your first event to get started.</span>
            <Button 
              size='lg'
              className='text-lg'
              asChild
            >
              <Link 
                className='uppercase'
                href='/events/new'
              >
                <BsCalendarCheck className='mr-2 size-6' />
                New Event
              </Link>
            </Button>
          </div>
        )
      }
    </>   
  )
}