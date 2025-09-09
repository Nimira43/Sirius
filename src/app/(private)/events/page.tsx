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
      <div className='flex gap-4 items-center'>
        <h1 className='text-3xl lg:text-4xl xl:text-5xl font-medium'>Events</h1>
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
      {events.length > 0 ? 
        (
          <div className='grid gap-4 grid-cols[repeat(auto-fill, minmax(400px, 1fr))]'>
            {events.map(event => (
              <EventCard 
                key={event.id} 
                {...event}
              />
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center gap-4 mt-6'>
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

function EventCard({
  id,
  isActive,
  name,
  description,
  durationInMinutes,
  ClerkUserId
})