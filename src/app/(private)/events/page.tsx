import { UserButton } from '@clerk/nextjs'
import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware

export default function EventsPage() {
  return (
    <>
      <h1>EventsPage</h1>
      <UserButton />
    </>   
  )
}