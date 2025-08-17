'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod' 
import { eventFormSchema } from '@/schema/events'

export function EventForm() {
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      isActive: true,
      durationInMinutes: 30
      
    }
  })

  function onSubmit(values: z.infer<typeof eventFormSchema>) {
    console.log(values)
  }
  
  return null
}