'use client'

import { useState } from "react"
import { Button, ButtonProps } from "../ui/button"

type CopyState = 'idle' | 'copied' | 'error'

export function CopyEventButton({ 
  eventId, 
  clerkUserId, 
  ...buttonProps 
}: Omit<ButtonProps, 'children' | 'onClick'> & {
  eventId: string
  clerkUserId: string
}) {
  const [copyState, setCopyState] = useState<CopyState>
  const CopyIcon = getCopyIcon(copyState)

  return (
    <Button {...buttonProps}>

    </Button>
  )
}