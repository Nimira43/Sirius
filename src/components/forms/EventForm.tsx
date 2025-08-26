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
      <form 
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex gap-6 flex-col'
      >
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
              <FormLabel>Duration In Minutes</FormLabel>
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