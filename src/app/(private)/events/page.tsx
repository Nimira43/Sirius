import { CopyEventButton } from '@/components/forms/CopyEventButton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { db } from '@/drizzle/db'
import { formatEventDescription } from '@/lib/formatters'
import { cn } from '@/lib/utils'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import { BsCalendarCheck, BsCalendar3 } from 'react-icons/bs'

export const revalidate = 0

export default async function EventsPage() {
  const { userId, redirectToSignIn } = auth()

  if (userId == null) return redirectToSignIn()

  const events = await db.query.EventTable.findMany({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
    orderBy: ({ createdAt }, { desc }) => desc(createdAt),
  })

  return (
    <>
      <div className='flex gap-4 items-center mb-6'>
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
          // <div className='grid gap-4 grid-cols[repeat(auto-fill, minmax(400px, 1fr))]'>
          <div className='grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(400px,1fr))]'>

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

type EventCardProps = {
  id: string
  isActive: boolean
  name: string
  description: string | null
  durationInMinutes: number
  clerkUserId: string
}

function EventCard({
  id,
  isActive,
  name,
  description,
  durationInMinutes,
  clerkUserId
}: EventCardProps) {
  return (
    <Card 
      className={cn(
        'flex flex-col', !isActive && 'border-main-light'
      )}
    >
      <CardHeader
        className={cn(
          !isActive && 'opacity-50'
        )}
      >
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          {formatEventDescription(durationInMinutes)}
        </CardDescription>
      </CardHeader>
      {description != null && (
        <CardContent
          className={cn(
            !isActive && 'opacity-50'
          )}
        >
          {description}
        </CardContent>
      )}
      <CardFooter className='flex justify-end gap-2 mt-auto'>
        {isActive && (
          <CopyEventButton
            variant='outline'
            eventId={id}
            clerkUserId={clerkUserId}
          />
        )} 
        <Button asChild>
          <Link href={`/events/${id}/edit`}>Edit</Link>
        </Button>  
      </CardFooter>   
    </Card>
  )
}