'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod' 
import { eventFormSchema } from '@/schema/events'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Textarea } from '../ui/textarea'
import { Switch } from '../ui/switch'
import { createEvent, updateEvent } from '@/server/actions/events'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { useTransition } from 'react'

export function EventForm({
  event
} : {
  event?: {
    id: string
    name: string
    description?: string
    durationInMinutes: number
    isActive: boolean
  }
}) {
  const [isDeletePending, startDeleteTransition] = useTransition()

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: event ?? {   
      isActive: true,
      durationInMinutes: 30   
    }
  })

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    const action = event == null 
      ? createEvent 
      : updateEvent.bind(null, event.id)
    
    const data = await action(values)

    if (data?.error) {
      form.setError('root', {
        message: 'There was an error saving your event.'
      })
    }
  }
  
  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex gap-6 flex-col'
      >
        {form.formState.errors.root && (
          <div className='text-destructive text-sm'>
            {form.formState.errors.root.message}
          </div>
        )}
        <FormField
          control={form.control}
          name='name'
          render={({field}) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Name users see when booking.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='durationInMinutes'
          render={({field}) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <FormControl>
                <Input 
                  type='number'
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Please state time in minutes.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({field}) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  className='resize-none h-32'
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Description of the event (optional).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='isActive'
          render={({field}) => (
            <FormItem>
              <div className='flex items-center gap-2'>
                <FormControl>
                  <Switch 
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>  
                <FormLabel>Active</FormLabel>
              </div>
              <FormDescription>
                Inactive events will not be visible for users to book.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex gap-2 justify-end'>
          {event && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant='outline'
                  className='uppercase'
                  disabled={isDeletePending || form.formState.isSubmitting}
                >
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    You are about to delete this event. This action cannot be undone.
                  </AlertDialogDescription>  
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    disabled={isDeletePending || form.formState.isSubmitting}
                    onClick={() => {
                      startDeleteTransition(async() => {
                        const data = await deleteEvent(event.id)
                      })
                    }}
                  >
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          <Button 
            type='button'
            asChild 
            variant='outline'
            className='uppercase'
          >
            <Link 
              href='/events'
            >
              Cancel
            </Link>
          </Button>
          <Button 
            type='submit'
            className='uppercase'
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  )
}