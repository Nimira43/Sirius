import { EventForm } from '@/components/forms/EventForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { auth } from '@clerk/nextjs/server'

export default function EditEventPage() {
  const { userId, redirectToSignIn } = auth()

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