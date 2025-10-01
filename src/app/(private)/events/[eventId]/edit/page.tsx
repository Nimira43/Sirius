import { EventForm } from '@/components/forms/EventForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { db } from '@/drizzle/db'
import { auth } from '@clerk/nextjs/server'

export default function EditEventPage({params: {
  eventId
}}: {
  params: { eventId: string}
}) {
  const { userId, redirectToSignIn } = auth()

  if (userId == null) return redirectToSignIn()

  const event = await db.query.EventTable.findFirst({
    where: ({ id, clerkUserId }, { and, eq }) => 
      and(eq(clerkUserId, userId), eq(id, eventId)),
  })

  return (
    <Card className='max-w-md mx-auto'>
      <CardHeader>
        <CardTitle>Edit Event</CardTitle>
      </CardHeader>
      <CardContent>
        <EventForm />
      </CardContent>     
    </Card>
  )
}