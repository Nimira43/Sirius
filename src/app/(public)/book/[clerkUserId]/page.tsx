import { db } from '@/drizzle/db'
import { clerkClient } from '@clerk/nextjs/server'
import { notFound } from 'next/navigation'

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
    </div>
  )
}