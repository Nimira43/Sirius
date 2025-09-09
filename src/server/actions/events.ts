'use server'

import { eventFormSchema } from '@/schema/events'
import 'use-server'
import { z } from 'zod'

export async function createEvent(unsafeData: z.infer<typeof eventFormSchema>) {
  const { success, data} = eventFormSchema.safeParse(unsafeData)

  if (!success) {
    return { error: true}
  }

  
}