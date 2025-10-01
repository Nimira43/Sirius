import { EventForm } from '@/components/forms/EventForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function EditEventPage() {
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