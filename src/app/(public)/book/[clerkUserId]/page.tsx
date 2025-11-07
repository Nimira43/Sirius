import { db } from "@/drizzle/db"

export default async function BookingPage({
  params: { clerkUserId }
}: {
  params: { clerkUserId: string }
}) {
  const events = await db.query.EventTable.findMany({
    where: ({ clerkUserId: userIdCol }, { eq }) => eq(userIdCol, clerkUserId),
    orderBy: ({ createdAt }, { desc }) => desc(createdAt),
  })

  return (
    <div>
      Booking Page
    </div>
  )
}