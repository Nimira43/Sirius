import { db } from '@/drizzle/db'
import { notFound } from 'next/navigation'

export default async function BookingPage({
  params: { clerkUserId }
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

  return (
    <div>
      Booking Page
    </div>
  )
}