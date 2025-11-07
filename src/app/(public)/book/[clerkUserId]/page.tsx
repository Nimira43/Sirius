import { db } from '@/drizzle/db'

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

  return (
    <div>
      Booking Page
    </div>
  )
}