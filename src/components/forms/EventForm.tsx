'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod' 
import { eventFormSchema } from '@/schema/events'
import { Form, FormField, FormItem, FormLabel } from '../ui/form'

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
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='name'
          render={() => (
            <FormItem>
              <FormLabel></FormLabel>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}