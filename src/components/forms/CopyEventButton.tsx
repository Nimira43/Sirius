'use client'

import { useState } from 'react'
import { Button, ButtonProps } from '../ui/button'
import { Copy, CopyCheck, CopyX } from "lucide-react"

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
      <CopyIcon className='size-4 mr-2' />
      {getChildren(copyState)}
    </Button>
  )
}

function getCopyIcon(copyState: CopyState) {
  switch (copyState) {
    case 'idle':
      return Copy
    case 'copied':
      return CopyCheck
    case 'error':
      return CopyX   
  }
}