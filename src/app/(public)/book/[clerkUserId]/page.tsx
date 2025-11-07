import { db } from "@/drizzle/db"

export default async function BookingPage({
  params: { clerkUserId }
}: {
  params: { clerkUserId: string }
}) {
  const events = await db.query.EventTable.findMany({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
    orderBy: ({ createdAt }, { desc }) => desc(createdAt),
  })

  return (
    <div>
      Booking Page
    </div>
  )
}