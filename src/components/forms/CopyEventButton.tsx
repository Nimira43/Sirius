'use client'

import { Button, ButtonProps } from "../ui/button"

export function CopyEventButton({ 
  eventId, 
  clerkUserId, 
  ...buttonProps 
}: Omit<ButtonProps, 'children' | 'onClick'> & {
  eventId: string
  clerkUserId: string
}) {

  
  return (
    <Button {...buttonProps}>

    </Button>
  )
}