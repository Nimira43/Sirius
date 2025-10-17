import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { auth } from '@clerk/nextjs/server'

export default function SchedulePage() {
  const { userId, redirectToSignIn } = auth()
  
  if (!userId == null) return redirectToSignIn
  
  return (
    <Card className='max-w-md mx-auto'>
      <CardHeader>
        <CardTitle>Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <h1>Under Contruction</h1>
      </CardContent>     
    </Card>
  )
}