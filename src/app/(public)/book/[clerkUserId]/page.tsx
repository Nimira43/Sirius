import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { db } from '@/drizzle/db'
import { formatEventDescription } from '@/lib/formatters'
import { clerkClient } from '@clerk/nextjs/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button' 

export default async function BookingPage({
  params: { clerkUserId },
}: {
  params: { clerkUserId: string }
}) {
  const events = await db.query.EventTable.findMany({
    where: ({ 
      clerkUserId: userIdCol,
      isActive 
    }, { eq, and }) => 
      and(
        eq(userIdCol, clerkUserId), 
        eq(isActive, true)
      ),
    orderBy: ({ name }, { desc }) => desc(name),
  })

  if (events.length === 0) return notFound()

  // const { fullName } = await clerkClient().users.getUser(clerkUserId)

  const { firstName, lastName } = await clerkClient.users.getUser(clerkUserId)
  const fullName = `${firstName} ${lastName}`

  return (
    <div className='max-w-5xl mx-auto'>
      <div className='text-4xl md:text-5xl text-main font-medium mb-4 text-center'>
        {fullName}
      </div>
      <div className='text-dark mb-6 max-w-sm mx-auto text-center'>
        Welcome to my Scheduling page. Please follow the instructions to add an event to my Calendar.
      </div>
      <div className='grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))]'>
        {events.map(event => (
          <EventCard 
            key={event.id} 
            {...event}
          />
        ))}
      </div>
    </div>
  )
}

type EventCardProps = {
  id: string
  name: string
  description: string | null
  durationInMinutes: number
  clerkUserId: string
}

function EventCard({
  id,
  name,
  description,
  durationInMinutes,
  clerkUserId
}: EventCardProps) {
  return (
    <Card className='flex flex-col border-main-light'>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          {formatEventDescription(durationInMinutes)}
        </CardDescription>
      </CardHeader>
      {description != null && (
        <CardContent>
          {description}
        </CardContent>
      )}
      <CardFooter className='flex justify-end gap-2 mt-auto'>
        <Button asChild>
          <Link href={`/book/${clerkUserId}/${id}`}>Edit</Link>
        </Button>  
      </CardFooter>   
    </Card>
  )
}
